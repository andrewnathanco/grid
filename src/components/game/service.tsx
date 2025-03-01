import { makePersisted } from "@solid-primitives/storage";
import { createContext, useContext } from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";
import { baseVersion } from "./view";
import { game_name } from "../../util/const";

export interface Game {
  version: string;
  gamekey: number;
}

export function gamekey() {
  const now: Date = new Date();
  // starting date
  const firstGame: Date = new Date(2024, 4, 24, 0, 0, 0);
  const estOffset = -5 * 60; // EST is UTC-5 hours
  const estFirstGame = new Date(firstGame.getTime() + estOffset * 60 * 1000);

  const duration: number =
    (now.getTime() - estFirstGame.getTime()) / (1000 * 60 * 60 * 24);

  // return duration;
  return Math.floor(duration);
}

export function today(gamekey: number): Game {
  return {
    version: import.meta.env.VITE_VERSION ?? baseVersion,
    gamekey,
  };
}

const GameContext = createContext<[Game, SetStoreFunction<Game>]>([
  {} as Game,
  () => {},
]);

export function GameProvider(props: any) {
  let value = makePersisted(createStore(today(gamekey())), {
    name: game_name + "_game",
  });

  return (
    <GameContext.Provider value={value}>{props.children}</GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
