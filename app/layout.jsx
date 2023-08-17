import "@styles/globals.css";
import Nav from "@components/Nav";

export const metadata = {
  title: "SongStrudel",
  description: "Sweet Tunes In The Oven",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100">
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
