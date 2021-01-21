import { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import api from "../../api";
import AuthLayout from "../../components/Layout/AuthLayout";
import { AuthContext } from "../../App";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
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

  const onSubmitForm = async (event) => {
    event.preventDefault();

    if (form.email === "" || form.password === "") {
      setwarning({ className: "", msg: "Please fill out all fields" });
    } else {
      const res = await api({
        url: "http://localhost:5000/api/auth/login",
        method: "POST",
        data: form,
      });
      if (res.success) {
        sessionStorage.setItem("isLogin", 1);
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
            <h1 className="dark-text m-3">Welcome back...</h1>
            <Form onSubmit={onSubmitForm}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={form.email}
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={onChangeForm}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={form.password}
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={onChangeForm}
                />
              </Form.Group>
              <Button variant="primary" type="submit" block>
                Login
              </Button>
            </Form>
            <div className="mt-4">
              Don't have an account?{" "}
              <Link className="dark-text" to="/signup">
                Signup
              </Link>
            </div>
          </div>
        </Card>
      </Container>
    </AuthLayout>
  );
}

export default Login;
