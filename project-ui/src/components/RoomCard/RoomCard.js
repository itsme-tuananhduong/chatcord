import { useContext } from "react";
import { AuthContext } from "../../App";
import api from "../../api";
import { useHistory } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

function RoomCard({ id, roomName, roomAvatar, createdBy }) {
  const authValue = useContext(AuthContext);
  const { user } = authValue;
  const history = useHistory();

  const onClick = async () => {
    console.log(id);
    const res = await api({
      url: "http://localhost:5000/api/room/delete-room",
      method: "DELETE",
      params: {
        id,
      },
    });
    if (res.success) {
      window.location.reload();
      console.log("deleted");
    }
  };

  const onJoin = () => {
    sessionStorage.setItem("chatRoomId", roomName);
    history.push("/chat-room");
  };

  return (
    <div className="Card m-2">
      <Card style={{ width: "15rem" }}>
        <Card.Img variant="top" src={roomAvatar} roundedCircle />
        <Card.Body>
          <Card.Title>{roomName}</Card.Title>
          <Card.Text>Created by: {createdBy}</Card.Text>
          <Button variant="primary" onClick={onJoin}>
            Join
          </Button>
          {user.username === createdBy && (
            <Button variant="primary" onClick={onClick}>
              Delete room
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default RoomCard;
