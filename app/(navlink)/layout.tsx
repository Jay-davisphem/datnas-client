import Footer from "../ui/footer";
import Header from "../ui/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div>
        <Header />
        {children}
        <Footer />
      </div>
  );
}
