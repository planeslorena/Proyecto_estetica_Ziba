import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './nav.css'
import { Dropdown, Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/app/context/user.context';
import { getInfoUser } from '@/app/services/User';

export function Menu() {
  const router = useRouter();
  const [isActive, setIsActive] = useState<boolean>(false);
  const { userData, setUserData } = useContext(UserContext);

  //Una vez logueado el usuario determina a donde redirigirlo segun el usuario
  const routerRole = () => {
    if (userData?.role == 'client') {
      router.push('/client');
    } else if (userData?.role == 'admin') {
      router.push('/admin');
    }
  }

  //Funcion para cerrar sesión
  const logOut = () => {
    sessionStorage.removeItem('accessToken');
    setUserData(undefined);
    setIsActive(false);
    router.push('/home');
  }

  //Cuando se recarga la pagina si hay un token activo recarga todos los datos del usuario
  const loadUserActive = async () => {
    try {
      const userData = await getInfoUser();
      setUserData(userData);
      setIsActive(true);
    } catch {
      sessionStorage.removeItem('accessToken');
    }
  }

  //Al cargarse la pagina se fija si hay un token activo
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      loadUserActive();
    }
  }, []);

  return (
    <Navbar key={'md'} expand={'md'} className="mb-3">
      <Container fluid>
        < div>
          <img className='img-logo' src="/imagenes/logoZiba.jpg" alt="logo ziba"
            width="200"
            height="75" onClick={() => { router.push('/home')}} />
        </div>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${'md'}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${'md'}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${'md'}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${'md'}`}>
              ZIBÁ
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="menu justify-content-center  align-items-center flex-grow-1 pe-3">
              <Nav.Link onClick={() => { router.push('/home') }} className='links'>INICIO</Nav.Link>
              <Nav.Link onClick={() => { router.push('/appointment') }} className='links'>SERVICIOS</Nav.Link>
              <Nav.Link onClick={() => { router.push('/home#contactInfo') }} className='links'>CONTACTO</Nav.Link>
            </Nav>
            <Nav className="align-items-center d-flex">
              {isActive ? (
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Hola, {userData?.name}!
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => { routerRole() }}>Perfil</Dropdown.Item>
                    <Dropdown.Item onClick={logOut}>Cerrar sesión</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Nav.Link className='cuenta' onClick={() => router.push('/authPage')}>CUENTA</Nav.Link>
              )
              }
              <i className="bi bi-person-circle"></i>

            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
