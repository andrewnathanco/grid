import { TileState, TileStatus } from "../components/board/view";
import seedrandom, { PRNG } from "seedrandom";

export function createBoard(rng: PRNG, game_key: number): TileState[] {
  const board: TileState[] = [];
  const total = 66;
  const num_blocked = 5;

  for (let i = 0; i < total; i++) {
    board.push({
      status: TileStatus.inert,
    });
  }

  const start = Math.floor(2 + rng() * 12);
  const end = Math.floor(2 + rng() * 12);

  for (let i = 0; i < num_blocked; i++) {
    const block = Math.floor(rng() * total);
    board[block] = {
      status: TileStatus.block,
    };
  }

  board[start] = {
    status: TileStatus.active,
  };

  board[total - end] = {
    status: TileStatus.end,
  };

  return board;
}
