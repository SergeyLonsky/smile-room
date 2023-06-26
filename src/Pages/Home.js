import { Button, Modal, Form } from 'react-bootstrap'
import { MDBFooter, MDBIcon } from 'mdb-react-ui-kit';
import data1 from '../Json_date/date.json'
import { LoadAllDoctors } from '../Api/LoadDataFromApi'
import '../css/home.css'
import React, { useState, useEffect } from 'react'
import videoBg from '../images/FilmForth Untitled.mp4'
import Category from '../components/category'
import Appointment from '../components/Appointment'
import Swal from 'sweetalert2'



// Home page
function Home() {

//console.log("Home");
    let storedTheme = localStorage.getItem("theme");

    // show popup add , Appointment
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [Doctors, SetDoctors] = useState([]);
    const [ExpDoctors, SetExpDoctors] = useState([]);

    let userData = JSON.parse(sessionStorage.getItem("user"));

    //here we check if user connect to side , if yes he can click to button book an appointment , else show pop he need login or reg
    const CheckUserConnected = () => {

        if (userData == null && storedTheme === "dark") {

            Swal.fire({
                icon: 'warning',
                title: 'Login/Register',
                html: 'Вам необходимо войти или зарегистрироваться, и вы сможете записаться на прием',
                toast: true,
                position: 'top-end'
            })

            return;
        }

        if (userData == null && storedTheme === "light") {

            Swal.fire({
                icon: 'warning',
                title: 'Login/Register',
                html: 'Вам необходимо войти или зарегистрироваться, и вы сможете записаться на прием',
                toast: true,
                position: 'top-end',
                background: '#373E44',
                color: '#ffffffab',
                buttonColor: '#E96E00'
            })

            return;
        }

        if (userData != null) {
            // show popup,Appointment
            handleShow();
        }
    }

   
    useEffect(() => {
        
        Swal.fire({
            background: 'none',
            showConfirmButton: false,
            timer: 2100,
            html: '<img src="https://i.postimg.cc/pLT9cd9Z/12.png" height="200"></img>'
        })
    }, [])


    if (storedTheme === "light") {

        return (
            <div>
                <div className='main1'>
                    <video src={videoBg} loop autoPlay muted playsInline />
                    <div className="content">
                        <h1>Добро пожаловать</h1>
                        <p>в клинику SmileRoom</p>
                    </div>                    
                </div>
                <div className='Click_appointment'>

                    <div className='d-grid gap-2 click'>
                        <Button variant="warning" size="sm" onClick={CheckUserConnected}>
                        Записаться на прием
                        </Button>
                    </div>

                    <div className='bookClick'>
                        <Modal show={show} onHide={handleClose} style={{ background: "rgba(0, 0, 0, 0.8)" }}>

                            <p className="closes" onClick={handleClose} aria-label="Close">
                                &times;
                            </p>

                            <Modal.Header className='titleHeater'>
                                <Modal.Title><h1>Выберите день :</h1></Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <Form>
                                    <Appointment />
                                </Form>
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
                <div className="titluslug1">
                    <div className="titluslug">
                        <p>Наши услуги </p>
                    </div>
                </div>
                <div className="post-wrap">
                    <div className="post-item">
                        <div className="item-content">
                            {/* <div className="item-icon group"> */}
                            <img src={require("../images/icons8-tooth-broken-from-root-canal-cavity-after-a-old-age-24.png")} alt="icon" />
                            {/* </div> */}
                            <div className="item-body">
                                <h3>Терапевтическая стоматология</h3>
                            </div>
                            <div className="item-footer">
                                <a href="/OurServicesAndPrice" className="link"><span>Подробнее</span></a>
                            </div>
                        </div>
                    </div>
                    <div className="post-item">
                        <div className="item-content">
                            {/* <div className="item-icon tree"></div> */}
                            <img src={require("../images/icons8-зубная-коронка-24.png")} alt="icon" />                            
                            <div className="item-body">
                                <h3>Эстетическая реставрация зубов</h3>
                            </div>
                            <div className="item-footer">
                                <a href="/OurServicesAndPrice" className="link"><span>Подробнее</span></a>
                            </div>
                        </div>
                    </div>
                    <div className="post-item">
                        <div className="item-content">
                            {/* <div className="item-icon anchor"></div> */}
                            <img src={require("../images/icons8-брекеты-24.png")} alt="icon" />
                            <div className="item-body">
                                <h3>Виниринговое покрытие зубов</h3>
                            </div>
                            <div className="item-footer">
                                <a href="/OurServicesAndPrice" className="link"><span>Подробнее</span></a>
                            </div>
                        </div>
                    </div>
                    <div className="post-item">
                        <div className="item-content">
                            {/* <div className="item-icon video"></div> */}
                            <img src={require("../images/icons8-painkiller-capsule-to-overcome-the-toothache-layout-24.png")} alt="icon" />                            
                            <div className="item-body">
                                <h3>Детская стоматология</h3>
                            </div>
                            <div className="item-footer">
                                <a href="/OurServicesAndPrice" className="link"><span>Подробнее</span></a>
                            </div>
                        </div>
                    </div>
                    <div className="post-item">
                        <div className="item-content">
                            {/* <div className="item-icon photo"></div> */}
                            <img src={require("../images/icons8-зубная-паста-24.png")} alt="icon" />
                            <div className="item-body">
                                <h3>Профессионально отбеливание зубов</h3>
                            </div>
                            <div className="item-footer">
                                <a href="/OurServicesAndPrice" className="link"><span>Подробнее</span></a>
                            </div>
                        </div>
                    </div>
                    <div className="post-item">
                        <div className="item-content">
                            {/* <div className="item-icon gift"></div> */}
                            <img src={require("../images/icons8-search-for-the-dentist-in-your-local-24.png")} alt="icon" />
                            <div className="item-body">
                                <h3>Лечение зубов под микроскопом</h3>
                            </div>
                            <div className="item-footer">
                                <a href="/OurServicesAndPrice" className="link"><span>Подробнее</span></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="titluslug1">
                    <div className="titluslug">
                        <p>Наши врачи </p>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                    {data1.doctors_exp.filter(d => d.Active == "1").map(doctor =>
                            <div className="col-md-4 col-sm-6" key={doctor.User_code}>
                                <div className="box">
                                    <div className="pic">
                                        <img src={doctor.path} alt=""/>
                                    </div>
                                    <div className="over-layer">
                                        <h4 className="post">
                                            <a href="#">{doctor.Name}</a>
                                            <small>Стаж работы: {doctor.experience}</small>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <Category></Category>
            </div>
        );
    }



    if (storedTheme === "dark") {


        return (
            <div>

                <div className='main1'>
                    <video src={videoBg} loop autoPlay muted playsInline />
                    <div className="content">
                        <h1>Добро пожаловать</h1>
                        <p>в клинику SmileRoom</p>
                    </div>
                </div>

                <div className='Click_appointment'>

                    <div className="d-grid gap-2 click">
                        <Button variant="success" size="sm" onClick={CheckUserConnected}>
                        Записаться на прием
                        </Button>
                    </div>

                    {/* show model popup Appointment */}
                    <div className='bookClick'>
                        <Modal show={show} onHide={handleClose} style={{ background: "rgba(0, 0, 0, 0.8)" }}>

                            <p className="closes" onClick={handleClose} aria-label="Close">
                                &times;
                            </p>

                            <Modal.Header className='titleHeater'>
                                <Modal.Title><h1>Выберите день :</h1></Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Appointment />
                                </Form>
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
                <div className="titluslug1">
                    <div className="titluslug">
                        <p>Наши услуги </p>
                    </div>
                </div>
                <div className="post-wrap">
                    <div className="post-item">
                        <div className="item-content">
                            {/* <div className="item-icon group"> */}
                                <img src={require("../images/icons8-tooth-broken-from-root-canal-cavity-after-a-old-age-24.png")} alt="icon" />
                                {/* </div> */}
                            <div className="item-body">
                                <h3>Терапевтическая стоматология</h3>
                            </div>
                            <div className="item-footer">
                                <a href="/OurServicesAndPrice" className="link"><span>Подробнее</span></a>
                            </div>
                        </div>
                    </div>
                    <div className="post-item">
                        <div className="item-content">
                            {/* <div className="item-icon tree"></div> */}
                            <img src={require("../images/icons8-зубная-коронка-24.png")} alt="icon" />                            
                            <div className="item-body">
                                <h3>Эстетическая реставрация зубов</h3>
                            </div>
                            <div className="item-footer">
                                <a href="/OurServicesAndPrice" className="link"><span>Подробнее</span></a>
                            </div>
                        </div>
                    </div>
                    <div className="post-item">
                        <div className="item-content">
                            {/* <div className="item-icon anchor"></div> */}
                            <img src={require("../images/icons8-брекеты-24.png")} alt="icon" />
                            <div className="item-body">
                                <h3>Виниринговое покрытие зубов</h3>
                            </div>
                            <div className="item-footer">
                                <a href="/OurServicesAndPrice" className="link"><span>Подробнее</span></a>
                            </div>
                        </div>
                    </div>
                    <div className="post-item">
                        <div className="item-content">
                            {/* <div className="item-icon video"></div> */}
                            <img src={require("../images/icons8-painkiller-capsule-to-overcome-the-toothache-layout-24.png")} alt="icon" />
                            <div className="item-body">
                                <h3>Детская стоматология</h3>
                            </div>
                            <div className="item-footer">
                                <a href="/OurServicesAndPrice" className="link"><span>Подробнее</span></a>
                            </div>
                        </div>
                    </div>
                    <div className="post-item">
                        <div className="item-content">
                            {/* <div className="item-icon photo"></div> */}
                            <img src={require("../images/icons8-зубная-паста-24.png")} alt="icon" />
                            <div className="item-body">
                                <h3>Профессионально отбеливание зубов</h3>
                            </div>
                            <div className="item-footer">
                                <a href="/OurServicesAndPrice" className="link"><span>Подробнее</span></a>
                            </div>
                        </div>
                    </div>
                    <div className="post-item">
                        <div className="item-content">
                            {/* <div className="item-icon gift"></div> */}
                            <img src={require("../images/icons8-search-for-the-dentist-in-your-local-24.png")} alt="icon" />
                            <div className="item-body">
                                <h3>Лечение зубов под микроскопом</h3>
                            </div>
                            <div className="item-footer">
                                <a href="/OurServicesAndPrice" className="link"><span>Подробнее</span></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="titluslug1">
                    <div className="titluslug">
                        <p>Наши врачи </p>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        {data1.doctors_exp.filter(d => d.Active == "1").map(doctor =>
                            <div className="col-md-4 col-sm-6" key={doctor.User_code}>
                                <div className="box">
                                    <div className="pic">
                                        <img src={doctor.path} alt=""/>
                                    </div>
                                    <div className="over-layer">
                                        <h4 className="post">
                                            <a href="#">{doctor.Name}</a>
                                            <small>Стаж работы: {doctor.experience}</small>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <Category></Category>
            </div>            
        );
    }

}

export default Home;