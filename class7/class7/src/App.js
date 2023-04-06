import logo from "./logo.svg";
import "./App.css";
import Button from "./components/Button";
import Counter from "./components/Counter";
import { useState } from "react";

function App() {
  const [number, setNumber] = useState(0);

  return (
    <div className="flex justify-between items-center  bg-[#201f1f] h-[100vh]">
      <Button data="+" setNumber={setNumber} number={number} type={"add"} />
      <Counter value={number} />
      <Button
        data="-"
        setNumber={setNumber}
        type={"subtract"}
        number={number}
      />
    </div>
  );
}

export default App;
