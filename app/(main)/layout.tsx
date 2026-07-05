import Header from "./UI/header";
import Footer from "./UI/footer";
import { ThemeProvider } from "@/components/themeprovider";
import Providers from "./providers";
import { Toaster } from "@/components/ui/sonner";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster richColors position="top-center" />

      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </ThemeProvider>
    </>
  );
}
