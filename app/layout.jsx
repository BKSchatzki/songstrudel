import "@styles/globals.css";

export const metadata = {
  title: "SongStrudel",
  description: "Sweet Tunes in the Oven",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
