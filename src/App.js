import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./component/Auth/Signup/Signup";
import Header from "./component/Header/Header";
import Home from "./component/Home/Home";
import Login from "./component/Auth/Login/Login";
import Expense from "./component/Expense/Expense";
import UserProfile from "./component/UserProfile/UserProfile";
import { useSelector } from "react-redux";

function App() {
  const loggedInUser = useSelector((state) => state.auth.idToken);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {!loggedInUser && <Route path="/" element={<Home />}></Route>}
        <Route path="*" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {loggedInUser && <Route path="/expense" element={<Expense />}></Route>}
        {loggedInUser && (
          <Route path="/userProfile" element={<UserProfile />}></Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
