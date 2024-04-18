import { useState, type FunctionComponent } from "react";
const imageDataPromise = fetch(
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/PNG_Test.png/191px-PNG_Test.png"
).then((resp) => resp.arrayBuffer());
export const CanvasKit: FunctionComponent = () => {
  const [imageBytes, setImageBytes] = useState<ArrayBuffer | null>(null);
  imageDataPromise.then((imageData) => setImageBytes(imageData));
  return (
    <ck-canvas clear={{ red: 255, green: 165, blue: 0 }}>
      {imageBytes && (
        <ck-encoded-image top={10} left={400} bytes={imageBytes} />
      )}
      <ck-text
        x={5}
        y={50}
        paint={{ color: "#00FFFF", antiAlias: true }}
        font={{ size: 24 }}
      >
        Hello React-CanvasKit!
      </ck-text>
    </ck-canvas>
  );
};
