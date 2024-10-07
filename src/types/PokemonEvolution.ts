export interface EvolutionDetail {
  min_level?: number;
  trigger: {
    name: string; 
  };
}
export interface Evolution {
  species: {
    name: string;
    url: string;
  };
  evolution_details: EvolutionDetail[]; 
  evolves_to: Evolution[]; 
  is_baby: boolean; 
}

export interface PokemonEvolution {
  evolutionDetails: EvolutionDetail[];
  species: string;
  url: string;
  chain?: PokemonEvolutionChain; // Opcional
}

export interface PokemonEvolutionChain {
  species: {
    name: string;
    url: string;
  };
  evolves_to: PokemonEvolutionChain[];
  is_baby?: boolean;
}

export interface Cries {
  latest: string;
  legacy: string;
}

export interface Species {
  name: string;
  url: string;
}

export interface Sprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female?: string;
  front_shiny?: string;
  front_shiny_female?: string;
}

export interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface Move {
  move: {
    name: string;
    url: string;
  };
  version_group_details: Array<{
    level_learned_at: number;
    move_learn_method: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }>;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface types {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface Pokemon {
  abilities: Ability[];
  base_experience: number;
  cries: Cries;
  forms: Array<any>;
  game_indices: Array<any>;
  height: number;
  held_items: Array<any>;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_abilities: Array<any>;
  past_types: Array<any>;
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: types[];
  weight: number;
}

export interface ProcessedEvolution {
  species: string;
  id: number;
  image: string;
  url?: string;
}

export interface PokemonTypes {
  id: number;
  name: string;
  types: PokemonType[];
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonItem {
  id: number;
  name: string;
  types: PokemonType[];
}
