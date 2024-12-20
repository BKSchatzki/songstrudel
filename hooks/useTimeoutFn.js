import {
  useCallback,
  useEffect,
  useRef,
} from 'react';

/**
 * A hook that allows to run a function after a specified delay.
 * @param {Function} fn - The function to run.
 * @param {number} ms - The delay in milliseconds.
 * @returns {UseTimeoutFnReturn} An array containing three functions:
 * 1. isReady - A function that returns true if the function has been called within the specified delay, or null if the delay has not yet started.
 * 2. clear - A function to clear the timeout.
 * 3. set - A function to set the timeout.
 */
export default function useTimeoutFn(fn, ms = 0) {
  const ready = useRef(false);
  const timeout = useRef();
  const callback = useRef(fn);

  const isReady = useCallback(() => ready.current, []);

  const set = useCallback(() => {
    ready.current = false;
    timeout.current && clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      ready.current = true;
      callback.current();
    }, ms);
  }, [ms]);

  const clear = useCallback(() => {
    ready.current = null;
    timeout.current && clearTimeout(timeout.current);
  }, []);

  // update ref when function changes
  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  // set on mount, clear on unmount
  useEffect(() => {
    set();

    return clear;
  }, [ms]);

  return [isReady, clear, set];
}
