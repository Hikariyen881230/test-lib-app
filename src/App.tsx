/* eslint-disable react/style-prop-object */
import React from "react";
import "./App.css";
import { IntlProvider } from "react-intl";
import { BrowserRouter, Route, Routes } from "react-router";
import Intl from "./intl";
import Layout from "./components/layout";
import Dnd from "./dnd";
import Camera from "./camera";

export const messages = {
  en: {
    currency: "USD",
    unit: "mile",
    dateFormat: "MM/dd/yyyy",
    nameFormat: "First Last",
  },
  fr: {
    currency: "EUR",
    unit: "kilometer",
    dateFormat: "dd/MM/yyyy",
    nameFormat: "Last First",
  },
  ja: {
    currency: "JPY",
    unit: "meter",
    dateFormat: "yyyy/MM/dd",
    nameFormat: "Last First",
  },
  "zh-TW": {
    currency: "TWD",
    unit: "kilometer",
    dateFormat: "yyyy/MM/dd",
    nameFormat: "Last First",
  },
};

const locale = window.navigator.language;

function App() {
  return (
    <BrowserRouter>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/intl" element={<Intl />} />
            <Route path="/dnd" element={<Dnd />} />
            <Route path="/camera" element={<Camera />} />
          </Route>
        </Routes>
      </IntlProvider>
    </BrowserRouter>
  );
}

export default App;
