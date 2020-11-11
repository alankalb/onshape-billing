# frozen_string_literal: true
module Mutations
  class SendInvoice < BaseMutation
    argument :document_id, String, required: true
    argument :document_name, String, required: true
    argument :customer_id, String, required: true
    argument :price, String, required: true

    field :draft_id, GraphQL::Types::BigInt, null: true

    def resolve(document_id:, document_name:, customer_id:, price:)
      draft_order = CreateInvoiceService.execute(
        {
          document_id: document_id, 
          document_name: document_name, 
          customer_id: customer_id.to_i, 
          price: price
        }
      )
      if draft_order
        return {
          draft_id: draft_order.id
        }
      else
        return {
          draft_order: null
          order_id: null
        }
      end
    end
  end
end