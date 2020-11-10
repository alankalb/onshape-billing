import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import {
  Button,
  Card,
  Form,
  FormLayout,
  Heading,
  TextField,
} from "@shopify/polaris";
import { SearchField } from "./components";

import OrderFormQuery, {
  OrderFormQueryData,
} from "./graphql/OrderFormQuery.graphql";

export default function App() {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [price, setPrice] = useState<string>("");

  const handleSubmit = () => {
    console.log(selectedDocument);
    console.log(selectedCustomer);
    console.log(price);
  };

  const { data, loading } = useQuery<OrderFormQueryData>(OrderFormQuery);

  if (loading && !data) {
    return <p>Loading...</p>;
  }

  const documents = data.documents.map((document) => {
    return {
      value: document.id,
      label: document.name,
    };
  });

  const customers = data.customers.map((customer) => {
    return {
      value: customer.id,
      label: customer.name,
    };
  });

  return (
    <Card sectioned>
      <Form onSubmit={handleSubmit}>
        <FormLayout>
          <div>
            <Heading>Document</Heading>
            <SearchField
              initialOptions={documents}
              fieldType="Document"
              setSelectedOption={setSelectedDocument}
              selectedOption={selectedDocument}
            />
          </div>
          <div>
            <Heading>Customer</Heading>
            <SearchField
              initialOptions={customers}
              fieldType="Customer"
              setSelectedOption={setSelectedCustomer}
              selectedOption={selectedCustomer}
            />
          </div>
          <div>
            <Heading>Price</Heading>
            <TextField
              value={price}
              onChange={setPrice}
              type={"number"}
              labelHidden
              label={"Price"}
              prefix={"$"}
              min={0}
              placeholder={"0.00"}
            />
          </div>
          <Button
            submit
            primary
            disabled={!selectedDocument || !selectedCustomer}
          >
            Send Invoice
          </Button>
        </FormLayout>
      </Form>
    </Card>
  );
}
