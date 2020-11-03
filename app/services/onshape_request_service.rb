# frozen_string_literal: true
class OnshapeRequestService < ApplicationService
  def initialize
    @method = "GET"
    @path = "/api/documents"
    @query = ""
    @content_type = "application/json"
  end

  def execute
    uri = "https://cad.onshape.com" + path

    if method == "GET"
      response = HTTParty.get(uri, {
        headers: headers,
      })
    else
      response = HTTParty.post(uri, {
        headers: headers,
    } )
    end

    JSON.parse(response.body)
  end

  private

  attr_reader :method, :path, :query, :content_type, :onNonce, :current_date

  def headers
    {
      "On-Nonce" => onNonce,
      "Date" => current_date,
      "Authorization" => authorization,
      "Accept" => "application/vnd.onshape.v1+json",
      "Content-Type" => content_type,
    }
  end

  def onNonce
    @onNonce ||= (SecureRandom.hex(12).upcase + "A")
  end

  def current_date
    @current_date ||= Time.zone.now.strftime("%a, %d %b %Y %H:%M:%S GMT")
  end

  def authorization
    string = (method + "\n" + onNonce + "\n" + current_date + "\n" + content_type + "\n" + path + "\n" + query + "\n").downcase  

    if Rails.env.development?
      Dotenv::Railtie.load
    end
    
    secret_key = ENV['ONSHAPE_SECRET']
    access_key = ENV['ONSHAPE_ACCESS']

    hmac = Base64.strict_encode64(OpenSSL::HMAC.digest("sha256", secret_key, string))
    signature = "On " + access_key + ":HmacSHA256:" + hmac
  end
end