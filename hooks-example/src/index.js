import React from "react";
import ReactDOM from "react-dom";
import Callback from "./Callback";
import ContextComponent from "./Context";
import DebugValueComponent from "./DebugValue";
import EffectComponent from "./Effect";
import ImperativeHandleComponent from "./ImperativeHandle";
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
      <hr />
      <ImperativeHandleComponent></ImperativeHandleComponent>
      <hr />
      <DebugValueComponent></DebugValueComponent>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
