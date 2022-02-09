import React, { StrictMode, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Details from "./Details";
import SearchPrams from "./SearchParams";
import ThemeContext from "./ThemeContext";

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
  const [theme, setTheme] = useState("dark");
  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <Router>
          <header>
            <Link to="/">
              <h1>Adopt me</h1>
            </Link>
          </header>
          <Switch>
            <Route path="/details/:id">
              <Details />
            </Route>
            <Route path="/">
              <SearchPrams />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

// ReactDOM.render(React.createElement(App), document.getElementById("root"));
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
