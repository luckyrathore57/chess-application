import jwt from "jsonwebtoken";
import { User } from "../SocketManager";
import { WebSocket } from "ws";

const JWT_SECRET = process.env.JWT_SECRET || "secretKey";

export interface userJwtClaims {
  id: string;
  name: string;
  isGuest?: boolean;
}

export const extractAuthUser = (
  token: string,
  socket: WebSocket
): User | undefined => {
  console.log(JWT_SECRET);
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as userJwtClaims;
    return new User(socket, decoded);
  } catch (error) {
    console.error(error);
  }
};
