import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { auth, provider } from '../firebase.config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/dotblog.webp';
import { FcGoogle } from 'react-icons/fc';

function Login({ setIsAuth }) {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate('/');
    });
  }

  return (
    <>
    <div className="container-fluid mt-5" style={{ minHeight: '80vh' }}>
      <Container fluid className="h-100">
        <Row className="h-100 d-flex align-items-center justify-content-center">
          <Col sm={12} md={6}>
            <Card>
              <Card.Body className='text-center'>
                <img src={Logo} alt="Logo" className="img-fluid" />
                <p>This is a Google authentication to login</p>
                <Button
                  variant="primary"
                  onClick={signInWithGoogle}
                  className="bg-white text-dark"
                >
                  <FcGoogle /> Login in with Google
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  </>
  )
}

export default Login;
