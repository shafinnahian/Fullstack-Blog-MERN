import Header from "./Header";
import {Outlet} from "react-router-dom";

export default function Layout(){
    return(
        <main>
            <Header />
            <Outlet />       
                        {/* it serves as a placeholder for rendering the child routes associated with that parent route. */}
                        {/* in this case, we will dynamically render content based on which page we are */}
        </main>
    )
}