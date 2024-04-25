/* eslint-disable @typescript-eslint/no-useless-constructor */
import "./App.css";
import { init, render } from "react-canvaskit";
import React from "react";
import CanvasKit from "./CanvasKit";
namespace App {
  export interface Props {
  }
  export interface State {
    ckLoaded: boolean,
  }
}
export default class App extends React.Component<App.Props, App.State> {
  constructor(props: any) {
    super(props);
    this._getStateVal = this._getStateVal.bind(this);
    this._refFunc = this._refFunc.bind(this);
    this.state = this._getStateVal();
  }

  _getStateVal() {
    return {
      ckLoaded: false,
    }
  }

  _refFunc(_ref: any) {
    if (_ref) {
      render(<CanvasKit />, _ref,);
    }
  }

  componentDidMount() {
    const self = this;
    init().then(() => {
      self.setState({
        ckLoaded: true,
      });
    })
      .catch((err) => {
        self.setState({
          ckLoaded: false,
        });
      })
  }

  render() {
    const { ckLoaded } = this.state;
    return ckLoaded ? (
      <div className="App" style={{ overflow: "hidden" }}>
        <canvas
          width={window.innerWidth}
          height={window.innerHeight}
          ref={this._refFunc}
          id="canvas"
        ></canvas>
      </div>
    ) : null;
  }
}
