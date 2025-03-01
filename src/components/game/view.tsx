import { createEffect, createSignal } from "solid-js";
import { gamekey, today, useGame } from "./service";
import { useInfoDialog } from "../info/view";
import { game_name } from "../../util/const";
import { toTitleCase } from "../../util/words";

export const baseVersion = "v0.2.6";

function parseVersion(version: string): number[] {
  if (!version) {
    return [0, 0];
  }

  const [major, minor] = version?.split(".")?.map(Number);
  return [isNaN(major) ? 0 : major, isNaN(minor) ? 0 : minor];
}

export function GameInfo() {
  const [game, setGame] = useGame();
  const [__, { open }] = useInfoDialog();
  const [version, _] = createSignal(
    import.meta.env.VITE_VERSION ?? baseVersion
  );

  // createEffect(() => {
  //   if (game.gamekey && (import.meta.env.VITE_VERSION ?? baseVersion)) {
  //     const newGame = game.gamekey && game.gamekey != gamekey();

  //     const [currentMajor, currentMinor] = parseVersion(game.version);
  //     const [envMajor, envMinor] = parseVersion(
  //       import.meta.env.VITE_VERSION ?? baseVersion
  //     );

  //     const newMajorMinorVersion =
  //       currentMajor !== envMajor || currentMinor !== envMinor;

  //     if (newGame || newMajorMinorVersion) {
  //       localStorage.removeItem("template_game");
  //       setGame(today(gamekey()));
  //     }

  //     if (newMajorMinorVersion) {
  //       localStorage.removeItem("template_info");
  //       open();
  //     }
  //   }
  // });

  return (
    <div class="flex flex-col">
      <div class="space-y-1">
        <div class="flex text-4xl space-x-2 items-center">
          <div>{toTitleCase(game_name)}</div>
          <div>#{game.gamekey}</div>
          <div
            id="game-version"
            class="font-semibold w-min h-min dark:text-gray-200 text-xs border-2 px-1 dark:border-gray-200 rounded-lg border-black text-black"
          >
            {version()}
          </div>
        </div>
      </div>
      <div class="font-light">Description for the game</div>
    </div>
  );
}
