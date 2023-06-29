import {Routes, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {HomePage, Login, Register } from "./pages/index";
import {ProtectedRoute} from "./components/Routes/ProtectedRoute";
import {PublicRoute} from "./components/Routes/PublicRoute";



function App() {
  return (
    <>
        <ToastContainer />
      <Routes>
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
