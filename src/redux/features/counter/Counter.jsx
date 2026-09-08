import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, reset, incrementByAmount } from "./createSlice";

export function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>
        Increment by 5
      </button>
      <button onClick={() => dispatch(reset())}>Reset</button>

      <input
        type="number"
        onChange={(e) => dispatch(incrementByAmount(Number(e.target.value)))}
      />
    </div>
  );
}
