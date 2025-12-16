import Login from "./login/login"
import './App.css'
import SignUp from "./login/signin"
import Admin from "./Admin/Admin"
import SelectedMovie from "./selectedMovie/selectedMovie"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./maincomponents/hompage"
import MovieProvider from "./contextApi/MovieProvider"
import AdminLogin from "./Admin/adminlogin"
import AdminDashboard from "./Admin/AdminMovieManagement"
import Adminbookingmanagement from "./Admin/adminbookingmanagement"
import Admin1 from "./Admin/Admin1"
import UpdateForm from "./Admin/adminUpdateform"


function App() {

  return (
    <>
    <MovieProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/admin" element={<Admin/>}></Route>
        <Route path="selected" element={<SelectedMovie/>}></Route>
        <Route path="/adminlogin" element={<AdminLogin />}></Route>
        <Route path="/admindashboard" element={<AdminDashboard/>}></Route>
        <Route path="/adminbooking" element={<Adminbookingmanagement/>}></Route>
        <Route path="/ticketForm" element={<Admin1/>}></Route>
        <Route path='/adminUpdateForm' element={<UpdateForm/>}></Route>
      </Routes>
    </Router>
    </MovieProvider>
    </>
  )
}

export default App
