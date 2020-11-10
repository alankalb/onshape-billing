# frozen_string_literal: true
class ShopifyRequestService < ApplicationService
  API_KEY = ENV["SHOPIFY_API_KEY"]
  PASSWORD = ENV["SHOPIFY_PASSWORD"]
  SHOP_NAME = ENV["SHOP_NAME"]

  def initialize

  end

  def execute
    shop_url = "https://#{API_KEY}:#{PASSWORD}@#{SHOP_NAME}.myshopify.com"
    ShopifyAPI::Base.site = shop_url
    ShopifyAPI::Base.api_version = '2020-01'
  end
end
