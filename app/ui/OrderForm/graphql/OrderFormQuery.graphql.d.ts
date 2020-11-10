import { DocumentNode } from "graphql-typed";
import { BigInt } from "../../graphql/types/types";
export namespace OrderFormQueryPartialData {
  export interface Documents {
    __typename?: "Document" | null;
    id?: string | null;
    name?: string | null;
  }
  export interface Customers {
    __typename?: "Customer" | null;
    id?: BigInt | null;
    name?: string | null;
  }
}
export interface OrderFormQueryPartialData {
  documents?: (OrderFormQueryPartialData.Documents | null)[] | null;
  customers?: (OrderFormQueryPartialData.Customers | null)[] | null;
}
export namespace OrderFormQueryData {
  export interface Documents {
    __typename: "Document";
    id: string;
    name: string;
  }
  export interface Customers {
    __typename: "Customer";
    id: BigInt;
    name: string;
  }
}
export interface OrderFormQueryData {
  documents: OrderFormQueryData.Documents[];
  customers: OrderFormQueryData.Customers[];
}
declare const document: DocumentNode<OrderFormQueryData, never, OrderFormQueryPartialData>;
export default document;