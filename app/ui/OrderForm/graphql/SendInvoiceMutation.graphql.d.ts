import { DocumentNode } from "graphql-typed";
import { BigInt } from "../../graphql/types/types";
export namespace SendInvoiceMutationPartialData {
  export interface SendInvoive {
    __typename?: "SendInvoicePayload" | null;
    draftId?: BigInt | null;
  }
}
export interface SendInvoiceMutationPartialData {
  sendInvoive?: SendInvoiceMutationPartialData.SendInvoive | null;
}
export namespace SendInvoiceMutationData {
  export interface Variables {
    documentName: string;
    documentId: string;
    price: string;
    customerId: string;
  }
  export interface SendInvoive {
    __typename: "SendInvoicePayload";
    draftId?: BigInt | null;
  }
}
export interface SendInvoiceMutationData {
  sendInvoive: SendInvoiceMutationData.SendInvoive;
}
declare const document: DocumentNode<SendInvoiceMutationData, SendInvoiceMutationData.Variables, SendInvoiceMutationPartialData>;
export default document;