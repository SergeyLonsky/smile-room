import React, { useState, useEffect } from 'react'
import { Tabs, Tab, Button, Row, Form, Col, Table, Modal } from 'react-bootstrap';
import EditService from '../components/EditService';
import '../css/profile.css'
import Swal from 'sweetalert2'
import { LoadAllUsers, LoadAllUsersBlocked, LoadAllDoctors, LoadAllReviews, LoadServices, LoadAllNewReviews } from '../Api/LoadDataFromApi'
import { DeleteUser, DeleteReview, ActiveUserInDataBase, ModerateReview } from '../Api/DeleteUpdateDataFromApi'
import { AddNewUserRegester } from '../Api/ConnectOrAddFromApi'




//here component Admin we to do what admin can do = this component use in profile
function Admin() {

    const [Users, SetUsers] = useState([])
    const [UsersBlocked, SetUsersBlocked] = useState([])
    const [Doctors, SetDoctors] = useState([])
    const [DoctorsBlocked, SetDoctorsBlocked] = useState([])
    const [Reviews, SetReviews] = useState([])
    const [NewReviews, SetNewReviews] = useState([])
    const [Services, SetServices] = useState([])

    let CountUser = 1;
    let CountUserBlock = 1;
    let CountDoctor = 1;
    let CountDoctorBlock = 1;
    let CountReview = 1;
    let CountNewReview = 1;
    let CountSerive = 1

    const [Login, setLogin] = useState('');
    const [FirstName, setFirstName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');

    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    let storedTheme = localStorage.getItem("theme");


    //check all input if all good Add to new doctor(AddDoctor)
    const [validated, setValidated] = useState(false);

    const hideEditService = () => {

        setShowModal(false);
    }

    const updateService = async (Service_Name, Description, Cost, Serial_code) => {

        let data =
        {
            Serial_code: Serial_code,
            Service_Name: Service_Name,
            Description: Description,
            Cost: Cost
        }

        sessionStorage.setItem("serviceData", JSON.stringify(data))

        //show popup send a file medical to user
        handleShow();
    }

    const handleSubmit = (event) => {

        const form = event.currentTarget;

        if (form.checkValidity() === false || Password != ConfirmPassword || Password.length < 6 && ConfirmPassword.length <= 6) {
            event.preventDefault();
            event.stopPropagation();

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                html: '(1) you need input all value(Incorrect input) ! <br/> (2) Or Password NOT Equals ! <br/>(3) Or enter a password with 6 or more digits or letters !',
                toast: true,
                position: 'top-end'
            })
        }

        else {
            setValidated(true)

            AddDoctor()

            Swal.fire({
                title: 'success',
                icon: 'success',
                toast: true,
                position: 'top-end'
            }).then((result) => {

                if (result.isConfirmed) {
                    window.location.reload(false);
                }
            })

        }
    };



    // load data from LoadDataFromApi component
    const LoadCountDetailsFromApi = async () => {

        SetUsers(await LoadAllUsers())
        SetUsersBlocked(await LoadAllUsersBlocked(1))
        SetDoctors(await LoadAllDoctors())
        SetDoctorsBlocked(await LoadAllUsersBlocked(2))
        SetReviews(await LoadAllReviews())
        SetNewReviews(await LoadAllNewReviews())
        SetServices(await LoadServices())
    }


    // delete items from DeleteDataFromApi component
    const DeleteItemsFromDataApi = async (Id, item) => {

        if (item == "review") {

            await DeleteReview(Id)
        }

        if (item == "user") {

            await DeleteUser(Id);
        }

        if (item == "moderate") {

            await ModerateReview(Id)
        }
    }



    //active all users how was block
    const ActiveUser = async (Id) => {

        await ActiveUserInDataBase(Id);
        window.location.reload(false);
    }



    //add a new doctor to data base
    const AddDoctor = async () => {

        let user = {
            FirstName: FirstName,
            User_Login: Login,
            Birthday: null,
            Email: Email,
            User_password: Password,
            UserType_code: "2",
            ConfirmPassword: ConfirmPassword,
            Day_date: null,
            Hour_day: null,
            Serial_codeHour: null,
            IsActive: "1"
        };

        await AddNewUserRegester(user);

        window.location.reload(false);
    }




    useEffect(() => {

        LoadCountDetailsFromApi();

        Swal.fire({
            background: 'none',
            width: 400,
            showConfirmButton: false,
            timer: 2100,
            html: '<img src="https://i.postimg.cc/KzypDw9n/admin.png" height="200"></img>'
        })
    }, [])




    if (storedTheme === "dark") {

        return (
            <div>
                <Tabs id="controlled-tab-example" className="mb-3 tabsChiose " >
                    <Tab eventKey="show all users" title="Все пользователи" className='AllUsers'>
                        <Table bordered hover size="sm" >
                            <thead>
                                <tr>
                                    <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                    <th style={{ width: "1%", textAlign: "center" }}>Логин</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Имя</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Email</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Дата рождения</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Пароль</th>
                                </tr>
                            </thead>
                            {Users.map(user =>
                                <tbody key={user.User_code} >
                                    <tr>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{CountUser++}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.User_Login}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.FirstName}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.Email}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.Birthday}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.User_password}</td>
                                        <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                            <Button size="sm" variant="danger" onClick={() => DeleteItemsFromDataApi(user.User_code, "user")}>Заблокировать</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </Table>
                    </Tab>
                    <Tab eventKey="show all users blocked" title="Заблокированные пользователи" className='AllUsersBlocked'>
                        <Table bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                    <th style={{ width: "1%", textAlign: "center" }}>Логин</th>
                                    <th style={{ width: "1%", textAlign: "center" }}>Имя</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Email</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Дата рождения</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Пароль</th>
                                </tr>
                            </thead>
                            {UsersBlocked.map(user =>
                                <tbody key={user.User_code}>
                                    <tr>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{CountUserBlock++}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.User_Login}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.FirstName}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.Email}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.Birthday}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.User_password}</td>
                                        <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                            <Button size="sm" variant="success" onClick={() => ActiveUser(user.User_code)}>Активировать</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </Table>
                    </Tab>

                    <Tab eventKey="show all Doctors" title="Врачи" className='AllDoctors'>

                        <Table bordered hover size="sm">

                            <thead>
                                <tr>
                                    <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Логин</th>
                                    <th style={{ width: "4%", textAlign: "center" }}>Имя</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Email</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Пароль</th>
                                </tr>
                            </thead>

                            {Doctors.map(doctor =>

                                <tbody key={doctor.User_code}>
                                    <tr>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{CountDoctor++}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{doctor.User_Login}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{doctor.FirstName}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{doctor.Email}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{doctor.User_password}</td>


                                        <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                            <Button size="sm" variant="danger" onClick={() => DeleteItemsFromDataApi(doctor.User_code, "user")}>Заблокрировать</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </Table>

                    </Tab>

                    <Tab eventKey="show all doctors blocked" title="Заблокированные врачи" className='AllDoctorsBloked'>

                        <Table bordered hover size="sm">

                            <thead>
                                <tr>
                                    <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                    <th style={{ width: "1%", textAlign: "center" }}>Логин</th>
                                    <th style={{ width: "1%", textAlign: "center" }}>Имя</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Email</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Дата рождения</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Пароль</th>
                                </tr>
                            </thead>

                            {DoctorsBlocked.map(user =>

                                <tbody key={user.User_code}>
                                    <tr>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{CountDoctorBlock++}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.User_Login}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.FirstName}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.Email}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.Birthday}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.User_password}</td>


                                        <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                            <Button size="sm" variant="success" onClick={() => ActiveUser(user.User_code)}>Активировать</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </Table>
                    </Tab>



                    <Tab eventKey="add new doctor" title="Добавить врача" className='NewDoctor'>


                        <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ textAlign: "center", alignItems: "center", color: "#4b4b4b" }}>
                            <Row>
                                <Form.Group as={Col} >
                                    <Form.Label>Логин</Form.Label>
                                    <Form.Control
                                        style={{ background: "none" }}
                                        type="text"
                                        value={Login}
                                        onChange={(event) => setLogin(event.target.value)}
                                        required />
                                </Form.Group>

                                <Form.Group as={Col} >
                                    <Form.Label>Имя</Form.Label>
                                    <Form.Control
                                        style={{ background: "none" }}
                                        type="text"
                                        value={FirstName}
                                        onChange={(event) => setFirstName(event.target.value)}
                                        required />
                                </Form.Group>
                            </Row>


                            <Row>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        style={{ background: "none" }}
                                        type="email"
                                        value={Email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        required />
                                </Form.Group>


                                <Form.Group as={Col} md="3">
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control
                                        style={{ background: "none" }}
                                        type="password"
                                        value={Password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        required />
                                </Form.Group>

                                <Form.Group as={Col} md="3">
                                    <Form.Label>Подтвердите пароль</Form.Label>
                                    <Form.Control
                                        style={{ background: "none" }}
                                        type="password"
                                        value={ConfirmPassword}
                                        onChange={(event) => setConfirmPassword(event.target.value)}
                                        required />
                                </Form.Group>
                            </Row>


                            <br />

                            <Button variant="success" type="submit">
                                Добавить
                            </Button>
                        </Form>
                    </Tab>


                    <Tab eventKey="show all Reviews" title="Отзывы" className='AllReviews'>

                        <Table bordered hover size="sm">

                            <thead>
                                <tr>
                                    <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                    <th style={{ width: "1%", textAlign: "center" }}>Имя</th>
                                    <th style={{ width: "10%", textAlign: "center" }}>Отзыв</th>
                                    <th style={{ width: "1%", textAlign: "center" }}>Дата</th>
                                </tr>
                            </thead>

                            {Reviews.map(Review =>

                                <tbody key={Review.Serial_code}>
                                    <tr>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{CountReview++}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{Review.FirstName}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{Review.textReviews}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{Review.Date_published}</td>


                                        <td style={{ textAlign: "center", fontSize: "13px", width: "1%" }}>
                                            <Button size="sm" variant="danger" onClick={() => DeleteItemsFromDataApi(Review.Serial_code, "review")}>Удалить</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </Table>
                    </Tab>

                    <Tab eventKey="show all new Reviews" title="Новые отзывы" className='AllNewReviews'>

                        <Table bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                    <th style={{ width: "1%", textAlign: "center" }}>Имя</th>
                                    <th style={{ width: "10%", textAlign: "center" }}>Отзыв</th>
                                    <th style={{ width: "1%", textAlign: "center" }}>Дата</th>
                                </tr>
                            </thead>

                            {NewReviews.map(Review =>

                                <tbody key={Review.Serial_code}>
                                    <tr>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{CountNewReview++}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{Review.FirstName}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{Review.textReviews}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{Review.Date_published}</td>

                                        <td style={{ textAlign: "center", fontSize: "13px", width: "1%" }}>
                                            <Button size="sm" variant="danger" onClick={() => DeleteItemsFromDataApi(Review.Serial_code, "moderate")}>Активировать</Button>
                                        </td>

                                        <td style={{ textAlign: "center", fontSize: "13px", width: "1%" }}>
                                            <Button size="sm" variant="danger" onClick={() => DeleteItemsFromDataApi(Review.Serial_code, "review")}>Удалить</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </Table>
                    </Tab>

                    <Tab eventKey="show all services" title="Услуги" className='AllServices'>

                        <Table bordered hover size="sm">

                        <thead>
                                <tr>
                                    <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                    <th style={{ width: "10%", textAlign: "center" }}>Название</th>
                                    <th style={{ width: "30%", textAlign: "center" }}>Описание</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Стоимость</th>
                                </tr>
                            </thead>

                            {Services.map(service =>

                                <tbody key={service.Serial_code}>
                                    <tr>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{CountSerive++}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{service.Service_Name}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{service.Description}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{service.Cost}</td>
                                        <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                            <Button size="sm" variant="success" onClick={() => updateService(service.Service_Name, service.Description, service.Cost, service.Serial_code)}>Редактировать</Button>
                                        </td>
                                    </tr>
                                    <Modal show={showModal} style={{ background: "rgba(0, 0, 0, 0.95)" }} >
                                        <EditService hideEditService={hideEditService} serialCode={service.Serial_code} />
                                    </Modal>

                                </tbody>
                            )}
                        </Table>
                    </Tab>
                </Tabs>

            </div>
        )
    }



    if (storedTheme === "light") {

        return (

            <div>

                <Tabs id="controlled-tab-example" className="mb-3 tabsChiose " >

                    <Tab eventKey="show all users" title="Все пользователи" className='AllUsers'>

                        <Table striped bordered hover variant="light" size="sm">

                            <thead>
                                <tr>
                                    <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                    <th style={{ width: "1%", textAlign: "center" }}>Логин</th>
                                    <th style={{ width: "1%", textAlign: "center" }}>Имя</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Email</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Дата рождения</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Пароль</th>
                                </tr>
                            </thead>

                            {Users.map(user =>

                                <tbody key={user.User_code}>
                                    <tr>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{CountUser++}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.User_Login}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.FirstName}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.Email}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.Birthday}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.User_password}</td>


                                        {/* <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                            <Button size="sm" variant="success">Активировать</Button>
                                        </td> */}

                                        <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                            <Button size="sm" variant="danger" onClick={() => DeleteItemsFromDataApi(user.User_code, "user")}>Блокировать</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </Table>
                    </Tab>


                    <Tab eventKey="show all users blocked" title="Заблокированные пользователи" className='AllUsersBlocked'>

                        <Table striped bordered hover variant="light">

                        <thead>
                                <tr>
                                    <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                    <th style={{ width: "1%", textAlign: "center" }}>Логин</th>
                                    <th style={{ width: "1%", textAlign: "center" }}>Имя</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Email</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Дата рождения</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Пароль</th>
                                </tr>
                            </thead>

                            {UsersBlocked.map(user =>

                                <tbody key={user.User_code}>
                                    <tr>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{CountUserBlock++}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.User_Login}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.FirstName}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.Email}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.Birthday}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.User_password}</td>


                                        <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                            <Button size="sm" variant="success" onClick={() => ActiveUser(user.User_code)}>Активировать</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </Table>
                    </Tab>


                    <Tab eventKey="show all Doctors" title="Врачи" className='AllDoctors'>

                        <Table striped bordered hover variant="light">
                            <thead>
                                <tr>
                                    <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Логин</th>
                                    <th style={{ width: "4%", textAlign: "center" }}>Имя</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Email</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Пароль</th>
                                </tr>
                            </thead>

                            {Doctors.map(doctor =>

                                <tbody key={doctor.User_code}>
                                    <tr>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{CountDoctor++}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{doctor.User_Login}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{doctor.FirstName}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{doctor.Email}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{doctor.User_password}</td>


                                        <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                            <Button size="sm" variant="danger" onClick={() => DeleteItemsFromDataApi(doctor.User_code, "user")}>Заблокрировать</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </Table>
                    </Tab>

                    <Tab eventKey="show all doctors blocked" title="Заблокированные врачи" className='AllDoctorsBloked'>

                        <Table striped bordered hover variant="light">

                            <thead>
                                <tr>
                                    <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                    <th style={{ width: "1%", textAlign: "center" }}>Логин</th>
                                    <th style={{ width: "1%", textAlign: "center" }}>Имя</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Email</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Дата рождения</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Пароль</th>
                                </tr>
                            </thead>

                            {DoctorsBlocked.map(user =>

                                <tbody key={user.User_code}>
                                    <tr>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{CountDoctorBlock++}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.User_Login}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.FirstName}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.Email}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.Birthday}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{user.User_password}</td>


                                        <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                            <Button size="sm" variant="success" onClick={() => ActiveUser(user.User_code)}>Активировать</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </Table>
                    </Tab>


                    <Tab eventKey="add new doctor" title="Добавить врача" className='NewDoctor'>


                        <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ textAlign: "center", alignItems: "center", color: "white" }}>
                        <Row>
                                <Form.Group as={Col} >
                                    <Form.Label>Логин</Form.Label>
                                    <Form.Control
                                        style={{ background: "none" }}
                                        type="text"
                                        value={Login}
                                        onChange={(event) => setLogin(event.target.value)}
                                        required />
                                </Form.Group>

                                <Form.Group as={Col} >
                                    <Form.Label>Имя</Form.Label>
                                    <Form.Control
                                        style={{ background: "none" }}
                                        type="text"
                                        value={FirstName}
                                        onChange={(event) => setFirstName(event.target.value)}
                                        required />
                                </Form.Group>
                            </Row>


                            <Row>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        style={{ background: "none" }}
                                        type="email"
                                        value={Email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        required />
                                </Form.Group>


                                <Form.Group as={Col} md="3">
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control
                                        style={{ background: "none" }}
                                        type="password"
                                        value={Password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        required />
                                </Form.Group>

                                <Form.Group as={Col} md="3">
                                    <Form.Label>Подтвердите пароль</Form.Label>
                                    <Form.Control
                                        style={{ background: "none" }}
                                        type="password"
                                        value={ConfirmPassword}
                                        onChange={(event) => setConfirmPassword(event.target.value)}
                                        required />
                                </Form.Group>
                            </Row>


                            <br />

                            <Button variant="success" type="submit">
                                Добавить
                            </Button>
                        </Form>
                    </Tab>


                    <Tab eventKey="show all Reviews" title="Отзывы" className='AllReviews'>

                        <Table striped bordered hover variant="light">

                            <thead>
                                <tr>
                                    <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                    <th style={{ width: "1%", textAlign: "center" }}>Имя</th>
                                    <th style={{ width: "10%", textAlign: "center" }}>Отзыв</th>
                                    <th style={{ width: "1%", textAlign: "center" }}>Дата</th>
                                </tr>
                            </thead>

                            {Reviews.map(Review =>

                                <tbody key={Review.Serial_code}>
                                    <tr>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{CountReview++}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{Review.FirstName}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{Review.textReviews}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{Review.Date_published}</td>


                                        <td style={{ textAlign: "center", fontSize: "13px", width: "1%" }}>
                                            <Button size="sm" variant="danger" onClick={() => DeleteItemsFromDataApi(Review.Serial_code, "review")}>Удалить</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </Table>
                    </Tab>

                    <Tab eventKey="show all new Reviews" title="Новые отзывы" className='AllNewReviews'>

                        <Table striped bordered hover variant="light">

                            <thead>
                                <tr>
                                    <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                    <th style={{ width: "1%", textAlign: "center" }}>Имя</th>
                                    <th style={{ width: "10%", textAlign: "center" }}>Отзыв</th>
                                    <th style={{ width: "1%", textAlign: "center" }}>Дата</th>
                                </tr>
                            </thead>

                            {NewReviews.map(Review =>

                                <tbody key={Review.Serial_code}>
                                    <tr>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{CountNewReview++}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{Review.FirstName}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{Review.textReviews}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{Review.Date_published}</td>

                                        <td style={{ textAlign: "center", fontSize: "13px", width: "1%" }}>
                                            <Button size="sm" variant="danger" onClick={() => DeleteItemsFromDataApi(Review.Serial_code, "moderate")}>Активировать</Button>
                                        </td>

                                        <td style={{ textAlign: "center", fontSize: "13px", width: "1%" }}>
                                            <Button size="sm" variant="danger" onClick={() => DeleteItemsFromDataApi(Review.Serial_code, "review")}>Удалить</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </Table>
                    </Tab>

                    <Tab eventKey="show all services" title="Услуги" className='AllServices'>

                        <Table striped bordered hover variant="light">

                            <thead>
                                <tr>
                                    <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                    <th style={{ width: "10%", textAlign: "center" }}>Название</th>
                                    <th style={{ width: "30%", textAlign: "center" }}>Описание</th>
                                    <th style={{ width: "3%", textAlign: "center" }}>Стоимость</th>
                                </tr>
                            </thead>

                            {Services.map(service =>

                                <tbody key={service.Serial_code}>
                                    <tr>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{CountSerive++}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{service.Service_Name}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{service.Description}</td>
                                        <td style={{ textAlign: "center", fontSize: "13px" }}>{service.Cost}</td>
                                        <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                            <Button size="sm" variant="success" onClick={() => updateService(service.Service_Name, service.Description, service.Cost, service.Serial_code)}>Редактировать</Button>
                                        </td>
                                    </tr>
                                    <Modal show={showModal} style={{ background: "rgba(0, 0, 0, 0.95)" }} >
                                        <EditService hideEditService={hideEditService} serialCode={service.Serial_code} />
                                    </Modal>

                                </tbody>
                            )}
                        </Table>
                    </Tab>

                </Tabs>

            </div>
        )
    }

}


export default Admin;