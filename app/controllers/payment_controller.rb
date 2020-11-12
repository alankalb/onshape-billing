class PaymentController < ApplicationController
  skip_before_action :verify_authenticity_token

  def payment
    line_item_properties = params[:line_items][0][:properties]
    email = params[:email]

    if line_item_properties.length > 0
      doc = line_item_properties[0][:value]
      doc.slice! "https://cad.onshape.com/documents/"
      OnshapeRequestService.execute({method: "POST", email: email, permissions: ["WRITE"], document_id: doc})
    end

    head :no_content
  end
end
