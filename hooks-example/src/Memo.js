import { useMemo, useState } from "react";

const fibonaci = (n) => {
  if (n <= 1) {
    return n;
  }
  return fibonaci(n - 1) + fibonaci(n - 2);
};

const MemoComponent = () => {
  const [num, setNum] = useState(1);
  const [isGreen, setIsGreen] = useState(true);
  const fibo = useMemo(() => fibonaci(num), [num]);
  //const fibo = fibonaci(num);  use this to see the performance diff when rendering

  return (
    <div>
      <h1 style={{ color: isGreen ? "limegreen" : "crimson" }} onClick={() => setIsGreen(!isGreen)}>
        useMemo example
      </h1>
      <h2>
        Fibonaci of {num} is {fibo}
      </h2>
      <button onClick={() => setNum(num + 1)}>+</button>
    </div>
  );
};
export default MemoComponent;
