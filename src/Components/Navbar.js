import React, { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  const headerRef = React.useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      headerRef.current.classList.toggle("sticky", window.scrollY > 0);
    }
    

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div>
      <header ref={headerRef}>
        <NavLink to='/' className="logo">Food <span>.</span></NavLink>
        <ul className="navigation active">
          <li><NavLink to="/" className="navs">Home</NavLink></li>
          <li><a className="navs" href='#about'>About</a></li>
          <li><NavLink to="/register" className="navs">SignUp</NavLink></li>
          <li><NavLink to="/login" className="navs">SignIn</NavLink></li>
        </ul>
      </header>
    </div>
  )
}

export default Navbar