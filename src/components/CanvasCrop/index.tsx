import { Component } from "react";
import CropperContainer from "./CropperContainer";
import "cropperjs/dist/cropper.css";
import "./index.css";

interface IProps {
  isCropping: boolean;
  cropX: number;
  setCropX: (x: number) => void;
  cropY: number;
  setCropY: (y: number) => void;
  cropWidth: number;
  setCropWidth: (w: number) => void;
  cropHeight: number;
  setCropHeight: (h: number) => void;
}

interface IStatus {
  vedioImgUrl: string;
  width: number;
  height: number;
}

export default class CanvasCrop extends Component<IProps, IStatus> {
  constructor(props) {
    super(props);
    this.state = {
      vedioImgUrl: "",
      width: 0,
      height: 0,
    };
  }

  drawImage() {
    const video = document.getElementsByTagName("video")[0];
    const canvas = document.getElementsByTagName("canvas")[0];
    if (!video || !canvas) return;
    const ctx = canvas.getContext("2d")!;
    const videoHeight = video.videoHeight;
    const videoWidth = video.videoWidth;
    const ratio = videoWidth / videoHeight;
    const width = video.width;
    const height = width / ratio;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(video, 0, 0, width, height);
    const dataURL = canvas.toDataURL();
    this.setState({
      vedioImgUrl: dataURL,
      width,
      height,
    });
  }

  componentDidUpdate(prevProps) {
    const isCropping = this.props.isCropping;
    if (isCropping && isCropping !== prevProps.isCropping) {
      this.drawImage();
    }
  }

  render() {
    const { isCropping, setCropX, setCropY, setCropWidth, setCropHeight } =
      this.props;
    const { vedioImgUrl, width, height } = this.state;
    return isCropping ? (
      <>
        <canvas id="video-canvas" className="video-canvas" />
        {vedioImgUrl && (
          <CropperContainer
            setCropX={setCropX}
            setCropY={setCropY}
            setCropWidth={setCropWidth}
            setCropHeight={setCropHeight}
            imageUrl={vedioImgUrl}
            width={width}
            height={height}
          />
        )}
      </>
    ) : null;
  }
}
