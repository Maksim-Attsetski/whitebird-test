import { useEffect, useState } from "react";

export const useDebounce = <T = string>(followValue: T, time: number = 800) => {
  const [value, setValue] = useState<T>(followValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(followValue);
    }, time);

    return () => {
      clearTimeout(timer);
    };
  }, [followValue]);

  return value;
};
