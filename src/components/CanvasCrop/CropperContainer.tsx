import { useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

interface IProps {
    imageUrl: string,
    width: number,
    height: number,
    // cropX: number,
    // cropY: number,
    // cropWidth: number,
    // cropHeight: number,
    setCropX: (x: number) => void,
    setCropY: (y: number) => void,
    setCropWidth: (w: number) => void,
    setCropHeight: (h: number) => void,
  }

export default function CropperContainer({
  // cropX,
  setCropX,
  // cropY,
  setCropY,
  // cropWidth,
  setCropWidth,
  // cropHeight,
  setCropHeight,
  imageUrl,
  width,
  height,
}: IProps) {
  const cropperRef = useRef<ReactCropperElement>(null);

  const toFixed = (x: number, y: number) => {
    return Number(Number(x).toFixed(y));
  }
  const onCrop = (event) => {
    const { x, y, width, height } = event.detail;
    setCropX(toFixed(x, 2));
    setCropY(toFixed(y, 2));
    setCropWidth(toFixed(width, 0));
    setCropHeight(toFixed(height, 0));
  };

  return (
    <Cropper
      src={imageUrl}
      style={{ height, width }}
      initialAspectRatio={16 / 9}
      guides={false}
      crop={onCrop}
      ref={cropperRef}
    />
  );
}
