import React from "react";

import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Page } from "@shopify/polaris";
import { OrderForm } from "ui/OrderForm";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "/graphql",
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
