import { useState, useEffect } from "react";

function usePokeApi(url, dependencies) {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        const pokemonList = data.results;
        const parsedPokemonList = pokemonList.map((pokemon, index) => ({
          name: pokemon.name,
          id: index + 1,
        }));
        setPokemonList(parsedPokemonList);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, url]);
  return [isLoading, pokemonList];
}
export default usePokeApi;
