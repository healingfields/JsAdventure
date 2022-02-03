const Pet = (props) => {
    return React.createElement("div", {}, [
      React.createElement("h1", {}, props.name),
      React.createElement("h1", {}, props.animal),
      React.createElement("h1", {}, props.breed),
    ]);
}
const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", { id: "my-brand" }, "adopt me!"),
    ...[1, 2, 3, 4].map((i) => React.createElement("h2", {}, i)),
    React.createElement(Pet, { name: "luna", animal: "dog", breed: "bulldog" }),
    React.createElement(Pet, { name: "dolly", animal: "dog", breed: "terrier" }),
    React.createElement(Pet, { name: "picha", animal: "dog", breed: "rotweiler" }),
  ]);
};
ReactDOM.render(React.createElement(App), document.getElementById("root"));
