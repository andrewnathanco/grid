import { createEffect, createSignal } from "solid-js";
import { gamekey, GameStatus, today, useGame } from "./service";
import { useInfoDialog } from "../info/view";
import { game_name } from "../../util/const";
import { toTitleCase } from "../../util/words";
import { ShareButton } from "../info/share";
import { ResetButton } from "../board/view";

export const baseVersion = "v0.3.6";

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

  createEffect(() => {
    if (game.gamekey && (import.meta.env.VITE_VERSION ?? baseVersion)) {
      const newGame = game.gamekey && game.gamekey != gamekey();

      const [currentMajor, currentMinor] = parseVersion(game.version);
      const [envMajor, envMinor] = parseVersion(
        import.meta.env.VITE_VERSION ?? baseVersion
      );

      const newMajorMinorVersion =
        currentMajor !== envMajor || currentMinor !== envMinor;

      if (newGame || newMajorMinorVersion) {
        localStorage.removeItem(game_name + "_game");
        setGame(today(gamekey()));
      }

      if (newMajorMinorVersion) {
        localStorage.removeItem(game_name + "_info");
        open();
      }
    }
  });

  return (
    <div class="flex flex-col">
      <div class="space-y-1">
        <div class="flex text-4xl space-x-2 items-center">
          <div>{toTitleCase(game_name)}</div>
          <div>#{game.gamekey}</div>
          <div
            id="game-version"
            class="font-semibold w-min h-min text-xs border-2 px-1 rounded-lg border-serria-950 dark:border-serria-200 text-serria-950 dark:bg-serria-950 dark:text-serria-200"
          >
            {version()}
          </div>
        </div>
      </div>
      <div class="font-light">Connect tiles to earn points</div>
    </div>
  );
}

export function Score() {
  const [game, _] = useGame();

  return (
    <div class="flex flex-col space-y-2">
      <div class="text-xl">Score: {game?.path?.length}</div>
      {game?.path?.includes(game.end) ? (
        <div class="flex flex-col space-y-2">
          <ShareButton />
          <ResetButton />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
