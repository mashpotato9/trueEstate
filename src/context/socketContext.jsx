import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { authContext } from "./authContext";

export const socketContext = createContext();

export const SocketProvider = ({ children }) => {
    const { currUser } = useContext(authContext);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        setSocket(io("http://localhost:4000"));
    }, []);

    useEffect(() => {
        if (currUser?.userInfo?.id && socket) {
            socket.emit("newUser", currUser.userInfo.id);
        }
    }, [currUser, socket]);

    return (
        <socketContext.Provider value={{ socket }}>
            {children}
        </socketContext.Provider>
    );
};