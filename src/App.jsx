import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './Components/Nav';
import Marcas from './Views/Marcas/Index';
import CreateMarcas from './Views/Marcas/Create';
import EditMarcas from './Views/Marcas/Edit';
import Celulares from './Views/Celulares/Index';
import Graphic from './Views/Celulares/Graphic';
import Login from './Views/Login';
import Register from './Views/Register';
import ProtectedRoutes from './Components/ProtectedRoutes';

function App() {
 

  return (
    <BrowserRouter>
    <Nav />
    <Routes >
      <Route  path="/login" element={<Login />} />
      <Route  path="/register" element={<Register />} />
      <Route element={<ProtectedRoutes />}>
      <Route  path="/" element={<Marcas />} />
      <Route  path="/create" element={<CreateMarcas />} />
      <Route path="/edit/:id" element={<EditMarcas />} />
      <Route  path="/celulares" element={<Celulares />} />
      <Route  path="/graphic" element={<Graphic />} />
      </Route>
      
    </Routes>
    </BrowserRouter>
  )
}

export default App
