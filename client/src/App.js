import './App.css';
import Layout from './Layout';
import {Routes, Route} from "react-router-dom";
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { UserContextProvider } from './UserContext';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}> {/* this was done to dynamically add content based on the page we are in */}   
          <Route index element = {<IndexPage />} />
          <Route path={'/login'} element = {<LoginPage />} />  {/* // Header.js receives the path '/login' & routes it to pages/LoginPage.js */}
          <Route path={'/register'} element = {<RegisterPage />} /> {/* // Header.js receives the path '/register' & routes it to pages/RegisterPage.js */}
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
