import { makePersisted } from "@solid-primitives/storage";
import {
  Accessor,
  createContext,
  createEffect,
  createSignal,
  useContext,
} from "solid-js";
import { createStore } from "solid-js/store";
import { toTitleCase } from "../../util/words";
import { game_name } from "../../util/const";
import { ThemeToggler } from "../../util/theme";

interface InfoDialogData {
  dialog_status: boolean;
}

type InfoDialog = [
  InfoDialogData,
  {
    close: () => void;
    open: () => void;
  }
];

const InfoDialogContext = createContext<InfoDialog>();

export function InfoDialogProvider(props: { children: any }) {
  let [dialog_data, set_dialog] = makePersisted(
    createStore<InfoDialogData>({ dialog_status: true }),
    {
      name: game_name + "_info-dialog",
    }
  );

  const dialog: InfoDialog = [
    dialog_data,
    {
      close() {
        set_dialog("dialog_status", false);
        document.body.style.overflowY = "auto";
      },
      open() {
        set_dialog("dialog_status", true);
        document.body.style.position = "relative";
        document.body.style.overflowY = "hidden";
      },
    },
  ];

  return (
    <InfoDialogContext.Provider value={dialog}>
      {props.children}
    </InfoDialogContext.Provider>
  );
}

export function useInfoDialog(): InfoDialog {
  return useContext(InfoDialogContext) as InfoDialog;
}

export function InfoDialog() {
  const [isOpen, { close }] = useInfoDialog();

  return (
    <div
      classList={{
        hidden: !isOpen.dialog_status,
        block: isOpen.dialog_status,
      }}
    >
      <div class="z-10 absolute top-0 left-0 right-0 bottom-0 justify-center items-center bg-black flex opacity-70"></div>
      <div class="z-20 absolute top-0 left-0 right-0 rounded-lg md:mx-auto m-4 md:w-96">
        <div
          id="dialog-content"
          class="p-8 flex flex-col space-y-2 w-full rounded-lg"
        >
          <div
            id="dialog-header"
            class="flex justify-between items-center text-3xl w-full"
          >
            <div>{toTitleCase(game_name)}</div>
            <div class="flex">
              <ThemeToggler />
              <button
                onClick={() => {
                  close();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div class="flex flex-col space-y-2">
            <div class="flex flex-col">
              <div class="text-xl">What is {toTitleCase(game_name)}?</div>
              <div class="text-md font-light">
                Grid is a game where you have to try to connect tiles together.
              </div>
            </div>
            <div class="flex flex-col">
              <div class="text-xl">Rules</div>
              <div class="text-md font-light">
                1. Start at the start tile
                <br />
                2. Your next tile must be a grid tile adjascent to the current tile
                <br />
                3. Blocked tiles block your path
                <br />
                4. You must make it to the end tile
                <br />
                5. You'll get scored by how many tiles you select
                <br />
                6. The higher the score the better
              </div>
            </div>
            <div class="flex flex-col">
              <div class="text-xl">Tile Types</div>
              <div class="text-md font-light flex space-x-2">
                <div>
                  Start:
                  <StartTile />
                </div>
                <div>
                  End:
                  <EndTile />
                </div>
                <div>
                  Path:
                  <PathTile />
                </div>
                <div>
                  Grid:
                  <GridTile />
                </div>
                <div>
                  Block:
                  <BlockTile />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PathTile() {
  return (
    <div class="h-12 w-12 border rounded-sm dark:bg-serria-700 dark:border-serria-900 bg-serria-400 border-serria-800"></div>
  );
}

function EndTile() {
  return (
    <div class="h-12 w-12 border rounded-sm dark:bg-bourbon-500 dark:border-bourbon-950 bg-bourbon-500 border-bourbon-800"></div>
  );
}

function GridTile() {
  return (
    <div class="h-12 w-12 border rounded-sm dark:bg-serria-900 dark:border-serria-950 bg-serria-300 border-serria-600"></div>
  );
}

function StartTile() {
  return (
    <div class="h-12 w-12 border rounded-sm dark:bg-mallard-600 dark:border-mallard-800 bg-mallard-400 border-mallard-800"></div>
  );
}

function BlockTile() {
  return (
    <div class="h-12 w-12 border rounded-sm dark:bg-taupe-600 dark:border-taupe-950 bg-taupe-600 border-taupe-900"></div>
  );
}
