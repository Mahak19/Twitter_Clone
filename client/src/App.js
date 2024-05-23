import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Sidebar from './component/Sidebar';
import Profile from './pages/Profile';
import UserProfile from './pages/UserProfile';
import { ToastContainer } from 'react-bootstrap';

function App() {
  // const { isAuthenticated } = useSelector((state) => state.user);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(loadUser());
  // }, [dispatch]);

  return (
    <div>
      {/* {isAuthenticated ? (<></>):(<></>)} */}
      {/* <UserProfile /> */}
      {/* <Sidebar /> */}
      {/* <LeftSidebar /> */}
      {/* <Profile /> */}
      <Router>
        <ToastContainer />
        <Routes>
          <Route exact path='/home' element={<Sidebar />}></Route>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/' element={<Register />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
