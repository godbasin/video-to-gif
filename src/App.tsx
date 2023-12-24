import { useState, useRef, useEffect } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import LoadVideo from "./components/LoadVideo/index";
import LoadGif from "./components/LoadGif";
import VideoSetting from "./components/VideoSetting";
import { toBlobURL } from "@ffmpeg/util";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { IGifInfo } from "./interfaces";
import { TRANSCODE_STATUES } from "./interfaces/common";

function App() {
  const [loaded, setLoaded] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [isCropping, setIsCropping] = useState(false);
  const [isCropped, setIsCropped] = useState(false);
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropWidth, setCropWidth] = useState(0);
  const [cropHeight, setCropHeight] = useState(0);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [gifInfos, setGifInfos] = useState<IGifInfo[]>([]);
  const [transcodeStatus, setTranscodeStatus] = useState(
    TRANSCODE_STATUES.INIT,
  );
  const ffmpegRef = useRef(new FFmpeg());

  const load = async () => {
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      console.log("ffmpeg message: ", message);
    });
    ffmpeg.on("progress", ({ progress, time }) => {
      setLoadingPercentage(progress);
      console.log(`ffmpeg progress: ${progress}. transcoded time: ${time}`);
    });
    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    await ffmpeg.load({
      coreURL: await toBlobURL(
        `${location.origin}/video-to-gif/ffmpeg/ffmpeg-core.js`,
        "text/javascript",
      ),
      wasmURL: await toBlobURL(
        `${location.origin}/video-to-gif/ffmpeg/ffmpeg-core.wasm?url`,
        "application/wasm",
      ),
    });
    setLoaded(true);
  };
  const saveStartTime = () => {
    const videoEle = document.querySelector("video");
    if (!videoEle) return;
    setStartTime(videoEle?.currentTime);
  };

  const saveEndTime = () => {
    const videoEle = document.querySelector("video");
    if (!videoEle) return;
    setEndTime(videoEle?.currentTime);
  };

  const onFileChange = (event: { target: HTMLInputElement }) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setVideoUrl(URL.createObjectURL(file));
  };

  useEffect(() => {
    load();
  }, []);

  return loaded ? (
    <>
      <Container fluid="sm">
        <Row className="mt-5">
          <Col>
            <Row>
              <LoadVideo
                videoUrl={videoUrl}
                isCropping={isCropping}
                cropX={cropX}
                setCropX={setCropX}
                cropY={cropY}
                setCropY={setCropY}
                cropWidth={cropWidth}
                setCropWidth={setCropWidth}
                cropHeight={cropHeight}
                setCropHeight={setCropHeight}
                onFileChange={onFileChange}
              />
              {videoUrl && (
                <div className="btn-group mt-2 mb-3">
                  {isCropping ? (
                    <>
                      <a
                        className="btn btn-primary"
                        onClick={() => {
                          setIsCropped(true);
                          setIsCropping(false);
                        }}
                      >
                        确定
                      </a>
                      <a
                        className="btn btn-secondary"
                        onClick={() => {
                          setIsCropped(false);
                          setIsCropping(false);
                        }}
                      >
                        取消裁剪
                      </a>
                    </>
                  ) : (
                    <>
                      <a className="btn btn-warning" onClick={saveStartTime}>
                        设为开始时间
                      </a>
                      <a
                        className="btn btn-info"
                        onClick={() => setIsCropping(true)}
                      >
                        裁剪宽高
                      </a>
                      <a className="btn btn-success" onClick={saveEndTime}>
                        设为结束时间
                      </a>
                    </>
                  )}
                </div>
              )}
            </Row>
            <Row>
              {videoUrl && (
                <VideoSetting
                  videoUrl={videoUrl}
                  ref={ffmpegRef}
                  startTime={startTime}
                  endTime={endTime}
                  cropX={cropX}
                  cropY={cropY}
                  cropWidth={cropWidth}
                  cropHeight={cropHeight}
                  isCropped={isCropped}
                  setLoadingPercentage={setLoadingPercentage}
                  transcodeStatus={transcodeStatus}
                  setTranscodeStatus={setTranscodeStatus}
                  setGifInfos={setGifInfos}
                />
              )}
            </Row>
          </Col>
          <Col>
            <LoadGif
              loadingPercentage={loadingPercentage}
              transcodeStatus={transcodeStatus}
              gifInfos={gifInfos}
            />
          </Col>
        </Row>
      </Container>
    </>
  ) : (
    <p>加载中...</p>
  );
}

export default App;
