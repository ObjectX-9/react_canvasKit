import { useEffect, useRef, useState } from "react";
import "./App.css";
import { init, render } from "react-canvaskit";
import SkiaMainCanvas from "./SkiaMainCanvas";
function App() {
  const [ckLoaded, setCkloaded] = useState(false);
  const canvas = useRef(null);
  useEffect(() => {
    init()
      .then((res) => {
        setCkloaded(true);
      })
      .catch((err) => {
        setCkloaded(false);
      });
  }, []);

  useEffect(() => {
    canvas.current && render(<SkiaMainCanvas />, canvas.current);
  }, [ckLoaded]);

  return ckLoaded ? (
    <div className="App" style={{ overflow: "hidden" }}>
      <canvas
        width={window.innerWidth}
        height={window.innerHeight}
        ref={canvas}
        id="canvas"
      ></canvas>
    </div>
  ) : null;
}

export default App;
