import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Button, Modal, Table } from 'react-bootstrap';
import '../css/profile.css';
import AddMedicalFileUser from '../components/AddMedicalFile';
import Swal from 'sweetalert2';
import { LoadUsersActive_queues, LoadMedicalFileAllUsers } from '../Api/LoadDataFromApi'


//here component Doctor we to do what doctor can do = this component use in profile
//take props doctor user code to show data doctor in profile doctor
function Doctor({ code_doctor }) {


    let storedTheme = localStorage.getItem("theme");


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [medical_File_All_users, SetMedical_File_All_users] = useState([]);

    const [usersActive_queues, SetUsersActive_queues] = useState([]);

    let ClientHowNeedPay = 1;
    let CountClient = 1;



    //update day and hour to null in user + active the hour to ather users can add , at end show popup Doctor send date Medical File to User
    const updateDayHour = async (User_code, FirstName, Email, Cost) => {

        let date =
        {
            User_code: User_code,
            FirstName: FirstName,
            Email: Email,
            Cost: Cost
        }

        sessionStorage.setItem("userDateMedical", JSON.stringify(date))

        //show popup send a file medical to user
        handleShow();
    }



    // load data for doctor from LoadDataFromApi component
    const LoadDataForDoctorFromApi = async () => {

        SetUsersActive_queues(await LoadUsersActive_queues(code_doctor.code))
        SetMedical_File_All_users(await LoadMedicalFileAllUsers(code_doctor.code))
    }


    const hideModelMedicalFile = () => {

        setShow(false);
    }


    useEffect(() => {

        LoadDataForDoctorFromApi()

        Swal.fire({
            background: 'none',
            showConfirmButton: false,
            timer: 2100,
            html: '<img src="https://i.postimg.cc/pLT9cd9Z/12.png" height="200"></img>'
        })
    }, [])




    if (storedTheme === "dark") {

        return (

            <div>
                <div className="bg-white">

                    <div className="profile">
                        <div className="profile-headerDoctor">
                            <div className="profile-header-cover"></div>

                            <div className="profile-header-content">
                                <div className="profile-header-info">
                                    <h4 className="m-t-10 m-b-5">Добро пожаловать, {code_doctor.name} </h4>
                                </div>
                            </div>
                        </div>
                    </div>


                    <Tabs id="controlled-tab-example" className="mb-3 tabsChiose " >

                        <Tab eventKey="Active queues (customers)" title="Записи на прием" className='ActiveQueues'>


                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                        <th style={{ width: "8%", textAlign: "center" }}>Имя пациента</th>
                                        <th style={{ width: "10%", textAlign: "center" }}>Email</th>
                                        <th style={{ width: "3%", textAlign: "center" }}>Дата</th>
                                        <th style={{ width: "3%", textAlign: "center" }}>Время</th>
                                        <th style={{ width: "18%", textAlign: "center" }}>Услуга</th>
                                    </tr>
                                </thead>

                                {usersActive_queues.map(user =>

                                    <tbody key={user.User_Code} className='viewDateUser'>
                                        <tr>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{CountClient++}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.FirstName}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.Email}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.Day_date}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.Hour_day}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.Service_Name}</td>
                                            <td style={{ width: "7%" }} ><Button size="sm" variant="success" onClick={() => updateDayHour(user.User_Code, user.FirstName, user.Email, user.Cost)}>Медицинское заключение</Button></td>
                                        </tr>

                                        <Modal show={show} style={{ background: "rgba(0, 0, 0, 0.95)" }} >

                                            <AddMedicalFileUser hideModelMedicalFile={hideModelMedicalFile} codeHour={user.Serial_codeHour} userCode={user.User_Code} codeDate={user.Day_date}/>

                                        </Modal>
                                    </tbody>
                                )}
                            </Table>

                        </Tab>


                        <Tab eventKey="Who should pay" title="История приемов" className='shouldPay'>


                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                        <th style={{ width: "8%", textAlign: "center" }}>Имя пациента</th>
                                        <th style={{ width: "4%", textAlign: "center" }}>Email</th>
                                        <th style={{ width: "5%", textAlign: "center" }}>Дата визита</th>
                                        <th style={{ width: "25%", textAlign: "center" }}>Результат осмотра</th>
                                        <th style={{ width: "4%", textAlign: "center" }}>Оплата</th>
                                        <th style={{ width: "0.3%", textAlign: "center" }}>Файл</th>
                                    </tr>
                                </thead>

                                {medical_File_All_users.map(user =>

                                    <tbody key={user.Serial_code} className='viewDateUser'>
                                        <tr>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{ClientHowNeedPay++}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.FirstName}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.Email}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.Date_published}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.textDoctor}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.priceSevice} руб.</td>
                                            <td ><Button size="sm" variant="secondary" onClick={() => window.location = user.File_user}>файл</Button></td>
                                        </tr>
                                    </tbody>
                                )}
                            </Table>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }



    if (storedTheme == "light") {


        return (
            <div>


                <div>

                    <div className="profile">
                        <div className="profile-headerDoctor">
                            <div className="profile-header-cover"></div>

                            <div className="profile-header-content">

                                <div className="profile-header-info">
                                    <h4 className="m-t-10 m-b-5">Добро пожаловать, {code_doctor.name} </h4>
                                </div>
                            </div>
                        </div>
                    </div>


                    <Tabs id="controlled-tab-example" className="mb-3 tabsChioseDark " >


                        <Tab eventKey="Active queues (customers)" title="Записи на прием" className='ActiveQueues'>


                            <Table striped bordered hover variant="dark" size="sm">
                                <thead>
                                    <tr>
                                        <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                        <th style={{ width: "8%", textAlign: "center" }}>Имя клиета</th>
                                        <th style={{ width: "10%", textAlign: "center" }}>Email</th>
                                        <th style={{ width: "3%", textAlign: "center" }}>Дата</th>
                                        <th style={{ width: "3%", textAlign: "center" }}>Время</th>
                                        <th style={{ width: "18%", textAlign: "center" }}>Услуга</th>

                                    </tr>
                                </thead>

                                {usersActive_queues.map(user =>

                                    <tbody key={user.User_Code} className='viewDateUser'>
                                        <tr>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{CountClient++}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.FirstName}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.Email}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.Day_date}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.Hour_day}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.Service_Name}</td>
                                            <td style={{ width: "7%" }} ><Button size="sm" variant="success" onClick={() => updateDayHour(user.User_Code, user.FirstName, user.Email, user.Cost)}>Медицинское заключение</Button></td>
                                        </tr>

                                        <Modal show={show} style={{ background: "rgba(0, 0, 0, 0.95)" }} >

                                            <AddMedicalFileUser hideModelMedicalFile={hideModelMedicalFile} codeHour={user.Serial_codeHour} userCode={user.User_Code} codeDate={user.Day_date} />

                                        </Modal>
                                    </tbody>
                                )}
                            </Table>

                        </Tab>


                        <Tab eventKey="Who should pay" title="История приемов" className='shouldPay'>
                            <Table striped bordered hover variant="dark" size="sm">
                                <thead>
                                    <tr>
                                    <th style={{ width: "1%", textAlign: "center" }}>#</th>
                                        <th style={{ width: "8%", textAlign: "center" }}>Имя пациента</th>
                                        <th style={{ width: "4%", textAlign: "center" }}>Email</th>
                                        <th style={{ width: "5%", textAlign: "center" }}>Дата визита</th>
                                        <th style={{ width: "25%", textAlign: "center" }}>Результат осмотра</th>
                                        <th style={{ width: "4%", textAlign: "center" }}>Оплата</th>
                                    </tr>
                                </thead>

                                {medical_File_All_users.map(user =>

                                    <tbody key={user.Serial_code} className='viewDateUser'>
                                        <tr>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{ClientHowNeedPay++}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.FirstName}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.Email}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.Date_published}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.textDoctor}</td>
                                            <td style={{ textAlign: "center", fontSize: "14px" }}>{user.priceSevice} руб.</td>
                                            <td style={{ textAlign: "center", fontSize: "14px", width: "1%" }}>
                                                <Button href={user.File_user} size="sm" variant="secondary">Файл</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                    )}
                            </Table>

                        </Tab>

                    </Tabs>

                </div>

            </div>
        )
    }

}



export default Doctor;