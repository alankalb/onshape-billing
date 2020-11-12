module Types
  class QueryType < Types::BaseObject
    field :documents, [DocumentType], null: false,
      description: "All Onshape documents belonging to a user"

    field :customers, [CustomerType], null: false,
      description: "All Shopify customers belonging to a shop"

    def documents
      request = OnshapeRequestService.execute({})
      request["items"]
    end

    def customers
      CustomersService.execute
    end
  end
end
