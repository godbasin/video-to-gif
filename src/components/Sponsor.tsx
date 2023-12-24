import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Image from 'react-bootstrap/Image';

const popover = (
  <Popover>
    <Popover.Header as="h3">微信赞赏码</Popover.Header>
    <Popover.Body>
      <Image src='https://github-imglib-1255459943.cos.ap-chengdu.myqcloud.com/2code2.jpg' />
    </Popover.Body>
  </Popover>
);

export default function Sponsor() {
  return (
    <OverlayTrigger trigger={['click']} placement="bottom" overlay={popover}>
      <Button variant="outline-light" size="sm" style={{marginLeft: '1rem'}}>支持</Button>
    </OverlayTrigger>
  );
}
