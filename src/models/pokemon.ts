export type PokemonInfo = {
  name: string;
  url: string;
};

export type PokemonResponse = {};

export type Pokemon = {
  id: number;
  name: string;
  imgUrl: string;
  size: { weight: number; height: number };
  stats: { name: string; value: number }[];
};
