import 'bootstrap/dist/css/bootstrap.css'
import { Nav, Navbar, Container, Button, Modal } from 'react-bootstrap'
import React, { useState } from 'react'
import '../css/menu.css'
import "../css/login.css"
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'
import Sign_in from '../components/SignI_in'


//here component menu we use in App Because we need show in all pages
function Menu() {

    let storedTheme = localStorage.getItem("theme");

    let userData = JSON.parse(sessionStorage.getItem("user"));

    const history = useHistory()

    // pop up sign in
    const [showModelSignIn, setShowModelSignIn] = useState(false);
    const handleCloseModelSignIn = () => setShowModelSignIn(false);
    const handleShowModelSignIn = () => setShowModelSignIn(true);



    //check if we have data user and if yes we send to profile page
    const sendUserToProfile = () => {

        if (userData != null) {
            history.push(`/Profile/${userData._id}`);
            window.location.reload(false);
        }
    }




    // log out user from data seesion storge
    const outUser = async () => {

        if (storedTheme === "dark") {

            Swal.fire({
                title: 'Вы уверены, что хотите выйти??',
                icon: 'question',
                toast: true,
                position: 'top-end',
                showDenyButton: true,
                confirmButtonText: 'yes',
                denyButtonText: `no`,
            }).then((result) => {

                if (result.isConfirmed) {

                    sessionStorage.clear('user');
                    history.push("/");
                    window.location.reload(false);
                }

                else if (result.isDenied) {
                    window.location.reload(false);
                }
            })
        }

        if (storedTheme === "light") {

            Swal.fire({
                title: 'Вы уверены, что хотите выйти??',
                icon: 'question',
                showDenyButton: true,
                toast: true,
                position: 'top-end',
                confirmButtonText: 'yes',
                denyButtonText: `no`,
                background: '#373E44',
                color: '#ffffffab',
                buttonColor: '#E96E00'
            }).then((result) => {

                if (result.isConfirmed) {

                    sessionStorage.clear('user');
                    history.push("/");
                    window.location.reload(false);
                }

                else if (result.isDenied) {
                    window.location.reload(false);
                }
            })
        }
    }



    // hide a model sign in , send this function to Sign_In component
    const hideModelSignIn = () => {

        setShowModelSignIn(false);
    }


    if (storedTheme === "light" && userData != null) {

        return (
            <div>
                <div className='menuDark'>
                    <Navbar collapseOnSelect expand="lg">
                        <Container>
                            <a href='/'><Navbar.Brand ><img src={require("../images/z1z.png")} alt="icon"></img></Navbar.Brand></a>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ background: "rgba(255, 255, 255, 0.279)" }} />
                            <Navbar.Collapse id="responsive-navbar-nav">

                                <Nav className="me-auto">
                                    <Nav.Link style={{ color: "white" }} href="/">Начало</Nav.Link>
                                    <Nav.Link style={{ color: "white" }} href="/About">О нас</Nav.Link>
                                    <Nav.Link style={{ color: "white" }} href="/OurWork">Наша специализация</Nav.Link>
                                    <Nav.Link style={{ color: "white" }} href="/OurServicesAndPrice">Наши услуги</Nav.Link>
                                    <Nav.Link style={{ color: "white" }} href="/Service">Отзывы</Nav.Link>
                                    <Nav.Link style={{ color: "white" }} href="/Location">Контакты</Nav.Link>
                                </Nav>

                                <Navbar.Collapse className="justify-content-end link">

                                    <div className='imgPrf'>
                                        <Button variant="outline-light"
                                            onClick={sendUserToProfile}>
                                            Привет, {userData.FirstName} (Профиль)
                                        </Button>{' '}
                                        <br />
                                        <Button variant="outline-danger"
                                            onClick={outUser}>
                                            Выйти
                                        </Button>{' '}
                                    </div>

                                </Navbar.Collapse>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </div>
        );
    }



    if (storedTheme === "light" && userData == null) {

        return (
            <div>
                <div className='menuDark'>
                    <Navbar collapseOnSelect expand="lg">
                        <Container>
                            <a href='/'><Navbar.Brand ><img src={require("../images/z1z.png")} alt="icon"></img></Navbar.Brand></a>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ background: "rgba(255, 255, 255, 0.279)" }} />
                            <Navbar.Collapse id="responsive-navbar-nav">

                                <Nav className="me-auto">
                                    <Nav.Link style={{ color: "white" }} href="/">Начало</Nav.Link>
                                    <Nav.Link style={{ color: "white" }} href="/About">О нас</Nav.Link>
                                    <Nav.Link style={{ color: "white" }} href="/OurWork">Наша специализация</Nav.Link>
                                    <Nav.Link style={{ color: "white" }} href="/OurServicesAndPrice">Наши услуги</Nav.Link>
                                    <Nav.Link style={{ color: "white" }} href="/Service">Отзывы</Nav.Link>
                                    <Nav.Link style={{ color: "white" }} href="/Location">Контакты</Nav.Link>
                                </Nav>

                                <Navbar.Collapse className="justify-content-end link">

                                    <Nav.Link onClick={handleShowModelSignIn} href="#">Войти</Nav.Link>
                                    <Nav.Link href='/Register'>Регистрация</Nav.Link>

                                </Navbar.Collapse>

                                <Modal show={showModelSignIn} onSubmit={handleCloseModelSignIn} >
                                    <Sign_in hideSignIn={hideModelSignIn} />
                                </Modal>

                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </div>
        );
    }



    if (storedTheme === "dark" && userData != null) {

        return (
            <div>
                <div className='menu'>
                    <Navbar collapseOnSelect expand="lg">
                        <Container>
                            <a href='/'><Navbar.Brand ><img src={require("../images/z1z.png")} alt="icon"></img></Navbar.Brand></a>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">

                                <Nav className="me-auto">
                                    <Nav.Link style={{ color: "#00000094", fontWeight: "600" }} href="/">Начало</Nav.Link>
                                    <Nav.Link style={{ color: "#00000094", fontWeight: "600" }} href="/About">О нас</Nav.Link>
                                    <Nav.Link style={{ color: "#00000094", fontWeight: "600" }} href="/OurWork">Наша специализация</Nav.Link>
                                    <Nav.Link style={{ color: "#00000094", fontWeight: "600" }} href="/OurServicesAndPrice">Наши услуги</Nav.Link>
                                    <Nav.Link style={{ color: "#00000094", fontWeight: "600" }} href="/Service">Отзывы</Nav.Link>
                                    <Nav.Link style={{ color: "#00000094", fontWeight: "600" }} href="/Location">Контакты</Nav.Link>

                                </Nav>

                                <Navbar.Collapse className="justify-content-end link">

                                    <div className='imgPrf'>
                                        <Button variant="outline-secondary"
                                            onClick={sendUserToProfile}>
                                            Привет, {userData.FirstName} (Профиль)
                                        </Button>{' '}
                                        <br />


                                        <Button variant="outline-danger"
                                            onClick={outUser}>
                                            Выйти
                                        </Button>{'  '}
                                    </div>

                                </Navbar.Collapse>

                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </div>
        );
    }



    if (storedTheme === "dark" && userData == null) {

        return (
            <div>
                <div className='menu'>
                    <Navbar collapseOnSelect expand="sm" >
                        <Container>
                            <a href='/'><Navbar.Brand ><img src={require("../images/z1z.png")} alt="icon"></img></Navbar.Brand></a>

                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">

                                <Nav className="me-auto">
                                    <Nav.Link style={{ color: "#00000094", fontWeight: "600" }} href="/">Начало</Nav.Link>
                                    <Nav.Link style={{ color: "#00000094", fontWeight: "600" }} href="/About">О нас</Nav.Link>
                                    <Nav.Link style={{ color: "#00000094", fontWeight: "600" }} href="/OurWork">Наша специализация</Nav.Link>
                                    <Nav.Link style={{ color: "#00000094", fontWeight: "600" }} href="/OurServicesAndPrice">Наши услуги</Nav.Link>
                                    <Nav.Link style={{ color: "#00000094", fontWeight: "600" }} href="/Service">Отзывы</Nav.Link>
                                    <Nav.Link style={{ color: "#00000094", fontWeight: "600" }} href="/Location">Контакты</Nav.Link>

                                </Nav>

                                <Navbar.Collapse className="justify-content-end link">
                                    <Nav.Link onClick={handleShowModelSignIn} href="#">Войти</Nav.Link>
                                    <Nav.Link href='/Register'>Регистрация</Nav.Link>
                                </Navbar.Collapse>

                                <Modal show={showModelSignIn} onSubmit={handleCloseModelSignIn} >
                                    <Sign_in hideSignIn={hideModelSignIn} />
                                </Modal>

                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </div>
        );
    }

}


export default Menu;