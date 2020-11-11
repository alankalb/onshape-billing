import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import {
  Button,
  ButtonGroup,
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

import SendInvoiceMutation, {
  SendInvoiceMutationData,
} from "./graphql/SendInvoiceMutation.graphql";

interface Option {
  value: string;
  label: string;
}

export default function App() {
  const [selectedDocument, setSelectedDocument] = useState<Option | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Option | null>(null);
  const [price, setPrice] = useState<string>("");
  const [invoiceSending, setInvoiceSending] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const { data, loading } = useQuery<OrderFormQueryData>(OrderFormQuery);
  const [sendInvoiceMutation] = useMutation<SendInvoiceMutationData>(
    SendInvoiceMutation
  );

  const handleSubmit = async () => {
    setInvoiceSending(true);
    const invoice = await sendInvoiceMutation({
      variables: {
        documentId: selectedDocument.value,
        documentName: selectedDocument.label,
        customerId: selectedCustomer.value,
        price: price,
      },
    });

    if (invoice.data.sendInvoive.draftId) {
      setOrderId(invoice.data.sendInvoive.draftId);
    }
    setInvoiceSending(false);
  };

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

  // eslint-disable-next-line multiline-ternary
  const viewOrderButtonMarkup = orderId ? (
    <Button
      external
      url={`https://onshape-demo.myshopify.com/admin/draft_orders/${orderId}`}
    >
      View Invoice
    </Button>
  ) : null;

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
          <ButtonGroup>
            <Button
              submit
              primary
              disabled={!selectedDocument || !selectedCustomer}
              loading={invoiceSending}
            >
              Send Invoice
            </Button>
            {viewOrderButtonMarkup}
          </ButtonGroup>
        </FormLayout>
      </Form>
    </Card>
  );
}
