import Header from "@/components/Header";

export default function RootLayout({ children }) {
  return (
    <div>
      <Header />
      <section> {children}</section>
    </div>
  );
}
