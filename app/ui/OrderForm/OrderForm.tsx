import React from "react";
import { useQuery } from "@apollo/client";

import { Button, Card, Form } from "@shopify/polaris";

import DocumentsQuery, {
  DocumentsQueryData,
} from "./graphql/DocumentsQuery.graphql";

export default function App() {
  const handleSubmit = () => {
    console.log("submit");
  };

  const { data, loading, error } = useQuery<DocumentsQueryData>(DocumentsQuery);

  console.log(error);
  console.log(loading);
  console.log(data);

  return (
    <Card sectioned>
      <Form onSubmit={handleSubmit}>
        <Button submit primary>
          Send Invoice
        </Button>
      </Form>
    </Card>
  );
}
