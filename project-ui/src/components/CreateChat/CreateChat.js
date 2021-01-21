import { useContext, useState } from "react";
import { AuthContext } from "../../App";
import api from "../../api";
import firebase from "@firebase/app";
import "@firebase/storage";
import firebaseConfig from "../../config/config";
import { Col, Row, Card, Button, Form, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

function CreateChat() {
  const authValue = useContext(AuthContext);
  const { user, setUser } = authValue;
  const [form, setForm] = useState({
    roomName: "",
  });
  const [warning, setwarning] = useState({ className: "invisible", msg: "" });
  const history = useHistory();

  const onChangeForm = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();

    const newRoom = {
      userSend: user.username,
      roomName: form.roomName,
      roomAvatar: "",
    };
    console.log("create");
    if (!event.target.avatar.files.length) {
      newRoom.roomAvatar = `https://firebasestorage.googleapis.com/v0/b/cfjs-42-anhdt.appspot.com/o/default-avatar%2Fdefault-avatar-${Math.floor(
        Math.random() * 5 + 1
      )}.png?alt=media&token=aa788f9c-7501-44fb-868e-441c121ddc2e`;
      if (newRoom.roomName === "") {
        setwarning({ className: "visible", msg: "Please enter room name" });
      } else {
        const res = await api({
          url: "http://localhost:5000/api/room/create-room",
          method: "POST",
          data: newRoom,
        });
        if (res.success === 1) {
          console.log(res.data);
          // history.push("/explore");
          window.location.reload();
        }
      }
    } else {
      const file = event.target.avatar.files[0];
      const storageRef = firebase
        .storage()
        .ref(
          `room-data/${newRoom.roomName}/avatar/${newRoom.roomName}.${
            file.name.split(".")[1]
          }`
        );
      const task = storageRef.put(file);
      task.on(
        "state_changed",
        function (snapshot) {
          // // Observe state change events such as progress, pause, and resume
          // // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log('Upload is ' + progress + '% done');
          // switch (snapshot.state) {
          //   case firebase.storage.TaskState.PAUSED: // or 'paused'
          //     console.log('Upload is paused');
          //     break;
          //   case firebase.storage.TaskState.RUNNING: // or 'running'
          //     console.log('Upload is running');
          //     break;
          // }
        },
        function (error) {},
        function () {
          task.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
            newRoom.roomAvatar = downloadURL;
            if (newRoom.roomName === "") {
              setwarning("visible");
            } else {
              const res = await api({
                url: "http://localhost:5000/api/room/create-room",
                method: "POST",
                data: newRoom,
              });
              if (res.success === 1) {
                console.log(res.data);
                // history.push("/explore");
                window.location.reload();
              }
            }
          });
        }
      );
    }
  };

  return (
    <Card style={{ width: "30rem" }} className="">
      <div className="m-5">
        <Alert className={warning.className} variant="warning">
          {warning.msg}
        </Alert>
        <Form onSubmit={onSubmitForm}>
          <Form.Group controlId="formBasicText">
            <Form.Label>Set room name</Form.Label>
            <Form.Control
              value={form.roomName}
              type="text"
              placeholder="Set room name"
              name="roomName"
              onChange={onChangeForm}
            />
          </Form.Group>
          <Form.Group>
            <label for="cover">Room avatar</label>
            <input type="file" name="avatar"></input>
          </Form.Group>
          <Button className="none-margin" variant="primary" type="submit" block>
            Create room
          </Button>
        </Form>
      </div>
    </Card>
  );
}

export default CreateChat;
