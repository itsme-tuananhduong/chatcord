import { Switch, Route, Redirect } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import { Image } from "react-bootstrap";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/Signup";
import RandomChat from "./pages/RandomChat/RandomChat";
import ChatBox from "./pages/ChatBox/ChatBox";
import Search from "./pages/Search/Search";
import Explore from "./pages/Explore/Explore";
import Connect from "./pages/Connect/Connect";
import Profile from "./pages/Profile/Profile";
import ChangeProfile from "./pages/ChangeProfile/ChangeProfile";
import NotFound from "./pages/NotFound/404";
import api from "./api";
import "./App.css";

export const AuthContext = createContext();

function App() {
  console.log("app");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [randomChatRoom, setRandomChatRoom] = useState({
    roomId: "",
    status: "",
  });
  console.log(randomChatRoom);

  const verifyAuth = async () => {
    setLoading(true);
    try {
      const res = await api({
        url: "http://localhost:5000/api/auth/verify",
        method: "GET",
      });
      if (res.success) {
        setUser(res.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verifyAuth();
    }
    setFirstRender(false);
  }, []);

  const login = ({ user, token }) => {
    localStorage.setItem("token", token);
    sessionStorage.setItem("username", user.username);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  if (loading || firstRender) return <div>Loading...</div>;

  const authValue = {
    user,
    setUser,
    login,
    logout,
    randomChatRoom,
    setRandomChatRoom,
  };

  return (
    <AuthContext.Provider value={authValue}>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/signup" exact>
            <SignUp />
          </Route>
          <Route path="/random-chat" exact>
            <RandomChat />
          </Route>
          <Route path="/chat-room" exact>
            <ChatBox />
          </Route>
          <Route path="/search" exact>
            <Search />
          </Route>
          <Route path="/explore" exact>
            <Explore />
          </Route>
          <Route path="/connect" exact>
            <Connect />
          </Route>
          <Route path="/profile" exact>
            <Profile />
          </Route>
          <Route path="/change-profile" exact>
            <ChangeProfile />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
