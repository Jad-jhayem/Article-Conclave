import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import { LogInContextProvider } from "@/context/LogIn";

export default function App({ Component, pageProps }) {
  return (
    <LogInContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LogInContextProvider>
  );
}
