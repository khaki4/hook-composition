import React, { useState } from "react";
import { useLocalStorage } from "./hooks";

function App() {
  const [value, setValue] = useLocalStorage("inputValue", "");
  const onChange = React.useCallback(e => {
    setValue(e.currentTarget.value);
  });
  return (
    <div className="App">
      <div className="test">
        <input value={value} onChange={onChange} />
      </div>
    </div>
  );
}

function Message(props) {}

export default App;
