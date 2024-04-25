
import "./App.css";
import React from "react";
namespace CanvasKit {
  export interface Props {
  }
  export interface State {
    imageBytes: any,
  }
}
export default class CanvasKit extends React.Component<CanvasKit.Props, CanvasKit.State> {
  constructor(props: any) {
    super(props);
    this._getStateVal = this._getStateVal.bind(this);
    this.state = this._getStateVal();
  }

  _getStateVal() {
    return {
      imageBytes: null,
    }
  }
  componentDidMount() {
    fetch(
      "https://pic1.zhimg.com/80/v2-e23d1d5f4abeff7b6d3a0c54d8ef26d8_1440w.webp"
    )
    .then((resp) =>
      resp.arrayBuffer()
    )
    .then((imageBytes) => {
      this.setState({ imageBytes });
    })
  }

  render() {
    const { imageBytes } = this.state;
    return (
      <ck-canvas clear={{ red: 255, green: 165, blue: 0 }}>
        {imageBytes && <ck-encoded-image height={400} width={800} top={20} left={20} bytes={imageBytes} />}
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
  }
}
