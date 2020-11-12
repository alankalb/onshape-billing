# frozen_string_literal: true
class CreateInvoiceService < ApplicationService
  def initialize(params)
    @customer_id = params[:customer_id]
    @document_id = params[:document_id]
    @document_name = params[:document_name]
    @price = params[:price]
  end

  def execute
    return nil if (!customer_id || !document_id || !price || !document_name)

    ShopifyRequestService.execute
    @draft_order = ShopifyAPI::DraftOrder.new

    add_line_items
    add_customer

    if draft_order.save
      invoice = draft_order.send_invoice
      OnshapeRequestService.execute({method: "POST", email: customer_email, permissions: ["READ", "COMMENT"], document_id: document_id})
      return draft_order if invoice
    else
      nil
    end
  end

  private

  attr_reader :customer_id, :document_id, :document_name, :price
  attr_accessor :draft_order

  def add_line_items
    draft_order.line_items = [
      {
        title: document_name,
        price: price,
        quantity: 1,
        properties: [
          {
            name: "Onshape Document",
            value: "https://cad.onshape.com/documents/" + document_id
          }
        ]
      }
    ]
  end

  def add_customer
    draft_order.customer = {
      id: customer_id
    }
  end

  def customer_email
    ShopifyAPI::Customer.find(customer_id).email
  end

end