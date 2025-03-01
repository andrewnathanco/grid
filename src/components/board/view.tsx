import { createEffect, createSignal } from "solid-js";
import { useGame } from "../game/service";
import { Motion } from "solid-motionone";

export enum TileStatus {
  selected,
  active,
  end,
  block,
  inert,
}

export interface TileState {
  status: TileStatus;
}

function Tile(props: { index: number; state: TileState; active: boolean }) {
  const status = props.state.status;
  switch (status) {
    case TileStatus.active:
      return (
        <Motion.div
          class="h-12 w-12 border rounded-sm dark:bg-mallard-600 dark:border-mallard-800 bg-mallard-400 border-mallard-800"
          animate={{ scale: [1, 0.9, 1] }}
          transition={{
            duration: 1,
            repeat: 10,
            easing: "ease-in-out",
          }}
        ></Motion.div>
      );
    case TileStatus.block:
      return (
        <Motion.div class="h-12 w-12 border rounded-sm dark:bg-taupe-900 dark:border-taupe-950 bg-taupe-600 border-taupe-900"></Motion.div>
      );
    case TileStatus.end:
      return (
        <Motion.div class="h-12 w-12 border rounded-sm dark:bg-bourbon-500 dark:border-bourbon-950 bg-bourbon-500 border-bourbon-800"></Motion.div>
      );
    default:
      return (
        <Motion.div class="h-12 w-12 border rounded-sm dark:bg-serria-900 dark:border-serria-950 bg-serria-300 border-serria-600"></Motion.div>
      );
  }
}

export function GameBoard() {
  const [active, setActive] = createSignal(0);
  const [game, setGame] = useGame();

  return (
    <div class="dark:border-serria-900 dark:bg-serria-800 bg-serria-200 border-bourbon-800 border rounded-sm w-full flex flex-wrap p-4 gap-1 justify-center">
      {game.board.map((tile, index) => {
        return <Tile index={index} state={tile} active={active() == index} />;
      })}
    </div>
  );
}
