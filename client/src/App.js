import './App.css';
import Homepage from './pages/homepage.js';
import SignIn from './pages/signInPage';
import PermanentDrawerLeft from './pages/sideDrawer';
import {Routes, Route, Link } from 'react-router-dom';
import SignUp from './pages/signUpPage';
import { ProtectedRoute,ProtectedRouteSignIn } from './utils/protectedRoutes';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App" style={{width: '100vw' , height: '100vh'}}>
       <Routes>
          <Route index element={<Homepage/>}></Route>
        
          <Route element={<ProtectedRouteSignIn />}>
              <Route path="SignIn" element={<SignIn/>} />
              <Route path="SignUp" element={<SignUp/>} />
          </Route>
          <Route path="Dashboard"
           element={
             <ProtectedRoute>
                <PermanentDrawerLeft/>
             </ProtectedRoute>
           }
          >
          </Route>
         
       </Routes>
       <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
