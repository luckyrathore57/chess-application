import { randomUUID } from "crypto";
import { userJwtClaims } from "./auth";
import { WebSocket } from "ws";
export class User {
  public socket: WebSocket;
  public id: string;
  public name: string;
  public isGuest?: boolean;
  public gameId: string;

  constructor(socket: WebSocket, userJwtClaims?: userJwtClaims) {
    this.socket = socket;
    this.id = userJwtClaims?.id || randomUUID();
    this.name = userJwtClaims?.name || "lucky";
    this.isGuest = userJwtClaims?.isGuest || false;
    this.gameId = "";
  }

  joinGame(gameId: string) {
    this.gameId = gameId;
  }
}
