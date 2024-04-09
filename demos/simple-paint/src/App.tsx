import type { FunctionComponent } from "react";
import React from "react";

export const App: FunctionComponent = () => {
  return (
    <ck-canvas clear={{ red: 255, green: 165, blue: 0 }}>
      <ck-text
        x={5}
        y={50}
        paint={{ color: "#00FFFF", antiAlias: true }}
        font={{ size: 24 }}
      >
        Hello React-CanvasKit!
      </ck-text>
      <ck-surface width={200} height={200} dx={0} dy={0}>
        <ck-canvas clear="#FF00FF" rotate={{ degree: 45 }}>
          <ck-text> React-CanvasKit.</ck-text>
          <ck-line
            x1={0}
            y1={10}
            x2={142}
            y2={10}
            paint={{ antiAlias: true, color: "#FFFFFF", strokeWidth: 10 }}
          />
        </ck-canvas>
      </ck-surface>
    </ck-canvas>
  );
};
