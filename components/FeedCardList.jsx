'use client';

import {
  AnimatePresence,
  motion,
} from 'framer-motion';

import LoadingSpinner from '@/components/LoadingSpinner';

import FeedCard from './FeedCard';

const FeedCardList = ({ data, isLoading, isPersonalFeed, handleDelete }) => {
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div
          className={`grid grid-cols-1 items-start gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4`}
        >
          {data.map((arrangement, index) => (
            <motion.div
              key={arrangement._id}
              initial={{ opacity: 0, ease: 'easeInOut' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <FeedCard
                data={arrangement}
                isPersonalFeed={isPersonalFeed}
                index={index}
                handleDelete={handleDelete}
              />
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

export default FeedCardList;
