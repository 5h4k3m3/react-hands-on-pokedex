import { useState, useEffect } from "react";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import { Card } from "./components/Card/Card";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";

export const App = () => {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [prevURL, setPrevURL] = useState("");
  const [nextURL, setNextURL] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      //fetch all poke data
      const res = await getAllPokemon(initialURL);
      //fetch each poke data
      loadPokemon(res.results);
      setPrevURL(res.previous);
      setNextURL(res.next);
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
  //console.log(pokemonData);

  const handlePrevPage = async () => {
    if (!prevURL) {
      return;
    }
    setLoading(true);
    const data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setPrevURL(data.previous);
    setNextURL(data.next);
    setLoading(false);
  };
  const handleNextPage = async () => {
    if (!nextURL) {
      return;
    }
    setLoading(true);
    const data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);
    setPrevURL(data.previous);
    setNextURL(data.next);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="app">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <div className="btn">
              <button onClick={handlePrevPage}>Prev</button>
              <button onClick={handleNextPage}>Next</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
