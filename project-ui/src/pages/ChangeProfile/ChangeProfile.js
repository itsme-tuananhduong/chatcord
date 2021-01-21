import { useContext, useState } from "react";
import { AuthContext } from "../../App";
import api from "../../api";
import firebase from "@firebase/app";
import "@firebase/storage";
import firebaseConfig from "../../config/config";
import { Col, Row, Card, Button, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

function ChangeProfile() {
  console.log("here");

  const authValue = useContext(AuthContext);
  const { user, setUser } = authValue;
  const [currentUser, setuser] = useState(user);
  const [form, setForm] = useState({
    username: currentUser.username,
    newPassword: "",
  });
  const [warning, setwarning] = useState("invisible");
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

    const updateInfo = {
      userSend: currentUser.email,
      username: form.username,
      newPassword: form.newPassword,
      avatarLink: "",
    };
    console.log(updateInfo);

    if (!event.target.avatar.files.length) {
      updateInfo.avatarLink = currentUser.avatarLink;
      if (updateInfo.username === "" || updateInfo.newPassword.length < 6) {
        setwarning("visible");
        console.log("here");
      } else {
        console.log("else");
        const res = await api({
          url: "http://localhost:5000/api/user/change-profile",
          method: "POST",
          data: updateInfo,
        });
        if (res.success === 1) {
          console.log(res.data);
          setUser({
            ...user,
            username: res.data.username,
            password: res.data.password,
            avatarLink: res.data.avatarLink,
          });
          history.push("/profile");
        } else {
          console.log(res.message);
        }
      }
    } else {
      const file = event.target.avatar.files[0];
      const storageRef = firebase
        .storage()
        .ref(
          `user-data/${currentUser.username}/avatar/${currentUser.username}.${
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
        function (error) {
          // Handle unsuccessful uploads
        },
        function () {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          task.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
            updateInfo.avatarLink = downloadURL;

            if (
              updateInfo.username === "" ||
              updateInfo.newPassword.length < 6
            ) {
              setwarning("visible");
              console.log("here");
            } else {
              console.log("else");
              const res = await api({
                url: "http://localhost:5000/api/user/change-profile",
                method: "POST",
                data: updateInfo,
              });
              if (res.success === 1) {
                console.log(res.data);
                setUser({
                  ...user,
                  username: res.data.username,
                  password: res.data.password,
                  avatarLink: res.data.avatarLink,
                });
                history.push("/profile");
              } else {
                console.log(res.message);
              }
            }
          });
        }
      );
    }
  };

  return (
    <div className="container" fluid>
      <Row>
        <Col>
          <Sidebar />
        </Col>
        <Col xs={10}>
          <div>
            <Card style={{ width: "30rem" }} className="mx-auto my-5">
              <div className="m-5">
                <Alert className={warning} variant="warning">
                  Opps... Seem like something went wrong...
                </Alert>
                <Form onSubmit={onSubmitForm}>
                  <Form.Group controlId="formBasicText">
                    <Form.Label>Set new username</Form.Label>
                    <Form.Control
                      value={form.username}
                      type="text"
                      placeholder="Username"
                      name="username"
                      onChange={onChangeForm}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Set new password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="newPassword"
                      onChange={onChangeForm}
                    />
                  </Form.Group>
                  {/* <Form.Group>
                    <Form.File
                      id="exampleFormControlFile1"
                      label="Upload new avatar"
                    />
                  </Form.Group> */}
                  <Form.Group>
                    <label for="cover">Project cover</label>
                    <input type="file" name="avatar"></input>
                  </Form.Group>
                  <Button
                    className="none-margin"
                    variant="primary"
                    type="submit"
                    block
                  >
                    Update
                  </Button>
                </Form>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ChangeProfile;
