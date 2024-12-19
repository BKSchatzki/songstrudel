import React from 'react';

import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <motion.div
      className="flex h-full w-full items-center justify-center"
      initial={{ opacity: 0, ease: 'easeInOut' }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="72"
        height="72"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="mx-auto animate-spin"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </motion.div>
  );
};

export default LoadingSpinner;
