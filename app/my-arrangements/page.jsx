'use client';

import { useEffect } from 'react';

import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Feed from '@components/Feed';
import PageContainer from '@components/PageContainer';

const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/');
    }
  }, [session, status, router]);

  return (
    <PageContainer>
      <motion.h1
        className="mx-4 mt-4 max-w-xl text-3xl font-bold sm:text-4xl"
        initial={{ opacity: 0, y: 50, ease: 'easeInOut' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', bounce: 0.3333, duration: 0.5 }}
        exit={{ opacity: 0, y: 50 }}
      >
        <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
          Your Tunes{' '}
        </span>
        <br className="sm:hidden" />
        Right Below
      </motion.h1>
      <motion.p
        className="mx-4 mt-4 max-w-md text-base sm:text-lg"
        initial={{ opacity: 0, y: 50, ease: 'easeInOut' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          bounce: 0.3333,
          duration: 0.5,
          delay: 0.1,
        }}
        exit={{ opacity: 0, y: 50 }}
      >
        Set privacy and visibility, and{' '}
        <span className="bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text font-semibold text-transparent">
          throw out the duds.
        </span>
      </motion.p>
      {status === 'authenticated' && (
        <Feed
          isPersonalFeed={true}
          currentUser={session?.user.id}
        />
      )}
    </PageContainer>
  );
};

export default Profile;
