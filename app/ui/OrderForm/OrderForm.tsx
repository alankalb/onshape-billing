import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import { Button, Card, Form, FormLayout, Heading } from "@shopify/polaris";
import { SearchField } from "./components";

import DocumentsQuery, {
  DocumentsQueryData,
} from "./graphql/DocumentsQuery.graphql";

export default function App() {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  const handleSubmit = () => {
    console.log(selectedDocument);
  };

  const { data, loading } = useQuery<DocumentsQueryData>(DocumentsQuery);

  if (loading && !data) {
    return <p>Loading...</p>;
  }

  const documents = data.documents.map((document) => {
    return {
      value: document.id,
      label: document.name,
    };
  });

  return (
    <Card sectioned>
      <Form onSubmit={handleSubmit}>
        <FormLayout>
          <Heading>Document</Heading>
          <SearchField
            initialOptions={documents}
            fieldType="Document"
            setSelectedOption={setSelectedDocument}
            selectedOption={selectedDocument}
          />
          <Button submit primary disabled={!selectedDocument}>
            Send Invoice
          </Button>
        </FormLayout>
      </Form>
    </Card>
  );
}
