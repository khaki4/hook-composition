import React, { useState, useRef } from "react";
import { useLocalStorage } from "./hooks";

function useUndo([state, setState]) {
  const historyRef = useRef([state]);
  const [index, setIndex] = useState(0);

  function undo() {
    setIndex(index - 1);
  }
  function redo() {
    setIndex(index + 1);
  }
  function newSetState(nextState) {
    const nextIndex = index + 1;
    historyRef.current[nextIndex] = nextState;
    setIndex(nextIndex);
    setState(nextState);
  }

  return [historyRef.current[index], newSetState, undo, redo];
}

function App() {
  const [value, setValue, undo, redo] = useUndo(useLocalStorage("inputValue", ""));
  const onChange = React.useCallback(e => {
    setValue(e.currentTarget.value);
  });
  return (
    <div className="App">
      <div className="test">
        <button onClick={undo}>undo</button>
        <input value={value} onChange={onChange} />
        <button onClick={redo}>redo</button>
      </div>
    </div>
  );
}

export default App;
