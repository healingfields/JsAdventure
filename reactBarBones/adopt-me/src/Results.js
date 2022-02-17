import Pet from "./pet";

const Results = ({ pets }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-2 px-2">
      {!pets.length ? (
        <h2>No pets found</h2>
      ) : (
        pets.map((pet) => (
          <Pet
            name={pet.name}
            animal={pet.animal}
            breed={pet.breed}
            images={pet.images}
            location={`${pet.city}, ${pet.state}`}
            key={pet.id}
            id={pet.id}
          />
          //   <Pet {...pet} key={pet.id} />
        ))
      )}
    </div>
  );
};
export default Results;
