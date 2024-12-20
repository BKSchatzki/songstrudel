'use client';

import {
  useEffect,
  useState,
} from 'react';

import { motion } from 'framer-motion';

import useDebounce from '@hooks/useDebounce';
import { usePreventAutoZoom } from '@hooks/usePreventAutoZoom';

import FeedCardList from './FeedCardList';

const Feed = ({ isPersonalFeed, currentUser }) => {
  const [searchText, setSearchText] = useState('');
  const [arrangements, setArrangements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  usePreventAutoZoom();

  const fetchArrangements = async () => {
    setIsLoading(true);
    const maxAttempts = 10;
    const delayBetweenAttempts = 500;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const url = `/api/arrangement?search=${encodeURIComponent(searchText)}&page=1`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Fetch failed.');
        const data = await res.json();
        isPersonalFeed
          ? setArrangements(data.filter((arrangement) => arrangement.creator._id === currentUser))
          : setArrangements(data.filter((arrangement) => arrangement.visibility === 'visible'));
        setIsLoading(false);
        break;
      } catch (err) {
        if (attempt === maxAttempts - 1) {
          console.error(err);
        } else {
          await new Promise((resolve) => setTimeout(resolve, delayBetweenAttempts));
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const [isReady, cancelFetch] = useDebounce(
    () => {
      fetchArrangements();
    },
    1000,
    [searchText]
  );

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
    setTimeout(() => setIsLoading(true), 500);
  };

  useEffect(() => {
    if (isReady()) {
      fetchArrangements();
    }
  }, [isReady]);

  const deleteArrangement = async (id) => {
    if (!id || !isPersonalFeed) return;

    try {
      const res = await fetch(`/api/arrangement/view/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setArrangements;
      }
      if (res.ok) {
        setArrangements(arrangements.filter((arrangement) => arrangement._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="mt-6 w-full sm:mt-12">
      {!isPersonalFeed && (
        <motion.form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 10, ease: 'easeInOut' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            bounce: 0.3333,
            duration: 0.5,
            delay: 0.2,
          }}
          exit={{ opacity: 0, y: 10 }}
        >
          <label className="mb-6 flex w-full max-w-3xl flex-row items-center justify-between rounded-sm bg-slate-950 bg-opacity-50 px-6 py-3 shadow-md shadow-slate-950/50 backdrop-blur-md backdrop-filter placeholder:opacity-50 focus-within:brightness-150 sm:mb-12">
            <span className="hidden">Name</span>
            <input
              type="text"
              value={searchText}
              onChange={handleSearchTextChange}
              placeholder="Search arrangements ~"
              className="w-full bg-transparent text-center text-sm outline-none placeholder:opacity-50 sm:text-lg"
            />
          </label>
        </motion.form>
      )}
      <FeedCardList
        data={arrangements}
        isLoading={isLoading}
        isPersonalFeed={isPersonalFeed}
        handleDelete={deleteArrangement}
      />
    </section>
  );
};

export default Feed;
