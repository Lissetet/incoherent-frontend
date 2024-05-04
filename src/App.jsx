import Header from "./components/Header";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import NewGame from "./pages/NewGame";
import Game from "./pages/Game";
import LastGame from "./pages/LastGame";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Logout from "./pages/Logout";
import PrivateRoute from "./components/PrivateRoute";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/new_game" element={<NewGame />} />
        <Route path="/game" element={<Game />} />
        <Route path="/last_game" element={<LastGame />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/logout" element={<Logout />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

// <Routes>
// <Route path="/" element={<Courses />} />
// <Route path="/courses/:id" element={<CourseDetail />} />
// <Route element={<PrivateRoute />} >
//   <Route path="/courses/:id/update" element={<UpdateCourse />} />
//   <Route path="/courses/create" element={<CreateCourse />} />
// </Route>
// <Route path="/signin" element={<UserSignIn />} />
// <Route path="/Logout" element={<UserLogout />} />
// <Route path="/signup" element={<UserSignUp />} />
// <Route path="/forbidden" element={<Forbidden />} />
// <Route path="/error" element={<UnhandledError />} />
// <Route path="/notfound" element={<NotFound item="course"/>} />
// <Route path="*" element={<NotFound />} />
// </Routes>
