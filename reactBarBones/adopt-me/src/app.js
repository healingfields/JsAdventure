import React from "react";
import ReactDOM from "react-dom";
import Pet from "./pet";

// const App = () => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", { id: "my-brand" }, "adopt me!"),
//     ...[1, 2, 3, 4].map((i) => React.createElement("h2", {}, i)),
//     React.createElement(Pet, { name: "luna", animal: "dog", breed: "bulldog" }),
//     React.createElement(Pet, { name: "dolly", animal: "dog", breed: "terrier" }),
//     React.createElement(Pet, { name: "picha", animal: "dog", breed: "rotweiler" }),
//   ]);
// };

const App = () => {
  return (
    <div>
      <h1>Adopt me</h1>
      <Pet name="luna" animal="dog" breed="bully" />
      <Pet name="dolly" animal="dog" breed="golden retriever" />
      <Pet name="picha" animal="dog" breed="rotweiler" />
    </div>
  );
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
