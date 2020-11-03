import React from "react";

import { Button, Card, Form } from "@shopify/polaris";

export default function App() {
  const handleSubmit = () => {
    console.log("submit");
  };

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
