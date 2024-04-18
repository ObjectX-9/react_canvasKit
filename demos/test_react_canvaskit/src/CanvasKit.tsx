import { useState, type FunctionComponent } from "react";
const imageDataPromise = fetch(
  "https://pic1.zhimg.com/80/v2-e23d1d5f4abeff7b6d3a0c54d8ef26d8_1440w.webp"
).then((resp) => resp.arrayBuffer());
export const CanvasKit: FunctionComponent = () => {
  const [imageBytes, setImageBytes] = useState<ArrayBuffer | null>(null);
  imageDataPromise.then((imageData) => setImageBytes(imageData));
  return (
    <ck-canvas clear={{ red: 255, green: 165, blue: 0 }}>
      {imageBytes && <ck-encoded-image top={20} left={20} bytes={imageBytes} />}
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
