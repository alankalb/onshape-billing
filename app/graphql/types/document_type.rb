module Types
  class DocumentType < Types::BaseObject
    field :id, String, null: false
    field :name, String, null: false
  end
end