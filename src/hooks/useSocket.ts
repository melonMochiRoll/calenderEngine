import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

type TUseSocketReturnType = {
  socket: Socket | null,
};

const useSocket = (url: string): TUseSocketReturnType => {
  const socketRef = useRef<Socket>();

  useEffect(() => {
    socketRef.current = io(url);

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