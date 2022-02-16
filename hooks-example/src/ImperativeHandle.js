import { useState, useRef, useImperativeHandle, forwardRef } from "react";

// eslint-disable-next-line react/display-name
const ElaborateInput = forwardRef(({ hasError, placeholder, value, update }, ref) => {
  const inputRef = useRef();
  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current.focus();
      }
    };
  });
  return (
    <input
      ref={inputRef}
      value={value}
      onChange={(e) => update(e.target.value)}
      placeholder={placeholder}
      style={{
        padding: "5px 15px",
        borderWidth: "3px",
        borderStyle: "solid",
        bordeColor: hasError ? "crimson" : "#999",
        borderRadius: "5px",
        margin: "0 10px",
        textAlign: "center"
      }}
    />
  );
});

const ImperativeHandleComponent = () => {
  const [city, setCity] = useState("Seattle");
  const [state, setState] = useState("WA");
  const [error, setError] = useState("");
  const cityEl = useRef();
  const stateEl = useRef();

  function validate() {
    if (!/^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]+$/.test(city)) {
      setError("city");
      cityEl.current.focus();
      return;
    }

    if (!/^[A-Z]{2}$/.test(state)) {
      setError("state");
      stateEl.current.focus();
      return;
    }
    setError("");
    alert("valid form!");
  }

  return (
    <div>
      <h1>useImperativeHandle example</h1>
      <ElaborateInput
        hasError={error === "city"}
        placeholder={"city"}
        value={city}
        update={setCity}
        ref={cityEl}
      />
      <ElaborateInput
        hasError={error === "state"}
        placeholder={"state"}
        value={state}
        update={setState}
        ref={stateEl}
      />
      <button onClick={validate}>validate form</button>
    </div>
  );
};
export default ImperativeHandleComponent;
