import { io, Socket } from "socket.io-client";
import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useRef, useState } from "react";

interface SocketContextType {
  socket: Socket;
}

export const SocketContext = createContext<SocketContextType | null>(null);

export const useSocketContext = () => {
  const context = useContext(SocketContext);

  if (!context)
    throw new Error("There is no socket context.");

  return context;
};