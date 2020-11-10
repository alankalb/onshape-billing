# frozen_string_literal: true
class CustomersService < ApplicationService
  def initialize

  end

  def execute
    ShopifyRequestService.execute
    customers = ShopifyAPI::Customer.all
    customers.map { |customer|
      {
        id: customer.id,
        name: customer.first_name + " " + customer.last_name
      }
    }
  end
end
