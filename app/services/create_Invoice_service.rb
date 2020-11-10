# frozen_string_literal: true
class CreateInvoiceService < ApplicationService
  def initialize(params)
    @customerId = params[:customerId]
    @documentId = params[:documentId]
    @documentName = params[:documentName]
    @price = params[:price]
    
  end

  def execute
    return nil if (!customerId || !documentId || !price || !documentName)

    ShopifyRequestService.execute
    @draft_order = ShopifyAPI::DraftOrder.new

    add_line_items
    add_customer
    add_metafields

    if draft_order.save
      draft_order.send_invoice
    else
      nil
    end
  end

  private

  attr_reader :customerId, :documentId, :price
  attr_accessor :draft_order

  def add_line_items
    draft_order.line_items = [
      {
        title: documentName,
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
        value: documentId,
        value_type: "string"
      }
    ]
  end

  def add_customer
    draft_order.customer = {
      id: customerId
    }
  end

end