import { useCallback, useEffect, useRef, useState } from "react";

type Options = {
  minDelay?: number;
  maxDelay?: number;
};

type Props<T = string> = {
  defaultValue?: T;
  baseDelay?: number;
  options?: Options;
};

export const useStopTypingDebounce = <T = string>(props?: Props<T>) => {
  const currentProps = props ?? {
    baseDelay: 500,
    options: {
      minDelay: 200,
      maxDelay: 1500,
    },
  };

  const { baseDelay, options } = currentProps;

  const [delay, setDelay] = useState(baseDelay);
  const [debouncedValue, setDebouncedValue] = useState<T>(
    props?.defaultValue ?? ("" as T)
  );
  const [realTimeValue, setRealTimeValue] = useState<T>(
    props?.defaultValue ?? ("" as T)
  );
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const typingIntervalsRef = useRef<number[]>([]);
  const lastKeyPressTimeRef = useRef(0);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  const calculateStopTypingDelay = useCallback(() => {
    if (typingIntervalsRef.current.length > 5) {
      typingIntervalsRef.current.shift();
    }

    const avgInterval =
      typingIntervalsRef.current.length > 0
        ? typingIntervalsRef.current.reduce((a, b) => a + b, 0) /
          typingIntervalsRef.current.length
        : (baseDelay ?? 500);

    const newDelay = Math.max(
      options?.minDelay || 200,
      Math.min(options?.maxDelay || 1500, Math.floor(avgInterval * 1.5))
    );

    setDelay(newDelay);
    return newDelay;
  }, [baseDelay, options?.minDelay, options?.maxDelay]);

  const trackTypingSpeed = useCallback(() => {
    const currentTime = Date.now();
    const timeSinceLastKeyPress = currentTime - lastKeyPressTimeRef.current;

    if (lastKeyPressTimeRef.current !== 0) {
      typingIntervalsRef.current.push(timeSinceLastKeyPress);
      calculateStopTypingDelay();
    }

    lastKeyPressTimeRef.current = currentTime;
  }, [calculateStopTypingDelay]);

  const handleInputChange = useCallback(
    (value: T) => {
      trackTypingSpeed();
      clearTimer();
      setRealTimeValue(value);

      timerRef.current = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
    },
    [delay, clearTimer, trackTypingSpeed]
  );

  const updateWithouTracking = useCallback(
    (value: T) => {
      clearTimer();
      setRealTimeValue(value);
      setDebouncedValue(value);
    },
    [clearTimer]
  );

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  return {
    handleInputChange,
    updateWithouTracking,
    debouncedValue,
    realTimeValue,
  };
};
