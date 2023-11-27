import "@styles/globals.css";
import { GeistSans } from "geist/font/sans";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "SongStrudel",
  description:
    "Sweet Tunes In The Oven: SongStrudel is a planning tool for the modern musician to develop ideas, before getting lost in the DAW sauce.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="min-h-screen bg-gray-900 text-slate-100">
        <Provider>
          <Nav />
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
