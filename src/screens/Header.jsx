import { Link } from "react-router-dom";


function Header() {

    return (<div id="header">
        <nav className="navbar">
            <div className="navbar-brand">
                <img src={require('./logo-removebg.jpg')} alt="logo" className="logo" height={100}/>
            </div>

            <div className="nav-links">
        
        <Link to='/homePage' className="nav_button">Home</Link>
        <Link to='/About' className="nav_button">About</Link>
        <Link to='/service' className="nav_button">Service</Link>
        <Link to='/'  className="nav_button">Login</Link>
        <Link to='/contact'  className="nav_button">Contact</Link>

       

        </div>
        </nav>
    </div>)


}

export default Header;