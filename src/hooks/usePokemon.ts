import { useEffect, useState } from "react";
import { reqResPokemonApi } from "../api/reqResPokemon";
import { IReqRes, IPokemon } from "../interfaces/reqResPokemon";

const LIMIT = 150;
const OFF_SET = 0;

export const usePokemon = () => {
  const [pokemon, setPokemon] = useState<IPokemon[]>([]);


  useEffect(() => {
    loadPokemon();
  }, []);

  const loadPokemon = async () => {
    const resp = await reqResPokemonApi.get<IReqRes>(``, {
      params: {
        limit: LIMIT,
        offset: OFF_SET
      }
    });

    if(resp.data.results.length > 0) {
      setPokemon(resp.data.results);
    }
  }

  return {
    pokemon
  }
}
