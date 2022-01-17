import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import App from "../App";
import { store } from "../store";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Provider store={store}>
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/:listId" element={<App />} />
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </Provider>,
    document.body.appendChild(document.createElement("div"))
  );
});
