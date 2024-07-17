import { useEffect, useState } from "react";

const useDoubleClick = (onClickEvent: Function) => {
  const [ click, setClick ] = useState(0);

  useEffect(() => {
    if (click > 1) {
      onClickEvent();
    }

    const interval = setTimeout(() => {
      setClick(0);
    }, 250);

    return () => {
      clearTimeout(interval);
    };
  }, [click]);

  return () => setClick(prev => prev + 1);
};

export default useDoubleClick;