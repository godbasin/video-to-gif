export default function LoadGif({ gif }: { gif: string }) {

  const downloadGif = async () => {
    const a = document.createElement('a');
    a.download = 'gif';
    a.href = gif;
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
  };

  return gif ? (
  <>
    <img src={gif} />
    <div className="btn-group mt-2">
      <a className="btn btn-info" onClick={downloadGif}>下载 Gif</a>
    </div>
  </>
  ) : null;
}
