import { useEffect, useState, useContext } from "react";
import { Col, Row, Container, Image } from "react-bootstrap";
import MainLayout from "../../components/Layout/MainLayout";
import Sidebar from "../../components/Sidebar/Sidebar";
import { AuthContext } from "../../App";

function Home() {
  const authValue = useContext(AuthContext);
  const { user } = authValue;
  const [isLogin, setisLogin] = useState(1);

  const getItem = async () => {
    const item = await sessionStorage.getItem("isLogin");
    console.log(item);
    setisLogin(item);
    console.log(isLogin);
  };

  useEffect(() => {
    getItem();
  }, [isLogin]);

  const render = () => {
    if (isLogin) return <MainLayout />;
    return <div></div>;
  };

  return (
    <Container>
      <Row>
        <Col>
          <Sidebar />
        </Col>
        <Col xs={10}>
          {user && <MainLayout />}
          {!user === 0 && <div></div>}
          {/* {render()} */}
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
