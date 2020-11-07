import React from "react";

import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Page } from "@shopify/polaris";
import { OrderForm } from "ui/OrderForm";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";

const xCSRFfToken = document.querySelector<HTMLMetaElement>(
  "meta[name=csrf-token]"
);

const link = new HttpLink({
  uri: "/graphql",
  credentials: "same-origin",
  headers: {
    "X-CSRF-Token": xCSRFfToken ? xCSRFfToken.content : "",
  },
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppProvider i18n={enTranslations}>
        <Page title="Billify">
          <OrderForm />
        </Page>
      </AppProvider>
    </ApolloProvider>
  );
}
