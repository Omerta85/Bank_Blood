import {Routes, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {HomePage, Login, Register } from "./pages/index";



function App() {
  return (
    <>
        <ToastContainer />
      <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
      </Routes>
    </>
  );
}

export default App;
