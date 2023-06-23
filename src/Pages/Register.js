import React, { useState } from 'react'
import moment from 'moment'
import { Button, Form, Col, Row } from 'react-bootstrap';
import '../css/register.css'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom';
import { AddNewUserRegester } from '../Api/ConnectOrAddFromApi'



// here Register Page
function Register() {

//    console.log("Register Page");
    const history = useHistory()

    // input date Birthday , and show defult date when input your date
    let d = new Date();
    let DatePublished = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    const [Birthday, setBirthday] = useState(DatePublished);

    // input value when register
    const [User_Login, setLogin] = useState('');
    const [FirstName, setFirstName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');


    let storedTheme = localStorage.getItem("theme");


    //check all input if all good 
    const [validated, setValidated] = useState(false);

    const onChangeBirthday = ({ target }) => {
        if(target.value != '')
        {            
            let bithday = moment(target.value).format('DD.MM.YYYY');
            setBirthday(bithday);            
        }
    };


    const handleSubmit = (event) => {

        const form = event.currentTarget;

        if (form.checkValidity() === false || Password != ConfirmPassword || Password.length < 6 && ConfirmPassword.length <= 6) {

            event.preventDefault();
            event.stopPropagation();

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                toast: true,
                html: '(1) Вам необходимо заполнить все поля(Incorrect input) ! <br/> (2) или пароли не совпадают ! <br/>(3) или пароль большен быть больше 6 символов и содержать букв или цифры !',
                position: 'top-end'
            })
        }

        else {
            setValidated(true)
            registerUser();
            history.push(`/`);
        }
    };



    //register a new user , save in data base
    const registerUser = async () => {

        let user = {
            FirstName,
            User_Login,
            Birthday,
            Email,
            User_password: Password,
            UserType_code: "1",
            ConfirmPassword,
            Day_date: null,
            Hour_day: null,
            Serial_codeHour: null,
            IsActive: "1"
        };

        await AddNewUserRegester(user);
    }




    if (storedTheme === "light") {

        return (
            <div>
                <section className="banner1">

                    <div className="box1 contect1Dark">

                        <div className="log1Dark">

                            <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ textAlign: "center", alignItems: "center", color: "white" }}>
                                <Row>
                                    <Form.Group as={Col} md="6">
                                        <Form.Control
                                            style={{ fontSize: "14px", textAlign: "center" }}
                                            type="text"
                                            placeholder='Введите логин'
                                            value={User_Login}
                                            onChange={(event) => setLogin(event.target.value)}
                                            required />
                                    </Form.Group>

                                    <Form.Group as={Col} md="6">
                                        <Form.Control
                                            style={{ fontSize: "14px", textAlign: "center" }}
                                            type="text"
                                            placeholder='Введите ваше имя'
                                            value={FirstName}
                                            onChange={(event) => setFirstName(event.target.value)}
                                            required />
                                    </Form.Group>
                                </Row>


                                <Row>
                                    <Form.Group as={Col} md="12">
                                        <Form.Control
                                            style={{ fontSize: "14px", textAlign: "center" }}
                                            type="email"
                                            placeholder='Введите Email'
                                            value={Email}
                                            onChange={(event) => setEmail(event.target.value)}
                                            required />
                                    </Form.Group>
                                </Row>

                                <Row>
                                    <Form.Group as={Col} md="6">
                                        <Form.Control
                                            style={{ fontSize: "14px", textAlign: "center" }}
                                            type="password"
                                            placeholder='Введите пароль'
                                            value={Password}
                                            onChange={(event) => setPassword(event.target.value)}
                                            required />
                                    </Form.Group>

                                    <Form.Group as={Col} md="6">
                                        <Form.Control
                                            style={{ fontSize: "14px", textAlign: "center" }}
                                            type="password"
                                            placeholder='Введите пароль еще раз'
                                            value={ConfirmPassword}
                                            onChange={(event) => setConfirmPassword(event.target.value)}
                                            required />
                                    </Form.Group>
                                </Row>


                                <Row>
                                    <Form.Group as={Col} md="12">

                                        <div className='titleBirthdayDate'>
                                            <p>Введите дату рождения :</p>
                                        </div>

                                        <Form.Control
                                            style={{ fontSize: "14px", textAlign: "center", color: "white" }}
                                            type="date"
                                            //value={Birthday}
                                            // onChange={(event) => setBirthday(moment(event.target.value).format('DD.MM.YYYY'))}
                                            onChange={onChangeBirthday}
                                            required />
                                    </Form.Group>
                                </Row>


                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </div>

                    <div className="box1 image1"></div>
                </section>
            </div>
        );
    }



    else {

        return (
            <div>
                <section className="banner1">

                    <div className="box1 contect1">
                        <div className="log1">


                            <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ textAlign: "center", alignItems: "center", color: "#4b4b4b" }}>
                                <Row>
                                    <Form.Group as={Col} md="6">
                                        <Form.Control
                                            style={{ background: "rgba(0, 0, 0, 0.1)", fontSize: "14px", textAlign: "center" }}
                                            type="text"
                                            placeholder='Введите логин'
                                            value={User_Login}
                                            onChange={(event) => setLogin(event.target.value)}
                                            required />
                                    </Form.Group>

                                    <Form.Group as={Col} md="6">
                                        <Form.Control
                                            style={{ background: "rgba(0, 0, 0, 0.1)", fontSize: "14px", textAlign: "center" }}
                                            type="text"
                                            placeholder='Введите имя'
                                            value={FirstName}
                                            onChange={(event) => setFirstName(event.target.value)}
                                            required />
                                    </Form.Group>
                                </Row>


                                <Row>
                                    <Form.Group as={Col} md="12">
                                        <Form.Control
                                            style={{ background: "rgba(0, 0, 0, 0.1)", fontSize: "14px", textAlign: "center" }}
                                            type="email"
                                            placeholder='Введите Email'
                                            value={Email}
                                            onChange={(event) => setEmail(event.target.value)}
                                            required />
                                    </Form.Group>
                                </Row>

                                <Row>
                                    <Form.Group as={Col} md="6">
                                        <Form.Control
                                            style={{ background: "rgba(0, 0, 0, 0.1)", fontSize: "14px", textAlign: "center" }}
                                            type="password"
                                            placeholder='Введите пароль'
                                            value={Password}
                                            onChange={(event) => setPassword(event.target.value)}
                                            required />
                                    </Form.Group>

                                    <Form.Group as={Col} md="6">
                                        <Form.Control
                                            style={{ background: "rgba(0, 0, 0, 0.1)", fontSize: "14px", textAlign: "center" }}
                                            type="password"
                                            placeholder='Введите пароль еще раз'
                                            value={ConfirmPassword}
                                            onChange={(event) => setConfirmPassword(event.target.value)}
                                            required />
                                    </Form.Group>
                                </Row>


                                <Row>

                                    <Form.Group as={Col} md="12">

                                        <div className='titleBirthdayDate'>
                                            <p>Введите дату рождения :</p>
                                        </div>

                                        <Form.Control
                                            style={{ background: "rgba(0, 0, 0, 0.1)", fontSize: "14px", textAlign: "center" }}
                                            type="date"
                                            //value={Birthday}
                                            // onChange={(event) => setBirthday(moment(event.target.value).format('DD.MM.YYYY'))}
                                            onChange={onChangeBirthday}
                                            required />
                                    </Form.Group>
                                </Row>


                                <Button variant="primary" type="submit">
                                    Подтвердить
                                </Button>
                            </Form>

                        </div>
                    </div>

                    <div className="box1 image1"></div>
                </section>
            </div>
        );
    }
}


export default Register;