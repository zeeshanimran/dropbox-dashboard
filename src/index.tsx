import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { SnackbarProvider } from "notistack";
import { SnackbarUtilsConfiguration } from "./components/SnackBarComponent";
import AppContextProvider from "./context/AppContext";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
root.render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={5}
      autoHideDuration={3000}
      preventDuplicate={true}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <SnackbarUtilsConfiguration />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppContextProvider>
            <App />
          </AppContextProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </SnackbarProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
