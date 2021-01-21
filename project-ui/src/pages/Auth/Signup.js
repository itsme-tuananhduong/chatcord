import { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import AuthLayout from "../../components/Layout/AuthLayout";
import api from "../../api";
import { AuthContext } from "../../App";

function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
  });
  const authValue = useContext(AuthContext);
  const { user, login } = authValue;
  const [warning, setwarning] = useState({ className: "invisible", msg: "" });

  if (user) return <Redirect to="/" />;

  const onChangeForm = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const { email, password, username } = form;

  const onSubmitForm = async (event) => {
    event.preventDefault();

    if (!form.email || !form.password || !form.username) {
      setwarning({ className: "", msg: "Please fill out all fields" });
    } else {
      const res = await api({
        url: "http://localhost:5000/api/auth/signup",
        method: "POST",
        data: form,
      });
      if (res.success) {
        login(res.data);
      } else {
        console.log(res);
        setwarning({ className: "", msg: `${res.message}` });
      }
    }
  };

  return (
    <AuthLayout>
      <Container fluid>
        <Card style={{ width: "30rem" }} className="mx-auto my-5">
          <div className="m-5">
            <Alert className={warning.className} variant="warning">
              {warning.msg}
            </Alert>
            <h1 className="dark-text m-3">Welcome to Chatcord</h1>
            <Form onSubmit={onSubmitForm}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={email}
                  onChange={onChangeForm}
                  type="email"
                  placeholder="Email"
                  name="email"
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  onChange={onChangeForm}
                  type="password"
                  placeholder="Password"
                  name="password"
                />
              </Form.Group>
              <Form.Group controlId="formBasicText">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  value={username}
                  onChange={onChangeForm}
                  type="text"
                  placeholder="Username"
                  name="username"
                />
              </Form.Group>
              <Button variant="primary" type="submit" block>
                Signup
              </Button>
            </Form>
            <div className="mt-4">
              Already have an account?{" "}
              <Link className="dark-text" to="/login">
                Login
              </Link>
            </div>
          </div>
        </Card>
      </Container>
    </AuthLayout>
  );
}

export default Signup;
