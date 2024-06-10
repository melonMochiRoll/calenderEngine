import { useCallback, useState } from "react";

type UseInputReturnType<T> = [
  T,
  (e: any) => void,
  React.Dispatch<React.SetStateAction<T>>,
];

const useInput = <T>(initData: T): UseInputReturnType<T> => {
  const [ state, setState ] = useState(initData);
  
  const onChangeState = useCallback((e: any) => {
    setState(e.target.value);
  }, [state]);

  return [ state, onChangeState, setState ];
};

export default useInput;