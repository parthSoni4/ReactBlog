import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom'
import SignUp from './Components/SignUp';
import Login from "./Components/Login";
import UserProfile from './Components/UserProfile';
import CreateBlog from './Components/CreateBlog';

function App() {
  return (
    <>
    <BrowserRouter>
        {/* browserRouter is the core element for the react router  */}
      <Navbar/>
      <Routes>
        {/* container for defining routes  */}
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login></Login>}/>
        <Route path="/UserProfile" element={<UserProfile></UserProfile>}/>
        <Route path='/CreateBlog' element={<CreateBlog></CreateBlog>}/>
        {/* specific route within the application  */}
      </Routes>
    </BrowserRouter>

      
    </>
  );
}

export default App;
