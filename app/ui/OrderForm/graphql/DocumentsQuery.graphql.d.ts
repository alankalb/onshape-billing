import { DocumentNode } from "graphql-typed";
export namespace DocumentsQueryPartialData {
  export interface Documents {
    __typename?: "Document" | null;
    id?: string | null;
    name?: string | null;
  }
}
export interface DocumentsQueryPartialData {
  documents?: (DocumentsQueryPartialData.Documents | null)[] | null;
}
export namespace DocumentsQueryData {
  export interface Documents {
    __typename: "Document";
    id: string;
    name: string;
  }
}
export interface DocumentsQueryData {
  documents: DocumentsQueryData.Documents[];
}
declare const document: DocumentNode<DocumentsQueryData, never, DocumentsQueryPartialData>;
export default document;