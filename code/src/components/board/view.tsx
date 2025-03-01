import { createEffect, createSignal } from "solid-js";
import { GameStatus, useGame } from "../game/service";
import { Motion } from "solid-motionone";
import { useKeyDownEvent } from "@solid-primitives/keyboard";
import { getGameValues, isValidMove } from "../../util/board";
import { game_size, grid_size } from "../../util/const";

export enum TileStatus {
  path,
  start,
  end,
  block,
  inert,
}

function Tile(props: { index: number }) {
  const [game, setGame] = useGame();
  const { index } = props;

  const status = () => {
    // first check for start
    if (index == game.start) return TileStatus.start;

    // then check for end
    if (index == game.end) return TileStatus.end;

    // now check for blocks
    if (game.blocks.includes(index)) return TileStatus.block;

    // now check for path items
    if (game.path.includes(index)) return TileStatus.path;

    return TileStatus.inert;
  };

  const active = () => game.active == props.index;

  switch (status()) {
    case TileStatus.start:
      return (
        <Motion.div
          onClick={() => {
            setGame("path", [game.start]);
            setGame("active", game.start);
          }}
          class="h-12 w-12 border rounded-sm dark:bg-mallard-600 dark:border-mallard-800 bg-mallard-400 border-mallard-800"
          animate={{ scale: [1, 0.8, 1] }}
          transition={{
            duration: active() ? 1 : 0,
            repeat: Infinity,
            easing: "ease-in-out",
          }}
        ></Motion.div>
      );
    case TileStatus.path:
      return (
        <Motion.div
          onClick={() => {
            // when clearing the path, let's go back to where we just we
            const pathIndex = game.path.findIndex((item) => item == index);
            if (pathIndex) {
              setGame("path", [...game.path.slice(0, pathIndex + 1)]);
            }

            setGame("active", game.path[game.path.length - 1]);
          }}
          class="h-12 w-12 border rounded-sm dark:bg-serria-700 dark:border-serria-900 bg-serria-400 border-serria-800"
          animate={{ scale: [1, 0.8, 1] }}
          transition={{
            duration: active() ? 1 : 0,
            repeat: Infinity,
            easing: "ease-in-out",
          }}
        ></Motion.div>
      );
    case TileStatus.block:
      return (
        <Motion.div
          class="h-12 w-12 border rounded-sm dark:bg-taupe-600 dark:border-taupe-950 bg-taupe-600 border-taupe-900"
          animate={{ scale: [1, 0.8, 1] }}
          transition={{
            duration: active() ? 1 : 0,
            repeat: Infinity,
            easing: "ease-in-out",
          }}
        ></Motion.div>
      );
    case TileStatus.end:
      return (
        <Motion.div
          onClick={() => {
            if (!isValidMove(index, game)) return;

            setGame("game_status", GameStatus.end);
            setGame("active", props.index);
            setGame("path", [...game.path, props.index]);
          }}
          class="h-12 w-12 border rounded-sm dark:bg-bourbon-500 dark:border-bourbon-950 bg-bourbon-500 border-bourbon-800"
          animate={{ scale: [1, 0.8, 1] }}
          transition={{
            duration: active() ? 1 : 0,
            repeat: Infinity,
            easing: "ease-in-out",
          }}
        ></Motion.div>
      );
    default:
      return (
        <Motion.div
          onClick={() => {
            if (!isValidMove(index, game)) return;
            setGame("active", props.index);
            setGame("path", [...game.path, props.index]);
          }}
          class="h-12 w-12 border rounded-sm dark:bg-serria-900 dark:border-serria-950 bg-serria-300 border-serria-600"
          animate={{ scale: [1, 0.8, 1] }}
          transition={{
            duration: active() ? 1 : 0,
            repeat: Infinity,
            easing: "ease-in-out",
          }}
        ></Motion.div>
      );
  }
}

export function GameBoard() {
  const board = () => {
    game.active;
    game.path;

    return Array(game_size).fill(0);
  };

  const [game, setGame] = useGame();
  const keyDownEvent = useKeyDownEvent();

  const restart = () => {
    setGame("path", [game.start]);
    setGame("active", game.start);
  };

  const moveLeft = () => {
    setGame("path", [...game.path, game.active - 1]);
    setGame("active", game.active - 1);
  };

  const moveRight = () => {
    setGame("path", [...game.path, game.active + 1]);
    setGame("active", game.active + 1);
  };

  const moveUp = () => {
    setGame("path", [...game.path, game.active - grid_size]);
    setGame("active", game.active + grid_size);
  };

  const moveDown = () => {
    const newPath = [...game.path, game.active + grid_size];
    const newActive = game.active - grid_size;
  };

  createEffect(() => {
    const e = keyDownEvent();
    if (!e) return;

    switch (e?.key.toLowerCase()) {
      case "h":
      case "arrowleft":
      case "j":
      case "arrowdown":
      case "k":
      case "arrowup":
      case "l":
      case "arrowright":
      case "r":
        restart();
      default:
        e?.preventDefault();
        break;
    }
  });

  return (
    <div class="dark:border-serria-900 dark:bg-serria-800 bg-serria-200 border-bourbon-800 border rounded-sm w-full flex flex-wrap p-4 gap-1 justify-center">
      {board().map((_, index) => {
        return <Tile index={index} />;
      })}
    </div>
  );
}

export function ResetButton() {
  const [game, setGame] = useGame();

  return (
    <div class="w-full">
      <button
        onClick={() => {
          setGame("path", [game.start]);
          setGame("active", game.start);
        }}
        class="w-full rounded-md p-2 text-serria-50 dark:text-bourbon-200 dark:bg-bourbon-900 bg-bourbon-800"
        id="reset"
      >
        Reset
      </button>
    </div>
  );
}
