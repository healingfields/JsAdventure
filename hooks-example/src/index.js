import React from "react";
import ReactDOM from "react-dom";
import Callback from "./Callback";
import ContextComponent from "./Context";
import EffectComponent from "./Effect";
import LayoutEffectComponent from "./LayoutEffect";
import MemoComponent from "./Memo";
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
      <hr />
      <MemoComponent></MemoComponent>
      <hr />
      <Callback></Callback>
      <hr />
      <LayoutEffectComponent></LayoutEffectComponent>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
