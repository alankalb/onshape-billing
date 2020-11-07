module Types
  class QueryType < Types::BaseObject
    field :documents, [DocumentType], null: false,
      description: "All Onshape documents belonging to a user"

    def documents
      request = OnshapeRequestService.execute
      request["items"]
    end
  end
end
