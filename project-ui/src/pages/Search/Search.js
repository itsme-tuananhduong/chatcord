import { useContext, useState } from "react";
import api from "../../api";
import { Col, Row, Card, Button, Form, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import RoomCard from "../../components/RoomCard/RoomCard";
import { AuthContext } from "../../App";

function Search() {
  const [form, setForm] = useState({
    roomName: "",
  });
  const [roomList, setroomList] = useState([]);
  const [isLoading, setisLoading] = useState("invisible");

  const onChangeForm = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    const roomInfo = {
      roomName: form.roomName,
    };
    const res = await api({
      url: "http://localhost:5000/api/room/search-room",
      method: "GET",
      params: {
        keyword: roomInfo.roomName,
      },
    });
    if (res.success === 1) {
      console.log(res.data);
      setroomList(res.data);
      setisLoading("");
      // history.push("/explore");
      // window.location.reload();
    }
  };

  const renderRoomCard = (roomList) => {
    return roomList.map((room) => (
      <RoomCard
        id={room._id}
        roomName={room.roomName}
        roomAvatar={room.roomAvatar}
        createdBy={room.createdBy}
      />
    ));
  };

  return (
    <Container>
      <Row>
        <Col xs={10}>
          <Card style={{ width: "30rem" }} className="">
            <div className="m-5">
              <h1 className="dark-text m-5">Search room</h1>
              <Form onSubmit={onSubmitForm}>
                <Form.Group controlId="formBasicText">
                  <Form.Label>Enter room name</Form.Label>
                  <Form.Control
                    value={form.roomName}
                    type="text"
                    placeholder="Type room name here"
                    name="roomName"
                    onChange={onChangeForm}
                  />
                </Form.Group>

                <Button variant="primary none-margin" type="submit" block>
                  Search
                </Button>
              </Form>
            </div>
          </Card>
          <div className={isLoading}>
            <Card style={{ width: "48rem" }} className="my-4">
              <div className="flex">{renderRoomCard(roomList)}</div>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Search;

// function Search() {
//   return <div></div>;
// }

// export default Search;
