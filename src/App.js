import { useState, useEffect } from "react";
import { getAllPokemon } from "./utils/pokemon";
import "./App.css";

export const App = () => {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPokemonData = async () => {
      //fetch all poke data
      const res = await getAllPokemon(initialURL);
      console.log(res);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  return (
    <div className="app">
      {loading ? <h1>Loading...</h1> : <h1>Get PokeData</h1>}
    </div>
  );
};
