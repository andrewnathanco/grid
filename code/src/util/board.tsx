import { PRNG } from "seedrandom";
import { game_size, grid_size } from "./const";
import { Game } from "../components/game/service";

export function isValidMove(index: number, game: Game): boolean {
  // game over
  if (index < 0) return false;
  if (index >= game_size) return false;
  if (game?.path?.includes(game.end)) return false;
  if (game?.blocks?.includes(index)) return false;
  if (game?.start == index) return false;

  // 2. the active tile is adjacent to tile
  if (
    // adjacent on top
    index - game?.active == grid_size ||
    // adjacent on bottom
    game?.active - index == grid_size ||
    // adjacnet left
    game?.active - 1 == index ||
    // adjacnet right
    game?.active + 1 == index
  )
    return true;

  return false;
}

export function getGameValues(
  rng: PRNG,
  game_key: number
): [number, number, number[]] {
  const num_blocked = 5;

  // TODO: prevent edge case where start, end and blocks are the same

  const start = Math.floor(2 + rng() * 12);
  const end = game_size - Math.floor(2 + rng() * 12);
  const blocks = [];

  for (let i = 0; i < num_blocked; i++) {
    const block = Math.floor(rng() * game_size);
    blocks.push(block);
  }

  return [start, end, blocks];
}
