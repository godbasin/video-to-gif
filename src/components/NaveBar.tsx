import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export default function Navebar() {
  return (
    <Navbar className="nav-top-fixed" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>被删的视频转 Gif 小工具</Navbar.Brand>
      </Container>
    </Navbar>
  )
}
