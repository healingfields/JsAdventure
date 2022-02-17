import { useEffect, useState, useContext } from "react";
import Pet from "./pet";
import useBreedList from "./useBreedList";
import Results from "./Results";
import ThemeContext from "./ThemeContext";

const ANIMALS = ["dog", "bird", "cat"];
const SearchPrams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);
  const [theme, setTheme] = useContext(ThemeContext);

  //   const locationTuple = useState("fsga");
  //   const location = locationTuple[0];
  //   const setLocation = locationTuple[1];

  useEffect(() => {
    callPets();
  }, []);
  async function callPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    console.log(json);
    setPets(json.pets);
  }

  return (
    <div className="mx-auto my-0">
      <form
        className="rounded-lg bg-gray-300 shadow-lg  w-9/12 m-auto flex flex-col items-center justify-center my-10 "
        onSubmit={(e) => {
          e.preventDefault();
          callPets();
        }}
      >
        <label
          htmlFor="location"
          className="flex flex-col items-center justify-center "
        >
          Location
          <input
            id="location"
            placeholder="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-72 p-1 rounded m-1 "
          ></input>
        </label>
        <label
          htmlFor="animal"
          className="flex flex-col items-center justify-center "
        >
          Animal
          <select
            className="w-72 p-1 rounded m-1 "
            id="animal"
            value={animal}
            onChange={(e) => setAnimal(e.target.value)}
            onBlur={(e) => setAnimal(e.target.value)}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label
          htmlFor="breed"
          className="flex flex-col items-center justify-center "
        >
          Breed
          <select
            className="w-72 p-1 rounded m-1 disabled:opacity-75"
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
          >
            {breeds.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <label
          htmlFor="theme"
          className="flex flex-col items-center justify-center "
        >
          Theme
          <select
            className="w-72 p-1 rounded m-1 "
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
            id="theme"
          >
            <option value="darkblue">Dark blue</option>
            <option value="peru">peru</option>
            <option value="chartreuse">chartreuse</option>
            <option value="mediumorchid">medium orchid</option>
          </select>
        </label>
        <button
          style={{ backgroundColor: theme }}
          className="w-40 p-1 rounded m-1 my-6 text-white hover:opacity-50 border-none"
        >
          submit
        </button>
      </form>
      <Results pets={pets} />
    </div>
  );
};
export default SearchPrams;
