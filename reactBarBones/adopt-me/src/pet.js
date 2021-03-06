// import React from "react";

import { Link } from "react-router-dom";

// const Pet = (props) => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, props.name),
//     React.createElement("h1", {}, props.animal),
//     React.createElement("h1", {}, props.breed),
//   ]);
// };

const Pet = ({ name, breed, animal, images, location, id }) => {
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    hero = images[0];
  }

  return (
    <Link to={`/details/${id}`} className="relative ">
      <div>
        <img src={hero} alt={name} className="w-full" />
      </div>
      <div className="absolute bottom-0 left-0 bg-gradient-to-tr from-white to-transparent pt-2">
        <h1>{name}</h1>
        <h2>{`${animal} - ${breed} - ${location}`}</h2>
      </div>
    </Link>
  );
};
export default Pet;
