'use client';

import {
  useEffect,
  useState,
} from 'react';

import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Arrangement from '@components/Arrangement';

const CreateArrangement = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [arrangement, setArrangement] = useState({
    title: '',
    description: '',
    instruments: ['', '', '', '', '', '', ''],
    sections: [],
  });

  useEffect(() => {
    const storedArrangement = window.localStorage.getItem('newArrangement');
    if (storedArrangement) {
      const parsedArrangement = JSON.parse(storedArrangement);
      if (!Array.isArray(parsedArrangement.sections)) {
        parsedArrangement.sections = [];
      }
      setArrangement(parsedArrangement);
    }
  }, []);

  const createArrangement = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch('/api/arrangement/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session?.user.id,
          title: arrangement.title,
          description: arrangement.description,
          instruments: arrangement.instruments,
          sections: arrangement.sections,
        }),
      });
      if (res.ok) {
        window.localStorage.removeItem('newArrangement');
        router.push('/my-arrangements');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.section
      className="mx-auto flex w-11/12 flex-col items-center justify-center pb-8 pt-16 text-center sm:pb-16 sm:pt-32"
      initial={{ opacity: 0, ease: 'easeInOut' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <motion.h1
        className="mx-4 mt-4 max-w-xl text-2xl font-bold sm:text-3xl"
        initial={{ opacity: 0, y: 50, ease: 'easeInOut' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', bounce: 0.3333, duration: 0.5 }}
        exit={{ opacity: 0, y: 50 }}
      >
        Letting You{' '}
        <span className="bg-gradient-to-t from-red-500 to-amber-500 bg-clip-text text-transparent">
          Cook
        </span>
      </motion.h1>
      <motion.div
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
        <Arrangement
          arrangement={arrangement}
          setArrangement={setArrangement}
          isNewArrangement={true}
          isUserLoggedIn={session?.user.id !== undefined}
          saving={saving}
          handleSubmit={createArrangement}
        />
      </motion.div>
    </motion.section>
  );
};

export default CreateArrangement;
