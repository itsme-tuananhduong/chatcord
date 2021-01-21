import { useContext } from "react";
import { useHistory } from "react-router-dom";
import api from "../../api/index";
import { Button, Card } from "react-bootstrap";
import { AuthContext } from "../../App";

function OptionBox() {
  const history = useHistory();
  const authValue = useContext(AuthContext);
  const { user, setRandomChatRoom } = authValue;

  const onClick = async (e) => {
    const res = await api({
      url: "http://localhost:5000/api/req/random-chat",
      method: "POST",
      data: {
        userSend: user._id,
      },
    });
    if (res.success === 1) {
      //   const data = await api({
      //     url: `http://localhost:5000/api/room/${res.data}`,
      //     method: "GET",
      //   });

      history.push("/random-chat");
      setRandomChatRoom({ roomId: res.data.roomId, status: res.data.status });
      sessionStorage.setItem("roomId", res.data.roomId);
    } else if (res.success === 2) {
      history.push("/random-chat");
      setRandomChatRoom({ roomId: res.data.roomId, status: res.data.status });
      sessionStorage.setItem("roomId", res.data.roomId);
    } else {
      history.push("/connect");
    }
  };

  return (
    <Card>
      <h1 className="dark-text m-5">Let's find a random friend...</h1>
      <div className="mb-5">
        <Button onClick={onClick} variant="primary">
          Connect now
        </Button>
      </div>
    </Card>
  );
}

export default OptionBox;
