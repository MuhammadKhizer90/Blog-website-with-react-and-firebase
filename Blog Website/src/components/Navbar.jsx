
// import Logo from '../assets/dotblog.webp'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.config/firebase';
import { useNavigate } from 'react-router-dom';

function Navbarr({ isAuth, setIsAuth }) {
 let navigate=useNavigate();
  const UsersignOut=()=>{
    signOut(auth).then(()=>{
      localStorage.clear();
      setIsAuth(false)
      navigate('/login')
    })
  }
  return (
    <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary static-top">
      <Container>
        <Navbar.Brand href="/">.blog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            
            {!isAuth ? (
  <Nav.Link href="/login">Login</Nav.Link>
) : (
  <>
    <Nav.Link href="/post">Post</Nav.Link>
    <Nav.Link onClick={UsersignOut}>Logout</Nav.Link>
  </>
)}

            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbarr;