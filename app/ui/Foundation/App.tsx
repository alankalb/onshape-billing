import React from "react";

import "@shopify/polaris/dist/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Page } from "@shopify/polaris";
import { OrderForm } from "ui/OrderForm";

export default function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <Page title="Billify">
        <OrderForm />
      </Page>
    </AppProvider>
  );
}
