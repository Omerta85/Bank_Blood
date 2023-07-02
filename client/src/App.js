import {Routes, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {HomePage, Login, Register } from "./pages/index";
import {ProtectedRoute} from "./components/Routes/ProtectedRoute";
import {PublicRoute} from "./components/Routes/PublicRoute";
import {Donor} from "./pages/Dashboard/Donor";
import {Hospital} from "./pages/Dashboard/Hospital";
import {OrganizationPage} from "./pages/Dashboard/OrganizationPage";



function App() {
  return (
    <>
        <ToastContainer />
      <Routes>
          <Route path='/organization' element={
              <ProtectedRoute>
                  <OrganizationPage/>
              </ProtectedRoute>
          }/>
          <Route path='/hospital' element={
              <ProtectedRoute>
                  <Hospital/>
              </ProtectedRoute>
          }/>
          <Route path='/donor' element={
              <ProtectedRoute>
                  <Donor />
              </ProtectedRoute>
          }/>
          <Route path='/' element={
              <ProtectedRoute>
                  <HomePage />
              </ProtectedRoute>
          }/>
          <Route path='/login' element={
              <PublicRoute>
                  <Login />
              </PublicRoute>
          }/>
          <Route path='/register' element={
              <PublicRoute>
                  <Register />
              </PublicRoute>
          }/>
      </Routes>
    </>
  );
}

export default App;
