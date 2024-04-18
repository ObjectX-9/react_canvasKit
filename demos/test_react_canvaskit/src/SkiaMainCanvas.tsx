import { CanvasKit } from "./CanvasKit";
function SkiaMainCanvas() {
  return (
    <ck-canvas>
      <ck-surface
        width={window.innerWidth}
        height={window.innerHeight}
        dx={0}
        dy={0}
      >
        <CanvasKit />
      </ck-surface>
    </ck-canvas>
  );
}

export default SkiaMainCanvas;
