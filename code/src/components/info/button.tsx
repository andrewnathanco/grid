import { game_name } from "../../util/const";
import { gamekey, getGame, useGame } from "../game/service";
import { useInfoDialog } from "./view";

export function InfoButton() {
  const [game, _] = useGame();
  const [__, { open }] = useInfoDialog();

  return (
    <div class="w-fit">
      <button
        onClick={() => {
          open();
        }}
        class="rounded-md p-2"
        id="info"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 bg-transparent"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </div>
  );
}

export function TodayModeButton() {
  const [_, setGame] = useGame();

  const [__, { close, todayMode }] = useInfoDialog();

  return (
    <div class="w-fit">
      <button
        onClick={() => {
          todayMode();
          localStorage.removeItem(game_name + "_game");
          setGame(getGame(gamekey()));
          close();
        }}
        class="rounded-md p-2"
        id="info"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
          />
        </svg>
      </button>
    </div>
  );
}

export function RandomGameButton() {
  const [_, setGame] = useGame();

  const [__, { close, randomMode }] = useInfoDialog();

  return (
    <div class="w-fit">
      <button
        onClick={() => {
          const random_game = Math.floor(Math.random() * 500);
          localStorage.removeItem(game_name + "_game");
          setGame(getGame(random_game));
          randomMode();
          close();
        }}
        class="rounded-md p-2"
        id="info"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
          />
        </svg>
      </button>
    </div>
  );
}
