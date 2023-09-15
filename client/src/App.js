import './App.css';
import Header from './Header';
import Post from './Post';
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route index element={
        <main>
        <Header></Header>
        <Post></Post>
        <Post></Post>
        <Post></Post>
        </main>  
      }    
      ></Route>
      <Route path={'/login'} element ={
        <div>login</div>
      }> </Route>
    </Routes>

  );
}

export default App;
