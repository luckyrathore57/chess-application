import { Chess } from "chess.js";
import { GameStatus } from "./types";
import { User } from "./User";
import { DRAW, WHITE_WINS } from "./utils/constant";

//TODO: make variable private and create methods to update them

export class Game {
  player1: string;
  player2: string;
  turn: "wb" | "bw";
  viewer: User[];
  gameStatus: GameStatus;
  chess: Chess;
  constructor(player1: string, player2: string) {
    this.player1 = player1;
    this.player2 = player2;
    this.viewer = [];
    this.gameStatus = GameStatus.running;
    this.chess = new Chess();
    this.turn = Math.floor(Math.random() * 100) % 2 == 0 ? "wb" : "bw";
  }
  gameOver(result: "white_wins" | "black_wins" | "draw") {
    this.gameStatus =
      result == DRAW
        ? GameStatus.draw
        : result == WHITE_WINS
        ? GameStatus.white
        : GameStatus.black;
    //TODO: update DB
  }
}
