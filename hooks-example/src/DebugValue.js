import { useState, useEffect, useDebugValue } from "react";

const useIsRaining = () => {
  const [isRaining, setIsRaining] = useState(false);

  useEffect(() => {
    setIsRaining(Math.random() > 0.5);
  });

  useDebugValue(isRaining ? "is raining " : "is not raining");

  return isRaining;
};

const DebugValueComponent = () => {
  const isRaining = useIsRaining();

  return (
    <div>
      <h1>useDebug example</h1>
      <h2>DO you need a coat today?{isRaining ? "yes" : "maybe"}</h2>
    </div>
  );
};

export default DebugValueComponent;
