module Types
  class CustomerType < Types::BaseObject
    field :id, GraphQL::Types::BigInt, null: false
    field :name, String, null: false
  end
end