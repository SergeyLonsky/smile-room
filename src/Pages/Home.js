import { Button, Modal, Form } from 'react-bootstrap'
import '../css/home.css'
import React, { useState } from 'react'
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
                            <div className="item-icon group"></div>
                            <div className="item-body">
                                <h3>Терапевтическая стоматология</h3>
                                {/* <p>Терапевтическая стоматология помогает как можно дольше сохранять зубы здоровыми и красивыми. Эта область стоматологии помогает вовремя диагностировать заболевания зубов, предупредить поражение кариесом.</p> */}
                            </div>
                            <div className="item-footer">
                                <a href="/OurServicesAndPrice" className="link"><span>Подробнее</span></a>
                            </div>
                        </div>
                    </div>
                    <div className="post-item">
                        <div className="item-content">
                            <div className="item-icon tree"></div>
                            <div className="item-body">
                                <h3>Эстетическая реставрация зубов</h3>
                                {/* <p>Реставрация сколов зуба – одно из наших основных направлений работы.
                                Мы исправляем любые дефекты и разрушения, наращиваем зуб специальным материалом, что позволяет вернуть улыбке совершенство.</p> */}
                            </div>
                            <div className="item-footer">
                                <a href="/OurServicesAndPrice" className="link"><span>Подробнее</span></a>
                            </div>
                        </div>
                    </div>
                    <div className="post-item">
                        <div className="item-content">
                            <div className="item-icon anchor"></div>
                            <div className="item-body">
                                <h3>Виниринговое покрытие зубов</h3>
                                {/* <p>Реставрация сколов зуба – одно из наших основных направлений работы.
                                Мы исправляем любые дефекты и разрушения, наращиваем зуб специальным материалом, что позволяет вернуть улыбке совершенство.</p> */}
                            </div>
                            <div className="item-footer">
                                <a href="/OurServicesAndPrice" className="link"><span>Подробнее</span></a>
                            </div>
                        </div>
                    </div>
                    <div className="post-item">
                        <div className="item-content">
                            <div className="item-icon video"></div>
                            <div className="item-body">
                                <h3>Детская стоматология</h3>
                                {/* <p>Наши стоматологи много лет работают с детьми и найдут подход к вашему ребенку.</p> */}
                            </div>
                            <div className="item-footer">
                                <a href="/OurServicesAndPrice" className="link"><span>Подробнее</span></a>
                            </div>
                        </div>
                    </div>
                    <div className="post-item">
                        <div className="item-content">
                            <div className="item-icon photo"></div>
                            <div className="item-body">
                                <h3>Профессионально отбеливание зубов</h3>
                                {/* <p>это отличный способ получить естественную белоснежную улыбку.Что нужно знать о нашем отбеливании</p> */}
                            </div>
                            <div className="item-footer">
                                <a href="/OurServicesAndPrice" className="link"><span>Подробнее</span></a>
                            </div>
                        </div>
                    </div>
                    <div className="post-item">
                        <div className="item-content">
                            <div className="item-icon gift"></div>
                            <div className="item-body">
                                <h3>Лечение зубов под микроскопом</h3>
                                {/* <p>Благодаря такой диагностике можно предупредить развитие кариеса, тем самым сохранить здоровую улыбку.</p> */}
                            </div>
                            <div className="item-footer">
                                <a href="/OurServicesAndPrice" className="link"><span>Подробнее</span></a>
                            </div>
                        </div>
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
                            <div className="item-icon group"></div>
                            <div className="item-body">
                                <h3>Терапевтическая стоматология</h3>
                                {/* <p>Терапевтическая стоматология помогает как можно дольше сохранять зубы здоровыми и красивыми. Эта область стоматологии помогает вовремя диагностировать заболевания зубов, предупредить поражение кариесом.</p> */}
                            </div>
                            <div className="item-footer">
                                <a href="/OurServicesAndPrice" className="link"><span>Подробнее</span></a>
                            </div>
                        </div>
                    </div>
                    <div className="post-item">
                        <div className="item-content">
                            <div className="item-icon tree"></div>
                            <div className="item-body">
                                <h3>Эстетическая реставрация зубов</h3>
                                {/* <p>Реставрация сколов зуба – одно из наших основных направлений работы.
                                Мы исправляем любые дефекты и разрушения, наращиваем зуб специальным материалом, что позволяет вернуть улыбке совершенство.</p> */}
                            </div>
                            <div className="item-footer">
                                <a href="/OurServicesAndPrice" className="link"><span>Подробнее</span></a>
                            </div>
                        </div>
                    </div>
                    <div className="post-item">
                        <div className="item-content">
                            <div className="item-icon anchor"></div>
                            <div className="item-body">
                                <h3>Виниринговое покрытие зубов</h3>
                                {/* <p>Реставрация сколов зуба – одно из наших основных направлений работы.
                                Мы исправляем любые дефекты и разрушения, наращиваем зуб специальным материалом, что позволяет вернуть улыбке совершенство.</p> */}
                            </div>
                            <div className="item-footer">
                                <a href="/OurServicesAndPrice" className="link"><span>Подробнее</span></a>
                            </div>
                        </div>
                    </div>
                    <div className="post-item">
                        <div className="item-content">
                            <div className="item-icon video"></div>
                            <div className="item-body">
                                <h3>Детская стоматология</h3>
                                {/* <p>Наши стоматологи много лет работают с детьми и найдут подход к вашему ребенку.</p> */}
                            </div>
                            <div className="item-footer">
                                <a href="/OurServicesAndPrice" className="link"><span>Подробнее</span></a>
                            </div>
                        </div>
                    </div>
                    <div className="post-item">
                        <div className="item-content">
                            <div className="item-icon photo"></div>
                            <div className="item-body">
                                <h3>Профессионально отбеливание зубов</h3>
                                {/* <p>это отличный способ получить естественную белоснежную улыбку.Что нужно знать о нашем отбеливании</p> */}
                            </div>
                            <div className="item-footer">
                                <a href="/OurServicesAndPrice" className="link"><span>Подробнее</span></a>
                            </div>
                        </div>
                    </div>
                    <div className="post-item">
                        <div className="item-content">
                            <div className="item-icon gift"></div>
                            <div className="item-body">
                                <h3>Лечение зубов под микроскопом</h3>
                                {/* <p>Благодаря такой диагностике можно предупредить развитие кариеса, тем самым сохранить здоровую улыбку.</p> */}
                            </div>
                            <div className="item-footer">
                                <a href="/OurServicesAndPrice" className="link"><span>Подробнее</span></a>
                            </div>
                        </div>
                    </div>
                </div>
                <Category></Category>
            </div>            
        );
    }

}

export default Home;