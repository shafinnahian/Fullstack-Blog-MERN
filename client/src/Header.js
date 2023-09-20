import { response } from "express";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header(){
  const [username, setUsername] = useState(null);
  useEffect(() => {
    fetch('http://localhost:3000/profile', {
      credentials: 'include',  // passing all the cookies after logging in
    }).then(response => {
      response.json().then(userInfo => {
        setUsername(userInfo.username);
      })
    })
  }, [])
    return (
        <header>
        <Link to="/" className="logo">MyBlog</Link>
        <nav>
          {username && (
            <>
              <Link to="/create">Create new post</Link>
              <a>Logout</a>
            </>
          )}
          {!username && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )
          }
        </nav>
      </header>
    );
}