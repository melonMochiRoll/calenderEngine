import { useCallback, useState } from "react";

type UseTabsReturnType<T> = [
  T,
  (e: any, newValue: T) => void,
  React.Dispatch<React.SetStateAction<T>>,
];

const useTabs = <T>(initData: T): UseTabsReturnType<T> => { // deprecated
  const [ state, setState ] = useState(initData);
  
  const onChangeState = useCallback((e: any, newValue: T) => {
    setState(newValue);
  }, [state]);

  return [ state, onChangeState, setState ];
};

export default useTabs;