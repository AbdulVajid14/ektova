import { memo } from "react";
import Header from './Header'
import Footer from "./Footer";

const AppLayout = ({ children }) => (
  <>
    <Header />
    <main className="min-h-screen">
      {children}
    </main>
    <Footer />
  </>
);

export default memo(AppLayout);