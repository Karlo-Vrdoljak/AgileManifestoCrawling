import Layout from "../components/layout/Layout";
import { AppContextProvider } from "../context/state";
import "../styles/globals.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import PrimeReact from "primereact/api";

function MyApp(context) {
  PrimeReact.ripple = true;
  PrimeReact.inputStyle = 'filled';

  const { Component, pageProps } = context;
  return (
    <AppContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
  );
}

export default MyApp;
