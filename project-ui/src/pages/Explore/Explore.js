import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../App";
import { Col, Row, Button, Container, Card } from "react-bootstrap";
import api from "../../api";
import Sidebar from "../../components/Sidebar/Sidebar";
import CreateChat from "../../components/CreateChat/CreateChat";
import RoomCard from "../../components/RoomCard/RoomCard";
import CustomPagination from "../../components/Pagination/Pagination";

function Explore() {
  const authValue = useContext(AuthContext);
  const { user, setUser } = authValue;
  const [roomList, setroomList] = useState([]);
  const [loading, setloading] = useState(1);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  console.log(roomList);

  const onChangePage = (page) => {
    setPage(page);
  };

  const getRoom = async () => {
    // const offset = (page - 1) * limit;
    const res = await api({
      url: "http://localhost:5000/api/room/get-room",
      method: "GET",
      params: {
        page,
        limit: 3,
      },
    });
    if (res.success) {
      console.log(res.data);
      setroomList(res.data.data);
      setTotal(res.data.total);
      setloading(0);
    }
  };

  useEffect(() => {
    getRoom();
    console.log("here");
  }, [page]);

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
        <Col>
          <Sidebar />
        </Col>
        <Col xs={10}>
          <CreateChat />
          <Card style={{ width: "48rem" }} className="my-4">
            {loading === 0 && (
              <div className="flex">{renderRoomCard(roomList)}</div>
            )}
            {loading === 1 && <div>Please wait...</div>}
            <CustomPagination
              className="pagination"
              current={page}
              total={total}
              onChangePage={onChangePage}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Explore;
