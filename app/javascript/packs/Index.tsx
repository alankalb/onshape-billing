import React from "react";
import ReactDOM from "react-dom";

import { App } from "ui/Foundation";

import "@shopify/polaris/dist/styles.css";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement("div"))
  );
});
