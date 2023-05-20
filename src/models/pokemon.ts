export type PokemonInfo = {
  name: string;
  url: string;
};

export type Pokemon = {
  id: number;
  name: string;
  imgUrl: string;
  size: { weight: number; height: number };
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialA: number;
    specialD: number;
    speed: number;
  };
};
