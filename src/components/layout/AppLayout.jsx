import { memo } from "react";
import Header from './Header'
import Footer from "./Footer";
import ScrollToTopButton from "./ScrollToTopButton";

const AppLayout = ({ children }) => (
  <>
    <Header />
    <main className="min-h-screen">
      {children}
    </main>
    <Footer />
    <ScrollToTopButton />
  </>
);

export default memo(AppLayout);