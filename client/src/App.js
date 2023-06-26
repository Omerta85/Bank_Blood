import {Routes, Route} from "react-router-dom";
import {HomePage, Login, Register } from "./pages/index";

function App() {
  return (
    <div >
      <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
      </Routes>
    </div>
  );
}

export default App;
