import { Footer } from "./footer";
import { Navbar } from "./navbar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};
