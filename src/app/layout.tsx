import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SessionLayout from "./components/SessionLayout";
import { LocaleProvider } from "./context/localeContext";
import CookieBanner from "./components/CookieBanner"; // ✅ Import the banner

export const metadata = {
  title: "My Website",
  description: "Responsive Navbar Example",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <LocaleProvider>
          <SessionLayout>
            <Navbar />
          </SessionLayout>
          <CookieBanner /> {/* ✅ Add the Cookie Banner */}
          <main>{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
};

export default RootLayout;
