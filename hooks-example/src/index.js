import React from "react";
import ReactDOM from "react-dom";
import ContextComponent from "./Context";
import EffectComponent from "./Effect";
import ReducerComponent from "./Reducer";
import RefComponent from "./Ref";
import StateComponent from "./State";

function App() {
  return (
    <div className="App">
      <StateComponent></StateComponent>
      <hr />
      <EffectComponent></EffectComponent>
      <hr />
      <ContextComponent></ContextComponent>
      <hr />
      <RefComponent></RefComponent>
      <hr />
      <ReducerComponent></ReducerComponent>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
