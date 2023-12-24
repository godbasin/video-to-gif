import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Sponsor from "./Sponsor";

export default function Navebar() {
  return (
    <Navbar className="nav-top-fixed" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="https://github.com/godbasin/video-to-gif">
          被删的视频转 Gif 小工具
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a
              style={{ textDecoration: "none" }}
              href="https://github.com/godbasin/video-to-gif"
            >
              Github
            </a>
            <Sponsor />
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
