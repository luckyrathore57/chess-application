import { useSelector } from "react-redux";
import { WHITE } from "../../utils/constant";
import { BoardTilesProps } from "../../utils/types";
import { RootState } from "../../store/store";

const BoardTiles = ({ turn }: BoardTilesProps) => {
  const size = 8; // Standard chess board
  const playGame = useSelector((state: RootState) => state.playGame.value);
  const chess = useSelector((state: RootState) => state.game.value?.chess);
  console.log(playGame?.candidates);
  console.log("boardTiles");
  console.log(chess?.board());

  const renderBoard = () => {
    const squares = [];

    for (let row = 0; row < size; row++) {
      const rankNumber = turn == WHITE ? size - row : row + 1;
      const isBlack = row % 2 != 0;
      squares.push(
        <div
          key={`rank-${row}`}
          className={`absolute font-medium text-sm ${
            isBlack ? "text-light-tile" : "text-dark-tile"
          }`}
          style={{
            left: "1px",
            top: `calc(${row} * 12.5%)`,
          }}
          draggable={false}
        >
          {rankNumber}
        </div>
      );

      // Chess squares for this row
      for (let col = 0; col < size; col++) {
        const isBlack = (row + col) % 2 === 1;
        squares.push(
          <div
            key={`${row}-${col}`}
            className={`w-full h-full row-start-${row + 1} col-start-${
              col + 1
            } ${isBlack ? "bg-dark-tile" : "bg-light-tile"}`}
            draggable={false}
          />
        );
      }
    }

    // Files (letters a-h) at the bottom
    for (let col = 0; col < size; col++) {
      const fileLabel = String.fromCharCode(
        97 + (turn == WHITE ? col : size - col - 1)
      );
      const isBlack = col % 2 == 0;
      squares.push(
        <div
          key={`file-${col}`}
          className={`absolute font-medium text-sm text-gray ${
            isBlack ? "text-light-tile" : "text-dark-tile"
          }`}
          style={{
            left: `calc(${col} * 12.5% + 12.5%)`,
            bottom: "0px",
            transform: "translateX(-120%)",
          }}
          draggable={false}
        >
          {fileLabel}
        </div>
      );
    }

    return squares;
  };
  return (
    <div className="w-full border border-dark-button relative bg-light-tile aspect-square grid grid-cols-8 grid-rows-8">
      {renderBoard()}
    </div>
  );
};
export default BoardTiles;
