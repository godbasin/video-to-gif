import ProgressBar from "react-bootstrap/ProgressBar";
import { IGifInfo } from "../interfaces";
import { TRANSCODE_STATUES } from "../interfaces/common";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

interface IProps {
  loadingPercentage: number;
  gifInfos: IGifInfo[];
  transcodeStatus: TRANSCODE_STATUES;
}

export default function LoadGif({
  gifInfos,
  loadingPercentage,
  transcodeStatus,
}: IProps) {
  const percentage = Number((loadingPercentage * 100).toFixed(0));

  const downloadGif = async (url: string) => {
    const a = document.createElement("a");
    a.download = "gif";
    const response = await fetch(url);
    const blobImage = await response.blob();
    const href = URL.createObjectURL(blobImage);
    a.href = href;
    a.dataset.downloadurl = [
      "application/octet-stream",
      a.download,
      a.href,
    ].join(":");
    a.click();
  };

  return (
    <>
      {gifInfos.map(({ url }) => (
        <Card key={url} className="mb-3">
          <Card.Img variant="top" src={url} />
          <Card.Body>
            <Button
              variant="primary"
              onClick={async () => await downloadGif(url)}
            >
              下载 Gif
            </Button>
          </Card.Body>
        </Card>
      ))}
      {transcodeStatus === TRANSCODE_STATUES.TRANSCODING && (
        <Card>
          <Card.Body>
            <ProgressBar className="mt-3 mb-3" animated now={percentage} />
          </Card.Body>
        </Card>
      )}
    </>
  );
}
