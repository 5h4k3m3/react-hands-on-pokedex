import { useState, useEffect } from "react";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import "./App.css";

export const App = () => {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      //fetch all poke data
      const res = await getAllPokemon(initialURL);
      //fetch each poke data
      loadPokemon(res.results);

      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    const _pokemonData = await Promise.all(
      data.map((pokemon) => {
        const pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  console.log(pokemonData);

  return (
    <div className="app">
      {loading ? <h1>Loading...</h1> : <h1>Get PokeData</h1>}
    </div>
  );
};
