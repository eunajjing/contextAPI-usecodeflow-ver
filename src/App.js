import React from "react";
import ColorBox from "./components/ColorBox";
import SelectColors from "./components/SelectColors";
import { ColorProvider } from "./contexts/color";

function App() {
  return (
    <ColorProvider>
      <div>
        <SelectColors />
        <hr />
        <ColorBox />
      </div>
    </ColorProvider>
  );
}

export default App;
