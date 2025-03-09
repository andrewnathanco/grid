import {
  createDraggable,
  DragDropProvider,
  DragDropSensors,
  DragEventHandler,
  DragOverlay,
  useDragDropContext,
} from "@thisbeyond/solid-dnd";
import { createEffect, createSignal } from "solid-js";
import { useGame } from "../game/service";
import { grid_size } from "../../util/const";
import { debounce } from "@solid-primitives/scheduled";
import { isValidMove } from "../../util/board";
import { useInfoDialog } from "../info/view";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      draggable?: boolean;
      droppable?: boolean;
    }
  }
}

function MoveButtonDraggable() {
  const draggable = createDraggable(1);
  const [info, _] = useInfoDialog();

  return (
    <button
      use:draggable
      class="absolute bg-serria-900 rounded-full p-4 shadow-lg top-1/2 draggable"
      id="move-button"
      classList={{
        "opacity-25": draggable.isActiveDraggable,
        "end-8 ": !info.lefty,
        "start-8": info.lefty,
      }}
      style={{ "touch-action": "none" }}
    >
      <svg
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="size-10 bg-transparent stroke-chilean-50"
      >
        <path
          d="M34.814 14.157L42.314 21.657L34.814 29.157M14.157 8.5L21.657 1L29.157 8.5M29.1571 34.8139L21.6571 42.3139L14.1571 34.8139M8.50012 29.1569L1.00012 21.6569L8.50012 14.1569"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  );
}

function MoveButtonPlaceHolder() {
  return (
    <button class="absolute bg-serria-900 rounded-full p-4 shadow-lg end-4 bottom-4">
      <svg
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="size-10 bg-transparent stroke-chilean-50"
      >
        <path
          d="M34.814 14.157L42.314 21.657L34.814 29.157M14.157 8.5L21.657 1L29.157 8.5M29.1571 34.8139L21.6571 42.3139L14.1571 34.8139M8.50012 29.1569L1.00012 21.6569L8.50012 14.1569"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  );
}

export default function MoveButtonTarget() {
  const threshold = 20;
  const debounceTime = 200;

  const moveLeft = () => {
    let newPath = [];
    const index = game.active - 1;
    let active = 0;

    if (game?.path.includes(index) && game.path.length > 2) {
      active = game.path[game.path.length - 2];
      newPath = game.path.filter((item) => item != game.active);
    } else {
      newPath = [...game.path, index];
      active = index;
    }

    setGame("path", newPath);
    setGame("active", active);
  };

  const moveRight = () => {
    let newPath = [];
    const index = game.active + 1;
    let active = 0;

    if (game?.path.includes(index) && game.path.length > 2) {
      active = game.path[game.path.length - 2];
      newPath = game.path.filter((item) => item != game.active);
    } else {
      newPath = [...game.path, index];
      active = index;
    }

    setGame("path", newPath);
    setGame("active", active);
  };

  const moveUp = () => {
    let newPath = [];
    const index = game.active - grid_size;
    let active = 0;

    if (game?.path.includes(index) && game.path.length > 2) {
      active = game.path[game.path.length - 2];
      newPath = game.path.filter((item) => item != game.active);
    } else {
      newPath = [...game.path, index];
      active = index;
    }

    setGame("path", newPath);
    setGame("active", active);
  };

  const moveDown = () => {
    let newPath = [];
    const index = game.active + grid_size;
    let active = 0;

    if (game?.path.includes(index) && game.path.length > 2) {
      active = game.path[game.path.length - 2];
      newPath = game.path.filter((item) => item != game.active);
    } else {
      newPath = [...game.path, index];
      active = index;
    }

    setGame("path", newPath);
    setGame("active", active);
  };

  const moveRightDebounce = debounce(moveRight, debounceTime);
  const moveLeftDebounce = debounce(moveLeft, debounceTime);
  const moveUpDebounce = debounce(moveUp, debounceTime);
  const moveDownDebounce = debounce(moveDown, debounceTime);

  const [game, setGame] = useGame();

  const onDragMove: DragEventHandler = ({ overlay }) => {
    if (overlay) {
      const { transform } = overlay;

      if (transform.x > threshold) {
        if (!isValidMove(game.active + 1, game)) return;
        moveRightDebounce();
      } else if (transform.y > threshold) {
        if (!isValidMove(game.active + grid_size, game)) return;
        moveDownDebounce();
      } else if (transform.x < -threshold) {
        if (!isValidMove(game.active - 1, game)) return;
        moveLeftDebounce();
      } else if (transform.y < -threshold) {
        if (!isValidMove(game.active - grid_size, game)) return;
        moveUpDebounce();
      }
    }
  };

  return (
    <DragDropProvider onDragMove={onDragMove}>
      <MoveButtonDraggable />
      <DragOverlay>
        {(draggable) => (
          <>
            <MoveButtonPlaceHolder />
          </>
        )}
      </DragOverlay>
      <DragDropSensors />
    </DragDropProvider>
  );
}
