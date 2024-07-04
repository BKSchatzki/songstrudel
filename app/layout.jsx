import '@styles/globals.css';

import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
  title: 'SongStrudel',
  description:
    'Sweet Tunes In The Oven: SongStrudel is a planning tool for the modern musician to develop ideas, before getting lost in the DAW sauce.',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="min-h-screen overflow-y-scroll bg-gray-900 text-slate-100 scrollbar scrollbar-track-slate-900 scrollbar-thumb-slate-800">
        <Provider>
          <Nav />
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
