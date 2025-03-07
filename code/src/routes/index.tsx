import { GameProvider } from "../components/game/service";
import { GameInfo, Score } from "../components/game/view";
import { InfoDialog, InfoDialogProvider } from "../components/info/view";
import { GameBoard } from "../components/board/view";
import { InfoButton } from "../components/info/button";
import { DragDropProvider } from "@thisbeyond/solid-dnd";

export default function Home() {
  return (
    <>
      <DragDropProvider>
        <InfoDialogProvider>
          <GameProvider>
            <main class="p-4 justify-center items-center flex flex-col unselectable">
              <InfoDialog />
              <div class="p-4 w-96 flex flex-col space-y-4">
                <div class="flex justify-between items-center w-full">
                  <GameInfo />
                  <InfoButton />
                </div>
                <Score />
                <GameBoard />
              </div>
            </main>
          </GameProvider>
        </InfoDialogProvider>
      </DragDropProvider>
    </>
  );
}
