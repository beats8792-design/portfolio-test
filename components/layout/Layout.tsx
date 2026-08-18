import Provider from "../providers/Provider";
import Footer from "./Footer";
import Header from "./Header";
import Navigation from "./Navigation";
import PageLoad from "./PageLoad";
import QuickNav from "./QuickNav";
import Transition from "./Transition";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <PageLoad />
      <Header />
      <Navigation />
      <QuickNav />
      <Transition />
      {children}
      <Footer />
    </Provider>
  );
}
