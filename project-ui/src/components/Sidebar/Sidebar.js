import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Nav, ListGroup, Button } from "react-bootstrap";
import { AuthContext } from "../../App";

function Sidebar() {
  const authValue = useContext(AuthContext);
  const history = useHistory();
  const { user, logout } = authValue;

  const onHandleLogout = () => {
    sessionStorage.setItem("isLogin", 0);
    logout();
    history.push("/login");
  };

  // <ListGroup.Item as="li" active>
  //   Cras justo odio
  //   <ListGroup.Item as="li">Dapibus ac facilisis in</ListGroup.Item>
  //   <ListGroup.Item as="li" disabled>
  //     Morbi leo risus
  //   </ListGroup.Item>
  //   <ListGroup.Item as="li">Porta ac consectetur ac</ListGroup.Item>
  // </ListGroup>;

  return (
    <div>
      {!user && (
        <>
          <ListGroup as="ul">
            <ListGroup.Item as="li">
              <Link className="dark-text" to="/login">
                Login
              </Link>
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <Link className="dark-text" to="/signup">
                Signup
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </>
      )}
      {user && (
        <>
          <ListGroup as="ul">
            <ListGroup.Item as="li">
              <Link to="/" className="dark-text">
                Home
              </Link>
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <Link to="/explore" className="dark-text">
                Explore
              </Link>
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <Link to="/connect" className="dark-text">
                Connect
              </Link>
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <Link to="/profile" className="dark-text">
                Profile
              </Link>
            </ListGroup.Item>
            <Button className="none-margin" onClick={onHandleLogout}>
              Logout
            </Button>
          </ListGroup>
        </>
      )}
    </div>
  );
}

export default Sidebar;
