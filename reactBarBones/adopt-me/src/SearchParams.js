import { useEffect, useState } from "react";
import Pet from "./pet";
import useBreedList from "./useBreedList";

const ANIMALS = ["dog", "bird", "cat"];
const SearchPrams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);

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
  function onAnimalChange(e) {
    setAnimal(e.target.value);
    console.log(e.target.value);
  }

  return (
    <div className="search-params">
      <form>
        <label htmlFor="location">
          Location
          <input
            id="location"
            placeholder="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          ></input>
        </label>
        <label htmlFor="animal">
          <select
            id="animal"
            value={animal}
            onChange={onAnimalChange}
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
        <label htmlFor="breed">
          <select
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
          >
            <option />
            {breeds.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>submit</button>
      </form>
      <div>
        {pets.map((pet) => (
          <Pet
            name={pet.name}
            animal={pet.animal}
            breed={pet.breed}
            key={pet.id}
          />
        ))}
        ;
      </div>
    </div>
  );
};
export default SearchPrams;
