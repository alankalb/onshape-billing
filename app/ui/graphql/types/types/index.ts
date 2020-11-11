export type BigInt = string;
export interface SendInvoiceInput {
  documentId: string;
  documentName: string;
  customerId: string;
  price: string;
  clientMutationId?: string | null;
}