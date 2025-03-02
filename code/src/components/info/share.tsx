import { game_name } from "../../util/const";
import { toTitleCase } from "../../util/words";
import { Game, useGame } from "../game/service";

function getShare(game: Game) {
  const shareURL = `${import.meta.env.VITE_BASE_URL}`;

  let score = "";

  score = `Score: ${game?.path?.length}`;

  return [`${toTitleCase(game_name)} #${game?.gamekey}\n${score}`, shareURL];
}

export function ShareButton() {
  const [game, _] = useGame();

  return (
    <div class="w-full">
      <button
        onClick={() => {
          const [text, url] = getShare(game);

          try {
            navigator?.share({
              text,
              url,
            });
          } catch {
            navigator?.clipboard?.writeText(`${text}\n${url}`);
          }
        }}
        class="w-full rounded-md p-2 text-serria-50 dark:text-serria-200 dark:bg-mallard-800 bg-mallard-600"
        id="submit"
      >
        Share
      </button>
    </div>
  );
}
