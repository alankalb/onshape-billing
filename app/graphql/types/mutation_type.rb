module Types
  class MutationType < Types::BaseObject
    field :send_invoive, mutation: Mutations::SendInvoice, null: false
  end
end
