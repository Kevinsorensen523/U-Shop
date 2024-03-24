import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { FavoritesProvider } from "./components/FavoriteContext";
import { ProductsProvider } from "./components/DataContext";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <FavoritesProvider>
        <ProductsProvider>
          <App />
        </ProductsProvider>
      </FavoritesProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
