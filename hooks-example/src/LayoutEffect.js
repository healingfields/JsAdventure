import { useState, useLayoutEffect, useRef } from "react";

const LayoutEffectComponent = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const el = useRef();

  useLayoutEffect(() => {
    console.log(el);
    setWidth(el.current.clientWidth);
    setHeight(el.current.clientHeight);
  });

  return (
    <div>
      <h1>useLayoutEffect example</h1>
      <h2>TextArea width: {width}</h2>
      <h2>TextArea height: {height}</h2>
      <textarea onClick={() => setWidth(0)} ref={el}></textarea>
    </div>
  );
};

export default LayoutEffectComponent;
