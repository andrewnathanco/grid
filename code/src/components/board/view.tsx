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
export enum TileBorder {
  top,
  bottom,
  left,
  right,
}

function Tile(props: { index: number }) {
  const [game, setGame] = useGame();
  const { index } = props;

  const status = () => {
    // first check for start
    if (index == game?.start) return TileStatus.start;

    // then check for end
    if (index == game?.end) return TileStatus.end;

    // now check for blocks
    if (game?.blocks?.includes(index)) return TileStatus.block;

    // now check for path items
    if (game?.path?.includes(index)) return TileStatus.path;

    return TileStatus.inert;
  };

  const borders = () => {
    const borders: TileBorder[] = [];
    const indexPath = game.path.indexOf(index);
    // we should always have it but in case we don't

    // handle the start first if we have more than
    const thisTile = index;

    // see if we have a previous tile
    if (indexPath < game.path.length && game.path.length > 1) {
      const nextTile = game.path[indexPath + 1];

      // top
      if (nextTile == thisTile - grid_size) borders.push(TileBorder.top);

      // bottom
      if (nextTile == thisTile + grid_size) borders.push(TileBorder.bottom);

      // left
      if (nextTile == thisTile - 1) borders.push(TileBorder.left);

      // right
      if (nextTile == thisTile + 1) borders.push(TileBorder.right);
    }

    if (indexPath >= 1) {
      const prevTile = game.path[indexPath - 1];

      // top
      if (prevTile == thisTile - grid_size) borders.push(TileBorder.top);

      // bottom
      if (prevTile == thisTile + grid_size) borders.push(TileBorder.bottom);

      // left
      if (prevTile == thisTile - 1) borders.push(TileBorder.left);

      // right
      if (prevTile == thisTile + 1) borders.push(TileBorder.right);
    }

    console.log(index, borders);
    return borders;
  };
  createEffect(() => {
    borders();
  });

  const active = () => game?.active == props.index;

  switch (status()) {
    case TileStatus.start:
      return (
        <div
          onClick={() => {
            setGame("path", [game.start]);
            setGame("active", game.start);
          }}
          classList={{
            "border-2": borders().length > 0,
            "border-t-mallard-800": !borders().includes(TileBorder.top),
            "rounded-t-none": borders().includes(TileBorder.top),
            "border-b-mallard-800": !borders().includes(TileBorder.bottom),
            "rounded-b-none": borders().includes(TileBorder.bottom),
            "border-l-mallard-800": !borders().includes(TileBorder.left),
            "rounded-l-none": borders().includes(TileBorder.left),
            "border-r-mallard-800": !borders().includes(TileBorder.right),
            "rounded-r-none": borders().includes(TileBorder.right),
          }}
          class="h-12 w-12 border rounded-sm dark:bg-mallard-600 dark:border-mallard-800 bg-mallard-400 border-transparent"
        ></div>
      );
    case TileStatus.path:
      return (
        <div
          onClick={() => {
            // when clearing the path, let's go back to where we just we
            const pathIndex = game.path.findIndex((item) => item == index);
            if (pathIndex) {
              setGame("path", [...game.path.slice(0, pathIndex + 1)]);
            }

            setGame("active", game.path[game.path.length - 1]);
          }}
          classList={{
            "border-2": borders().length > 0,
            "border-t-serria-800": !borders().includes(TileBorder.top),
            "rounded-t-none": borders().includes(TileBorder.top),
            "border-b-serria-800": !borders().includes(TileBorder.bottom),
            "rounded-b-none": borders().includes(TileBorder.bottom),
            "border-l-serria-800": !borders().includes(TileBorder.left),
            "rounded-l-none": borders().includes(TileBorder.left),
            "border-r-serria-800": !borders().includes(TileBorder.right),
            "rounded-r-none": borders().includes(TileBorder.right),
          }}
          class="h-12 w-12 border dark:bg-serria-700 dark:border-serria-900 bg-serria-400 border-transparent rounded-sm "
        ></div>
      );
    case TileStatus.block:
      return (
        <div class="h-12 w-12 border rounded-sm dark:bg-taupe-600 dark:border-taupe-950 bg-taupe-600 border-taupe-900"></div>
      );
    case TileStatus.end:
      return (
        <div
          onClick={() => {
            if (!isValidMove(index, game)) return;
            setGame("active", props.index);
            setGame("path", [...game.path, props.index]);
          }}
          classList={{
            "border-2": borders().length > 0,
            "border-t-serria-800": !borders().includes(TileBorder.top),
            "rounded-t-none": borders().includes(TileBorder.top),
            "border-b-serria-800": !borders().includes(TileBorder.bottom),
            "rounded-b-none": borders().includes(TileBorder.bottom),
            "border-l-serria-800": !borders().includes(TileBorder.left),
            "rounded-l-none": borders().includes(TileBorder.left),
            "border-r-serria-800": !borders().includes(TileBorder.right),
            "rounded-r-none": borders().includes(TileBorder.right),
          }}
          class="h-12 w-12 rounded-sm dark:bg-bourbon-500 dark:border-bourbon-950 bg-bourbon-500 border-transparent"
        ></div>
      );
    default:
      return (
        <div
          onMouseOver={() => {
            if (!isValidMove(index, game)) return;
            setGame("active", props.index);
            setGame("path", [...game.path, props.index]);
          }}
          class="h-12 w-12 border rounded-sm dark:bg-serria-900 dark:border-serria-950 bg-serria-300 border-serria-600"
        ></div>
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
