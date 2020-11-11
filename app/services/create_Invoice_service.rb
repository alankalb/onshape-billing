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
    add_metafields

    if draft_order.save
      invoice = draft_order.send_invoice
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
        quantity: 1
      }
    ]
  end

  def add_metafields
    draft_order.metafields = [ 
      {
        namespace: "onshape",
        key: "document",
        value: document_id,
        value_type: "string"
      }
    ]
  end

  def add_customer
    draft_order.customer = {
      id: customer_id
    }
  end

end