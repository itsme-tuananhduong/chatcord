import { Col, Row, Container } from "react-bootstrap";
import Sidebar from "../../components/Sidebar/Sidebar";
import List from "../../components/List/List";
import OptionBox from "../../components/OptionBox/OptionBox";

function Connect() {
  return (
    <Container>
      <Row>
        <Col>
          <Sidebar />
        </Col>
        <Col xs={10}>
          <OptionBox />
        </Col>
      </Row>
    </Container>
  );
}

export default Connect;
