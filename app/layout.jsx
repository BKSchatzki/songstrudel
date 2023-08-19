import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "SongStrudel",
  description: "Sweet Tunes In The Oven",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100">
        <Provider>
          <div className="gradient" />
          <Nav />
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
