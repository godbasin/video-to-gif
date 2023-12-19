import { useState, forwardRef } from 'react';
import { fetchFile } from '@ffmpeg/util';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

interface IProps {
  videoUrl: string,
  startTime: number,
  endTime: number,
  setGif: (gif: string) => void,
}

const VideoSetting = forwardRef(function VideoSetting({ videoUrl, startTime, endTime, setGif }: IProps, ffmpegRef: any) {
  const [fps = 12, setFps] = useState<number | undefined>();
  const [width = 250, setWidth] = useState<number | undefined>();
  const [validated, setValidated] = useState(false);
  const ffmpeg = ffmpegRef.current;

  const convertToGif = async () => {
    await ffmpeg.writeFile('test.mp4', await fetchFile(videoUrl));
    await ffmpeg.exec([
      '-i', 'test.mp4',
      '-t', `${startTime}`,
      '-ss', `${endTime - startTime}`,
      '-filter_complex',
      `[0:v] fps=${fps},scale=w=${width}:h=-1,split [a][b];[a] palettegen [p];[b][p] paletteuse`,
      '-f', 'gif',
      'out.gif',
    ]);
    const data: any = await ffmpeg.readFile('out.gif');
    const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));
    setGif(url);
  }
  
  const checkValid = () => {
    const form: any = document.getElementById('gif-generate');
    if (form?.checkValidity() === false && validated) {
      setValidated(false);
    } else if (!validated) {
      setValidated(true);
    }
  };

  checkValid();

  return (
    <>
      <Form id="gif-generate" noValidate>
        <Form.Group as={Row} className="mb-3" >
          <Form.Label>开始时间（秒）：</Form.Label>
          <Col>
            <Form.Control disabled type="number" value={startTime} isInvalid={startTime === undefined} />
            <Form.Control.Feedback type="invalid">请选择 Gif 开始时间</Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" >
          <Form.Label>结束时间（秒）：</Form.Label>
          <Col>
            <Form.Control disabled type="number" value={endTime} isInvalid={endTime === undefined || endTime <= startTime} />
            <Form.Control.Feedback type="invalid">结束时间必须大于开始时间</Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" >
          <Form.Label>fps 帧率：</Form.Label>
          <Col>
            <Form.Control type="number" placeholder='默认值：12' value={fps} onChange={(e) => setFps(Number(e.target.value))} isInvalid={!fps} />
            <Form.Control.Feedback type="invalid">请输入 fps 帧率</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" >
          <Form.Label>width 宽度（px）：</Form.Label>
          <Col>
            <Form.Control type="number" placeholder='默认值：250' value={width} onChange={(e) => setWidth(Number(e.target.value))} isInvalid={!width} />
            <Form.Control.Feedback type="invalid">请输入 width 宽度</Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" >
          <Col sm={{ span: 10, offset: 2 }}>
            <Button disabled={!validated} onClick={convertToGif}>转换为 Gif</Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  )
});

export default VideoSetting;
