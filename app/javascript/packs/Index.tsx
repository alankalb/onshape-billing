import React from "react";
import ReactDOM from "react-dom";

import "@shopify/polaris/dist/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Page, Card, Button } from "@shopify/polaris";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <AppProvider i18n={enTranslations}>
      <Page title="Example app">
        <Card sectioned>
          <Button onClick={() => alert("Button clicked!")}>
            Example button
          </Button>
        </Card>
      </Page>
    </AppProvider>,
    document.body.appendChild(document.createElement("div"))
  );
});
