import { useContext, useState } from "react";
import { AuthContext } from "../../App";
import api from "../../api";
import { Col, Row, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

function Profile() {
  const authValue = useContext(AuthContext);
  const { user } = authValue;
  const [currentUser, setuser] = useState(user);

  const onClick = async () => {
    console.log(user._id);
    const res = await api({
      url: "http://localhost:5000/api/auth/delete-account",
      method: "DELETE",
      params: {
        id: user._id,
      },
    });
    if (res.success) console.log("deleted");
  };

  return (
    <div className="container" fluid>
      <Row>
        <Col>
          <Sidebar />
        </Col>
        <Col xs={10}>
          <div>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={currentUser.avatarLink}
                roundedCircle
              />
              <Card.Body>
                <Card.Text>Username</Card.Text>
                <Card.Title>{currentUser.username}</Card.Title>
                <Button variant="primary">
                  <Link to="/change-profile">Update your profile</Link>
                </Button>
                <Button variant="primary" onClick={onClick}>
                  Delete account
                </Button>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Profile;
