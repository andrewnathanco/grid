import { GameProvider, today, useGame } from "../components/game/service";
import { GameInfo } from "../components/game/view";
import { ThemeToggler } from "../util/theme";
import { InfoDialog, InfoDialogProvider } from "../components/info/view";
import { GameBoard } from "../components/board/view";

export default function Home() {
  return (
    <>
      <InfoDialogProvider>
        <GameProvider>
          <main class="p-4 justify-center items-center flex flex-col">
            <InfoDialog />
            <div class="p-4 w-96 flex flex-col space-y-4">
              <div class="flex justify-between items-center">
                <GameInfo />
                <ThemeToggler />
              </div>
            <GameBoard />
            </div>
          </main>
        </GameProvider>
      </InfoDialogProvider>
    </>
  );
}
