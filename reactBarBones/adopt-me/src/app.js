import React, { StrictMode, useState, lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// import Details from "./Details";
// import SearchParams from "./SearchParams";
import ThemeContext from "./ThemeContext";

const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));

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
  const theme = useState("darkblue");
  return (
    <ThemeContext.Provider value={theme}>
      <Suspense fallback={<h2>loading route ...</h2>}>
        <div
          className="p-0 m-0"
          style={{
            background:
              "url(https://pets-images.dev-apis.com/pets/wallpaperC.jpg) ",
          }}
        >
          <Router>
            <header className="w-full text-center bg-gradient-to-b from-purple-500 to-blue-500 p-6 mb-9">
              <Link to="/">
                <h1 className="text-3xl text-white font-sans hover:text-gray-400">
                  Adopt me!
                </h1>
              </Link>
            </header>
            <Switch>
              <Route path="/details/:id">
                <Details />
              </Route>
              <Route path="/">
                <SearchParams />
              </Route>
            </Switch>
          </Router>
        </div>
      </Suspense>
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
