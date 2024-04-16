import Button from "./Button";

interface CounterProps {
  counter: number;
  setCounter: (value: number) => void;
}

export default function Counter({ counter, setCounter }: CounterProps) {
  return (
    <div>
      <h3>Counter:</h3>
      <p>{counter}</p>
      <Button
        disabled={false}
        text="+"
        onClick={() => {
          setCounter(counter + 1);
        }}
      />
      <Button
        disabled={false}
        text="-"
        onClick={() => {
          setCounter(counter - 1);
        }}
      />
      <Button
        disabled={false}
        text="Reset"
        onClick={() => {
          setCounter(0);
        }}
      />
    </div>
  );
}
