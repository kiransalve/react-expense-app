import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./component/Auth/Signup/Signup";
import Header from "./component/Header/Header";
import Home from "./component/Home/Home";
import Login from "./component/Auth/Login/Login";
import Expense from "./component/Expense/Expense";
import UserProfile from "./component/UserProfile/UserProfile";
import { Provider, useSelector } from "react-redux";
import store from "./store/store";

function App() {
  const loggedInUser = localStorage.getItem("idToken");

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="*" element={<Home />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          {loggedInUser && (
            <Route path="/expense" element={<Expense />}></Route>
          )}
          {loggedInUser && (
            <Route path="/userProfile" element={<UserProfile />}></Route>
          )}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
