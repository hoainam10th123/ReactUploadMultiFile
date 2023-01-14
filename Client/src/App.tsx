import './App.css';
import { Col, Container, Navbar, Row } from 'react-bootstrap';
import Upload from './components/upload';

function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo192.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            React Bootstrap
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        <Row>
          <Col>
            <Upload />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
