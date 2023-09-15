import { Link } from "react-router-dom";

export default function Header(){
    return (
        <header>
        <a className="logo">MyBlog</a>
        <nav>
          <Link href="/login">Login</Link>
          <Link href="">Register</Link>
        </nav>
      </header>
    );
}