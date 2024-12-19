import React from 'react';

const PageContainer = ({ children }) => {
  return (
    <section className="bg-grid mx-auto flex min-h-screen w-full max-w-[1536px] flex-col items-center bg-gray-900 px-4 pb-8 pt-16 text-center sm:pb-16 sm:pt-32">
      {children}
    </section>
  );
};

export default PageContainer;
