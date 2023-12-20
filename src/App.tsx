import { useState, useRef, useEffect } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import LoadVideo from './components/LoadVideo/index';
import LoadGif from './components/LoadGif';
import VideoSetting from './components/VideoSetting';
import { toBlobURL } from "@ffmpeg/util";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [gif, setGif] = useState('');
  const ffmpegRef = useRef(new FFmpeg());

  const load = async () => {
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      console.log('ffmpeg message: ', message);
    });
    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    await ffmpeg.load({
      coreURL: await toBlobURL(`${location.origin}/ffmpeg/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${location.origin}/ffmpeg/ffmpeg-core.wasm?url`,
        "application/wasm"
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
    setEndTime(videoEle?.currentTime)
  };

  const onFileChange = (event: { target: HTMLInputElement }) => {
    const file = event.target.files?.[0];
    if(!file) return;
    setVideoUrl(URL.createObjectURL(file))
  };

  useEffect(() => {
    load();
  }, [])

  return loaded ? (
    <>
      <Container fluid="sm">
        <Row className="mt-5">
          <Col>
            <LoadVideo videoUrl={videoUrl} onFileChange={onFileChange} />
            {videoUrl && (
              <div className="btn-group">
                <a className="btn btn-warning" onClick={saveStartTime}>设为开始时间</a>
                <a className="btn btn-success" onClick={saveEndTime}>设为结束时间</a>
              </div>
            )}
          </Col>
          <Col>
            <LoadGif gif={gif} />
          </Col>
        </Row>
        <Row className="mt-3">
          {videoUrl && (
            <VideoSetting videoUrl={videoUrl} ref={ffmpegRef} startTime={startTime} endTime={endTime} setGif={setGif} />
          )}
        </Row>
      </Container>
    </>
  ) : <p>加载中...</p>;
}

export default App;
