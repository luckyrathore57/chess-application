import { Square } from "chess.js";
import { BLACK, filesArr, WHITE } from "../../utils/constant";

const Piece = ({
  orientation,
  piece,
  square,
  setActive,
}: {
  orientation: "w" | "b";
  piece: string;
  square: Square;
  setActive: (square: Square | "") => void;
}) => {
  const ci =
    orientation == WHITE
      ? filesArr.indexOf(square[0])
      : 7 - filesArr.indexOf(square[0]);
  const ri =
    orientation == BLACK ? Number(square[1]) - 1 : 8 - Number(square[1]);

  const actPiece = () => {
    if (piece[0] === orientation) {
      setActive(square);
      // const candidates = chess.moves({ square, verbose: true });

      // dispatch(setActivePiece({ activePiece: square }));
      // dispatch(generateCandidates({ candidates }));
      console.log("onDragStart5");
    }
  };

  const onClick: React.MouseEventHandler<HTMLDivElement> = (
    _e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    actPiece();
  };

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    console.log("drag");

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", `${piece},${square}`);
    const element = e.target as HTMLElement;
    setTimeout(() => {
      element.style.display = "none";
    }, 0);
    actPiece();
  };
  const onDragEnd = (e: React.DragEvent) => {
    console.log("onDragEnd1");
    const element = e.target as HTMLDivElement;
    element.style.display = "block";
    setActive("");
    console.log("onDragEnd2");
  };
  return (
    <div
      className={`w-full h-full z-10 ${piece ? `cursor-grab` : ""}
      `}
      style={{
        backgroundImage: piece ? `url('/assets/${piece}.png')` : "",
        gridRowStart: ri + 1,
        gridColumnStart: ci + 1,
        backgroundSize: "100%",
        backgroundPosition: "center",
      }}
      draggable={true}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
    ></div>
  );
};

export default Piece;
