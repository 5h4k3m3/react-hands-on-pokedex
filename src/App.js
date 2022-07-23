import { useEffect } from "react";
import { getAllPokemon } from "./utils/pokemon";
import "./App.css";

export const App = () => {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    const fetchPokemonData = async () => {
      //fetch all poke data
      const res = await getAllPokemon(initialURL);
      console.log(res);
    };
    fetchPokemonData();
  }, []);
};
