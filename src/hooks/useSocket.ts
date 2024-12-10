import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";

type TUseSocketReturnType = {
  socket: Socket | null,
};

const useSocket = (): TUseSocketReturnType => {
  const { url = '' } = useParams();
  const socketRef = useRef<Socket>();

  useEffect(() => {
    socketRef.current = io(`${process.env.REACT_APP_SERVER_ORIGIN}/sharedspace-${url}`);

    return () => {
      socketRef.current?.disconnect();
    };
  }, [url]);

  if (!socketRef.current) {
    return { socket: null };
  }

  return { socket: socketRef.current };
};

export default useSocket;