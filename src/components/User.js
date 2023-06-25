import React, { useState, useEffect } from 'react'
import { Tabs, Tab, Button, Modal, Form, Col, Row, Table } from 'react-bootstrap';
import '../css/profile.css'
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'
import PayService from '../components/PayService'
import { LoadMedicalFileUser, showAllMyReview, LoadMedicalFileUserIsNotActive } from '../Api/LoadDataFromApi'
import { DeleteReview, UpdateDataUserRemoveTurn, DeleteAppointment } from '../Api/DeleteUpdateDataFromApi'



//data_user - take all data user from Page Profile (user)
function User({ data_user }) {


    // popup pay service
    //const [showPayService, setShowPayService] = useState(false);
    //const handleClosePayService = () => setShowPayService(false);
    //const handleShowPayService = () => setShowPayService(true);

    let history = useHistory();

    //let CountReview = 1;
    let HistoryPayFile = 1;
    let MyReviews = 1;

    let storedTheme = localStorage.getItem("theme");
    let userData = JSON.parse(sessionStorage.getItem("user"));


    const [MyReview, SetMyReview] = useState([]);

    const [medical_File, SetMedical_File] = useState([]);

    //const [medical_File_Is_Not_Active, SetMedical_File_Is_Not_Active] = useState([]);



    //check in forum input(update user value) if all value input = if yes update , else show erorr
    // const [validated, setValidated] = useState(false);

    const handleSubmit = () => {

        // const form = event.currentTarget;

        if (Password != ConfirmPassword || Password.length < 6 && ConfirmPassword.length <= 6 || Password == '' || ConfirmPassword == '' || Login == '' || FirstName == '' || Email == '' || Birthday == '') {


            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                html: '(1) Вам необходимо заполнить все поля(Incorrect input) ! <br/> (2) или пароли не совпадают ! <br/>(3) или пароль большен быть больше 6 символов и содержать букв или цифры !',
                toast: true,
                position: 'top-end'
            })
            return;
        }

        else {

            Swal.fire({
                icon: 'warning',
                html: 'Эта функция заблокирована !',
                toast: true,
                position: 'top-end'
            })
            return;

            //updateDateUser();
            //sesionStorage.clear();
            // history.push("/");
            // window.location.reload(false);
        }
    };



    //active the hour in profile page if user dont need this turn , now status was delete after this function was active
    const ActiveHour = async () => {

        if (storedTheme === "dark") {

            Swal.fire({
                title: 'Вы уверены, что хотите отменить запись?',
                icon: 'question',
                showDenyButton: true,
                confirmButtonText: 'yes',
                denyButtonText: `no`,
                toast: true,
                position: 'top-end'
            }).then((result) => {

                if (result.isConfirmed) {
                    //ActiveHourInDataBase(data_user.codeHour);
                    saveDateUser();
                }

                else if (result.isDenied) {
                    window.location.reload(false);
                }
            })
        }


        if (storedTheme === "light") {

            Swal.fire({
                title: 'Вы уверены, что хотите отменить запись?',
                icon: 'question',
                showDenyButton: true,
                confirmButtonText: 'yes',
                denyButtonText: `no`,
                background: '#373E44',
                color: '#ffffffab',
                toast: true,
                position: 'top-end'
            }).then((result) => {

                if (result.isConfirmed) {

                    //ActiveHourInDataBase(data_user.codeHour);
                    saveDateUser();
                }

                else if (result.isDenied) {
                    window.location.reload(false);
                }
            })
        }
    }




    //update user date after active hour to NULL day hour and serial code hour
    const saveDateUser = async () => {

        DeleteAppointment(data_user.Serial_codeHour);
        await UpdateDataUserRemoveTurn(data_user.code);

        userData.Day_date = data_user.day = null;
        userData.Hour_day = data_user.hour =null;
        userData.Serial_codeHour = data_user.codeHour =null;

        // clear session storage after delete a hour day and serial code hour
        //sessionStorage.clear();
        sessionStorage.setItem("user", JSON.stringify(userData));
        history.push("/");
        window.location.reload(false);
    }




    // delete review this user from data base , user function from DeleteDataFromApi component
    const DeleteItemsFromDataApi = async (Id) => {

        if (storedTheme === "dark") {

            Swal.fire({
                title: 'Вы уверены, что хотите удалить отзыв?',
                icon: 'question',
                showDenyButton: true,
                confirmButtonText: 'yes',
                denyButtonText: `no`,
                background: '#373E44',
                color: '#ffffffab',
                toast: true,
                position: 'top-end'
            }).then((result) => {

                if (result.isConfirmed) {
                    DeleteReview(Id);
                }
            })

//            DeleteReview(Id);
        }


        if (storedTheme === "light") {

            Swal.fire({
                title: 'Вы уверены, что хотите удалить отзыв?',
                icon: 'question',
                showDenyButton: true,
                confirmButtonText: 'yes',
                denyButtonText: `no`,
                background: '#373E44',
                color: '#ffffffab',
                toast: true,
                position: 'top-end'
            }).then((result) => {

                if (result.isConfirmed) {
                    DeleteReview(Id);
                }
            })

            //DeleteReview(Id);
        }
    }



    // load data user from LoadDataFromApi component
    const LoadDataUserFromApi = async () => {

        SetMedical_File(await LoadMedicalFileUser(data_user.code))
        SetMyReview(await showAllMyReview(data_user.code))
        //SetMedical_File_Is_Not_Active(await LoadMedicalFileUserIsNotActive(data_user.code))
    }



    //show use date- when i update user date i show all value in input and choise what i need update
    const [Login, setLogin] = useState('');
    const [FirstName, setFirstName] = useState('');
    const [Email, setEmail] = useState('');
    const [Birthday, setBirthday] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');



    useEffect(() => {

        LoadDataUserFromApi();

        //show use date- when i update user date i show all value in input and choise what i need update
        setFirstName(data_user.name);
        setLogin(data_user.login);
        setEmail(data_user.email);
        setBirthday(data_user.birthday);
        setPassword(data_user.password);
        setConfirmPassword(data_user.confirm_password);
    }, [])




    if (storedTheme === "dark" && data_user.day == null) {
        return (
            <div>
                <div className="bg-white">
                    <Tabs id="controlled-tab-example" className="mb-3 tabsChiose " >
                        <Tab eventKey="Мои записи" title="Следующий прием" className='Queues'>
                            <Modal.Dialog className='showMyQueues'>
                                <Modal.Body>
                                    <p>Вы не записаны на прием! <br />
                                        Перейдите на начальную страницу и нажмите "Записаться на прием". <br />
                                        или <br />
                                        <a style={{ textDecoration: "none", fontWeight: "bold" }} href='/'>нажмите здесь</a>
                                    </p>
                                </Modal.Body>
                            </Modal.Dialog>
                        </Tab>
                        <Tab eventKey="History (medical File)" title="История приемов" className='HistoryMedical'>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                        <th style={{ width: "5%", textAlign: "center" }}>Доктор</th>
                                        <th style={{ width: "3%", textAlign: "center" }}>Дата приема</th>
                                        <th style={{ width: "25%", textAlign: "center" }}>Заключение</th>
                                        <th style={{ width: "3%", textAlign: "center" }}>Оплата</th>
                                    </tr>
                                </thead>
                                {medical_File.map(File =>
                                    <tbody key={File.Serial_code}>
                                        <tr>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{HistoryPayFile++}</td>
                                            <td style={{ textAlign: "center", fontSize: "12px" }}>{File.FirstName}</td>
                                            <td style={{ textAlign: "center", fontSize: "12px" }}>{File.Date_published}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{File.textDoctor}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{File.priceSevice} руб.</td>
                                            <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                                <Button href={File.File_user} size="sm" variant="secondary">Файл</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                )}
                            </Table>
                        </Tab>

                        <Tab eventKey="My Comments" title="Мои отзывы" className='Comments'>

                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                        <th style={{ width: "18%", textAlign: "center" }}>Дата</th>
                                        <th style={{ textAlign: "center" }}>Отзыв</th>
                                        <th style={{ width: "1%" }}></th>
                                    </tr>
                                </thead>

                                {MyReview.map(Review =>

                                    <tbody key={Review.Serial_code}>
                                        <tr>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{MyReviews++}</td>
                                            <td style={{ textAlign: "center", fontSize: "12px" }}>{Review.Date_published}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{Review.textReviews}</td>
                                            <td><Button size="sm" variant="danger"
                                                onClick={() => DeleteItemsFromDataApi(Review.Serial_code)}>
                                                delete</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                )}
                            </Table>
                        </Tab>



                        <Tab eventKey="personal data" title="Персональные данные" className='updateDateUser'>

                            <Form>

                                <Row>

                                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                                        <Form.Label className='colorText'>Login</Form.Label>

                                        <Form.Control
                                            value={Login}
                                            type="text"
                                            onChange={(event) => setLogin(event.target.value)}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid login.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" ccontrolId="validationCustom02">
                                        <Form.Label className='colorText'>Имя</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="text"
                                            value={FirstName}
                                            onChange={(event) => setFirstName(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid FirstName.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom03">
                                        <Form.Label className='colorText'>mail</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="text"
                                            value={Email}
                                            onChange={(event) => setEmail(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid mail.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                                        <Form.Label className='colorText'>Дата рождения</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="Date"
                                            value={Birthday}
                                            onChange={(event) => setBirthday(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Date.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom05">
                                        <Form.Label className='colorText'>Password</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="Password"
                                            value={Password}
                                            onChange={(event) => setPassword(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Password.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom06">
                                        <Form.Label className='colorText'>Confirm Password</Form.Label>

                                        <Form.Control
                                            placeholder="Confirm Password"
                                            type="Password"
                                            value={ConfirmPassword}
                                            onChange={(event) => setConfirmPassword(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Confirm Password.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <div className='enterUpdate'>
                                    <Button onClick={handleSubmit} variant="success">Сохранить</Button>
                                </div>
                            </Form>

                        </Tab>

                    </Tabs>

                </div>
            </div>
        );

    }



    else if (storedTheme === "dark" && data_user.day != null) {

        return (
            <div>


                <div className="bg-white">

                    <Tabs id="controlled-tab-example" className="mb-3 tabsChiose " >

                        <Tab eventKey="My queues" title="Следующий прием" className='Queues'>

                            <Modal.Dialog className='showMyQueues'>

                                <Modal.Body>

                                    <div style={{ marginTop: "-20%" }}>
                                        <h6>Вы записаны на прием :</h6> <br />
                                        Дата : {userData.Day_date}<br />
                                        Время : {userData.Hour_day}<br /><br />
                                        <h6 style={{ fontSize: "13px", color: "black" }}>Для отмены записи нажмите Отменить !</h6>
                                    </div>

                                </Modal.Body>

                                <Modal.Footer className='ButtonQueues'>
                                    <Button variant="danger" onClick={() => ActiveHour()} >Отменить</Button>
                                </Modal.Footer>

                            </Modal.Dialog>

                        </Tab>


                        <Tab eventKey="History (medical File)" title="История приемов" className='HistoryMedical'>

                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                        <th style={{ width: "5%", textAlign: "center" }}>Доктор</th>
                                        <th style={{ width: "3%", textAlign: "center" }}>Дата приема</th>
                                        <th style={{ width: "25%", textAlign: "center" }}>Заключение</th>
                                        <th style={{ width: "3%", textAlign: "center" }}>Оплата</th>

                                    </tr>
                                </thead>

                                    {medical_File.map(File =>

                                        <tbody key={File.Serial_code}>
                                            <tr>
                                                <td style={{ textAlign: "center", fontSize: "14px" }}>{HistoryPayFile++}</td>
                                                <td style={{ textAlign: "center", fontSize: "12px" }}>{File.FirstName}</td>
                                                <td style={{ textAlign: "center", fontSize: "12px" }}>{File.Date_published}</td>
                                                <td style={{ textAlign: "center", fontSize: "14px" }}>{File.textDoctor}</td>
                                                <td style={{ textAlign: "center", fontSize: "14px" }}>{File.priceSevice} руб.</td>

                                                <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                                    <Button href={File.File_user} size="sm" variant="secondary">Файл</Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    )}
                            </Table>
                        </Tab>



                        <Tab eventKey="My Comments" title="Мои отзывы" className='Comments'>


                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                        <th style={{ width: "18%", textAlign: "center" }}>Дата</th>
                                        <th style={{ textAlign: "center" }}>Отзыв</th>
                                        <th style={{ width: "1%" }}></th>
                                    </tr>
                                </thead>

                                {MyReview.map(Review =>

                                    <tbody key={Review.Serial_code}>
                                        <tr>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{MyReviews++}</td>
                                            <td style={{ textAlign: "center", fontSize: "12px" }}>{Review.Date_published}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{Review.textReviews}</td>
                                            <td><Button size="sm" variant="danger"
                                                onClick={() => DeleteItemsFromDataApi(Review.Serial_code)}>
                                                delete</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                )}
                            </Table>
                        </Tab>

                        <Tab eventKey="personal data" title="Персональные данные" className='updateDateUser'>

                            <Form>

                                <Row>

                                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                                        <Form.Label className='colorText'>Login</Form.Label>

                                        <Form.Control

                                            value={Login}
                                            type="text"
                                            onChange={(event) => setLogin(event.target.value)}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid login.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" ccontrolId="validationCustom02">
                                        <Form.Label className='colorText'>Имя</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="text"
                                            value={FirstName}
                                            onChange={(event) => setFirstName(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid FirstName.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom03">
                                        <Form.Label className='colorText'>mail</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="text"
                                            value={Email}
                                            onChange={(event) => setEmail(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid mail.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                                        <Form.Label className='colorText'>Date</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="Date"
                                            value={Birthday}
                                            onChange={(event) => setBirthday(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Date.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom05">
                                        <Form.Label className='colorText'>Password</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="Password"
                                            value={Password}
                                            onChange={(event) => setPassword(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Password.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom06">
                                        <Form.Label className='colorText'>Confirm Password</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="Password"
                                            value={ConfirmPassword}
                                            onChange={(event) => setConfirmPassword(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Confirm Password.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <div className='enterUpdate'>
                                    <Button onClick={handleSubmit} variant="success">Сохранить</Button>
                                </div>

                            </Form>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        )
    }



    else if (storedTheme === "light" && data_user.day == null) {

        return (
            <div>
                <div>
                    <Tabs id="controlled-tab-example" className="mb-3 tabsChioseDark " >
                        <Tab eventKey="My queue" title="Следуюший прием" className='QueuesDark' >
                            <Modal.Dialog className='showMyQueuesDark'>
                                <Modal.Body>
                                    <p>Вы не записаны на прием! <br />
                                        Перейдите на начальную страницу и нажмите "Записаться на прием". <br />
                                        или <br />
                                        Click <a style={{ textDecoration: "none", fontWeight: "bold" }} href='/'>нажмите здесь</a>
                                    </p>
                                </Modal.Body>
                            </Modal.Dialog>
                        </Tab>

                        <Tab eventKey="History (medical File)" title="История приемов" className='HistoryMedical'>
                            <Table striped bordered hover variant="dark" size="sm">
                                <thead>
                                    <tr>
                                        <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                        <th style={{ width: "5%", textAlign: "center" }}>Доктор</th>
                                        <th style={{ width: "3%", textAlign: "center" }}>Дата приема</th>
                                        <th style={{ width: "25%", textAlign: "center" }}>Заключение</th>
                                        <th style={{ width: "3%", textAlign: "center" }}>Оплата</th>

                                    </tr>
                                </thead>

                                {medical_File.map(File =>

                                    <tbody key={File.Serial_code}>
                                        <tr>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{HistoryPayFile++}</td>
                                            <td style={{ textAlign: "center", fontSize: "12px" }}>{File.FirstName}</td>
                                            <td style={{ textAlign: "center", fontSize: "12px" }}>{File.Date_published}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{File.textDoctor}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{File.priceSevice} руб.</td>

                                            <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                                <Button href={File.File_user} size="sm" variant="secondary">Файл</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                )}
                            </Table>
                        </Tab>



                        <Tab eventKey="My Comments" title="Мои отзывы" className='Comments'>

                            <Table striped bordered hover variant="dark" size="sm">
                                <thead>
                                    <tr>
                                        <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                        <th style={{ width: "18%", textAlign: "center" }}>Дата</th>
                                        <th style={{ textAlign: "center" }}>Отзыв</th>
                                        <th style={{ width: "1%" }}></th>
                                    </tr>
                                </thead>

                                {MyReview.map(Review =>

                                    <tbody key={Review.Serial_code}>
                                        <tr>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{MyReviews++}</td>
                                            <td style={{ textAlign: "center", fontSize: "12px" }}>{Review.Date_published}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{Review.textReviews}</td>
                                            <td><Button size="sm" variant="danger"
                                                onClick={() => DeleteItemsFromDataApi(Review.Serial_code)}>
                                                delete</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                )}
                            </Table>
                        </Tab>

                        <Tab eventKey="personal data" title="Персональные данные" className='updateDateUser'>

                            <Form>

                                <Row>

                                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                                        <Form.Label className='colorTextDark'>Login</Form.Label>

                                        <Form.Control

                                            value={Login}
                                            type="text"
                                            onChange={(event) => setLogin(event.target.value)}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid login.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" ccontrolId="validationCustom02">
                                        <Form.Label className='colorTextDark' >FirstName</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="text"
                                            value={FirstName}
                                            onChange={(event) => setFirstName(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid FirstName.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom03">
                                        <Form.Label className='colorTextDark'>mail</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="text"
                                            value={Email}
                                            onChange={(event) => setEmail(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid mail.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                                        <Form.Label className='colorTextDark'>Date</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="Date"
                                            value={Birthday}
                                            onChange={(event) => setBirthday(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Date.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom05">
                                        <Form.Label className='colorTextDark'>Password</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="Password"
                                            value={Password}
                                            onChange={(event) => setPassword(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Password.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom06">
                                        <Form.Label className='colorTextDark'>Confirm Password</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="Password"
                                            value={ConfirmPassword}
                                            onChange={(event) => setConfirmPassword(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Confirm Password.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <div className='enterUpdate'>
                                    <Button onClick={handleSubmit} variant="success">Сохранить</Button>
                                </div>
                            </Form>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        )
    }



    else if (storedTheme === "light" && data_user.day != null) {

        return (
            <div>

                <div>

                    <Tabs id="controlled-tab-example" className="mb-3 tabsChioseDark " >

                        <Tab eventKey="My queue" title="Следующий прием" className='QueuesDark' >

                            <Modal.Dialog className='showMyQueuesDark'>

                                <Modal.Body>

                                    <div style={{ marginTop: "-20%", color: "white" }}>
                                        <h6 style={{ fontWeight: "bold", color: "white" }}>Вы записаны на прием :</h6> <br />
                                        День : {userData.Day_date}<br />
                                        Время : {userData.Hour_day}<br /><br />
                                        <h6 style={{ fontSize: "13px", color: "white" }}>Для отмены записи нажмите Отменить!</h6>
                                    </div>

                                </Modal.Body>

                                <Modal.Footer className='ButtonQueues' >
                                    <Button variant="danger" onClick={ActiveHour}>Отменить</Button>
                                </Modal.Footer>

                            </Modal.Dialog>

                        </Tab>


                        <Tab eventKey="History (medical File)" title="История приемов" className='HistoryMedical'>
                            <Table striped bordered hover variant="dark" size="sm">
                            <thead>
                                    <tr>
                                        <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                        <th style={{ width: "5%", textAlign: "center" }}>Доктор</th>
                                        <th style={{ width: "3%", textAlign: "center" }}>Дата приема</th>
                                        <th style={{ width: "25%", textAlign: "center" }}>Заключение</th>
                                        <th style={{ width: "3%", textAlign: "center" }}>Оплата</th>
                                    </tr>
                                </thead>

                                {medical_File.map(File =>

                                    <tbody key={File.Serial_code}>
                                        <tr>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{HistoryPayFile++}</td>
                                            <td style={{ textAlign: "center", fontSize: "12px" }}>{File.FirstName}</td>
                                            <td style={{ textAlign: "center", fontSize: "12px" }}>{File.Date_published}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{File.textDoctor}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{File.priceSevice} руб.</td>

                                            <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                                <Button href={File.File_user} size="sm" variant="secondary">Файл</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                )}
                            </Table>
                        </Tab>


                        <Tab eventKey="My Comments" title="Мои отзывы" className='Comments'>

                            <Table striped bordered hover variant="dark" size="sm">
                                <thead>
                                    <tr>
                                        <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                        <th style={{ width: "18%", textAlign: "center" }}>Дата</th>
                                        <th style={{ textAlign: "center" }}>Отзыв</th>
                                        <th style={{ width: "1%" }}></th>
                                    </tr>
                                </thead>

                                {MyReview.map(Review =>

                                    <tbody key={Review.Serial_code}>
                                        <tr>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{MyReviews++}</td>
                                            <td style={{ textAlign: "center", fontSize: "12px" }}>{Review.Date_published}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{Review.textReviews}</td>
                                            <td><Button size="sm" variant="danger"
                                                onClick={() => DeleteItemsFromDataApi(Review.Serial_code)}>
                                                delete
                                            </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                )}
                            </Table>
                        </Tab>


                        <Tab eventKey="personal data" title="Персональные данные" className='updateDateUser'>

                            <Form>

                                <Row>

                                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                                        <Form.Label className='colorTextDark'>Login</Form.Label>

                                        <Form.Control
                                            value={Login}
                                            type="text"
                                            onChange={(event) => setLogin(event.target.value)}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid login.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" ccontrolId="validationCustom02">
                                        <Form.Label className='colorTextDark'>Имя</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="text"
                                            value={FirstName}
                                            onChange={(event) => setFirstName(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid FirstName.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom03">
                                        <Form.Label className='colorTextDark'>mail</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="text"
                                            value={Email}
                                            onChange={(event) => setEmail(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid mail.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                                        <Form.Label className='colorTextDark'>Дата рождения</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="Date"
                                            value={Birthday}
                                            onChange={(event) => setBirthday(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Date.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom05">
                                        <Form.Label className='colorTextDark'>Password</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="Password"
                                            value={Password}
                                            onChange={(event) => setPassword(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Password.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom06">
                                        <Form.Label className='colorTextDark'>Confirm Password</Form.Label>

                                        <Form.Control
                                            placeholder="Enter email"
                                            type="Password"
                                            value={ConfirmPassword}
                                            onChange={(event) => setConfirmPassword(event.target.value)}
                                            required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Confirm Password.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <div className='enterUpdate'>
                                    <Button onClick={handleSubmit} variant="success">Сохранить</Button>
                                </div>
                            </Form>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        )
    }

}


export default User;