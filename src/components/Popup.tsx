import { useState } from "react";
import { Modal } from "react-bootstrap";
import { FieldValues, useForm } from "react-hook-form";
import * as http from "../HttpCalls";

interface Props {
  loadUser: (id: number) => void;
}

function Popup({ loadUser }: Props) {
  const login = useForm();
  const signup = useForm();

  const [incorrect, setIncorrect] = useState(false);
  const [already_exists, setExists] = useState(false);
  const [created, setCreated] = useState(false);
  const [show, setShow] = useState(() => {
    if (localStorage.getItem("user_id")) {
      return parseInt(localStorage.getItem("user_id")!) <= 0;
    } else return true;
  });
  const [signIn, setSignIn] = useState(true);

  const handleClose = () => setShow(false);

  const onLogin = async (data: FieldValues) => {
    const user_id = await http
      .checkUserExists({
        id: 1,
        username: data.username,
        password: data.password,
      })
      .catch((error) => {
        setIncorrect(true);
        console.log(error);
      });
    if (user_id) {
      localStorage.setItem("user_id", user_id.toString());
      setShow(false);
      loadUser(user_id);
    }
  };

  const onRegister = async (data: FieldValues) => {
    const user = await http
      .createUser({
        id: 1,
        username: data.username2,
        password: data.password2,
      })
      .catch((error) => {
        setExists(true);
        console.log(error);
      });
    if (user) {
      localStorage.setItem("user_id", user.id.toString());
      setCreated(true);
      setTimeout(() => {
        setShow(false);
        loadUser(user.id);
      }, 1000);
    }
  };

  return (
    <>
      <Modal
        centered
        show={signIn && show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={login.handleSubmit(onLogin)}>
            <input
              {...login.register("username")}
              className="form-control mb-2"
              id="username"
              type="text"
              placeholder="Username"
            />
            <input
              {...login.register("password")}
              className="form-control mb-2"
              id="password"
              type="password"
              placeholder="Password"
            />
            {incorrect && <p>Incorrect username or password!</p>}
            <button
              type="submit"
              className="btn btn-primary mb-3"
              style={{
                backgroundColor: "RGB(167, 130, 200)",
                border: "transparent",
              }}
            >
              Login
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <a
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              color: "purple",
            }}
            onClick={() => setSignIn(false)}
          >
            Or register an account
          </a>
        </Modal.Footer>
      </Modal>

      <Modal
        centered
        show={!signIn && show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={signup.handleSubmit(onRegister)}>
            <input
              {...signup.register("username2")}
              className="form-control mb-2"
              id="username2"
              type="text"
              placeholder="Username"
            />
            <input
              {...signup.register("password2")}
              className="form-control mb-2"
              id="password2"
              type="password"
              placeholder="Password"
            />
            {already_exists && <p>Username already exists!</p>}
            {created && <p>Account created!</p>}
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                backgroundColor: "RGB(167, 130, 200)",
                border: "transparent",
              }}
            >
              Register
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <a
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              color: "purple",
            }}
            onClick={() => setSignIn(true)}
          >
            Or sign in to your account
          </a>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Popup;
