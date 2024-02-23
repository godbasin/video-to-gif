import { Component } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

interface IProps {
  imageUrl: string;
  width: number;
  height: number;
  cropX: number,
  cropY: number,
  cropWidth: number,
  cropHeight: number,
  setCropX: (x: number) => void;
  setCropY: (y: number) => void;
  setCropWidth: (w: number) => void;
  setCropHeight: (h: number) => void;
}

const toFixed = (x: number, y: number) => {
  return Number(Number(x).toFixed(y));
};

export default class CropperContainer extends Component<IProps, null> {
  cropper: Cropper = null;

  constructor(props) {
    super(props);
  }

  onCrop(event) {
    const {
      setCropX, setCropY, setCropWidth, setCropHeight,
    } = this.props;
    const { x, y, width, height } = event.detail;
    setCropX(toFixed(x, 2));
    setCropY(toFixed(y, 2));
    setCropWidth(toFixed(width, 0));
    setCropHeight(toFixed(height, 0));
  }

  onCropperInit(cropper) {
      this.cropper = cropper;
  }

  componentDidUpdate(prevProps) {
    const {
      cropX, cropY, cropHeight, cropWidth
    } = this.props;
    let newCropX = prevProps.cropX;
    let newCropY = prevProps.cropY;
    let newCropHeight = prevProps.cropHeight;
    let newCropWidth = prevProps.cropWidth;
    let needUpdate = false;
    if (cropX !== prevProps.cropX) {
      newCropX = cropX;
      needUpdate = true;
    }
    if (cropY !== prevProps.cropY) {
      newCropY = cropY;
      needUpdate = true;
    }
    if (cropHeight !== prevProps.cropHeight) {
      newCropHeight = cropHeight;
      needUpdate = true;
    }
    if (cropWidth !== prevProps.cropWidth) {
      newCropWidth = cropWidth;
      needUpdate = true;
    }
    if(this.cropper && needUpdate) {
      this.cropper.setData({
        x: newCropX,
        y: newCropY,
        width: newCropWidth,
        height: newCropHeight,
      })
    }
  }

  render() {
    const {
      imageUrl, cropX, cropY, cropHeight, cropWidth, height, width,
    } = this.props;
    return (
      <Cropper
        src={imageUrl}
        data={{
          x: cropX,
          y: cropY,
          width: cropWidth,
          height: cropHeight,
        }}
        style={{ height, width }}
        initialAspectRatio={16 / 9}
        guides={false}
        crop={this.onCrop.bind(this)}
        onInitialized={this.onCropperInit.bind(this)}
      />
    );
  }
}