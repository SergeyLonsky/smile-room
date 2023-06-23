import React, { useState, useEffect} from 'react'
import moment from 'moment'
import { API } from '../Api/API';
import { Button, Row, Modal, Table } from 'react-bootstrap';
import '../css/appointment.css'
import Swal from 'sweetalert2'
import { LoadDays, LoadAllDoctors, LoadServices } from '../Api/LoadDataFromApi'
import { UpdateDataUserAddTurn, UpdateDataUserRemoveTurn, DeleteAppointment } from '../Api/DeleteUpdateDataFromApi'



//here component we show data from data base (if you click to buttom in Home Page Book an appointment)
function Appointment() {

    const [Days, SetDays] = useState(null)
    const [Hours, setHours] = useState([])
    const [Doctors, SetDoctors] = useState([])
    const [Services, SetServices] = useState([])

    //const nodemailer = require('nodemailer')

    //show a pop up day and hour
    const [showResults, setShowResults] = React.useState(false)
    const onClick = () => setShowResults(true)

    const [doctorId, SetDoctorID] = useState(0);
    const [serviceId, SetServiceID] = useState(0);
      
    const onChangeAppointmentDate = ({ target }) => {
            if(target.value != '')
            {
                var selectedDate = new Date(target.value);
                var day = selectedDate.getDay();
                if([6,0].includes(day))
                {
                    //e.preventDefault();
                    target.value='';
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        html: 'К сожалению, в этот день клиника не работает! <br/> Выберите другой день <br/>',
                        toast: true,
                        position: 'top-end'
                    })
                }
                else if (selectedDate < Date.now())
                {
                    target.value='';
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        html: 'Вы не можете записаться на прием в этот день! <br/> Выберите другой день <br/>',
                        toast: true,
                        position: 'top-end'
                    })
                }
                else
                {
                    let appointmentDate = moment(target.value).format('DD.MM.YYYY');
                    LoadDateHours(appointmentDate);
                }
            }
        };

   // all data what we save in local storage and seesion storge
    let storedTheme = localStorage.getItem("theme");

    let userData = JSON.parse(sessionStorage.getItem("user"));

    let userDataCode = JSON.parse(sessionStorage.getItem("userCode"));

    const SendMail = async () => {
        
        let data = {
            service_id: 'service_8ggst21',
            template_id: 'template_o8rv47a',
            user_id: 'ofg4T1HMQhGmcc-Z0',
            template_params: {
                'to_name': userData.FirstName,
                'from_name' : 'SmileRoom',
                'message' : 'Вы записана на прием ' + userData.Day_date + ' в ' + userData.Hour_day,
                'to_email' : userData.Email
            }
        };

        let res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });        
    }

    //here you show Hours from day what we chiose , from data base 
    // const LoadHours = async (Serial_code, Day_date) => {

    //     let res = await fetch(`${API.HOURS.GET}/${Serial_code}`, { method: 'GET' });
    //     let data = await res.json();

    //     setHours(data);

    //     let dataDay = { Day_date }

    //     userData.Day_date = Day_date

    //     sessionStorage.setItem("user", JSON.stringify(userData))

    //     //sessionStorage.setItem("day", JSON.stringify(dataDay))//1

    //     ResultsHours()
    // }

    const LoadHours = async (Date, Doctor_SerialCode) => {

        let selData = {
            Day_Date: Date,
            Doctor_SerialCode: Doctor_SerialCode
        }
        //let res = await fetch(`${API.HOURS.GET}/date`, { method: 'GET' });
        let res = await fetch(`${API.HOURS.GET}/date`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(selData)
        });
        let data = await res.json();

        setHours(data);
    }

    const LoadDateHours = async (Date) => {

        SetDays(Date);
        if(doctorId != 0)
        {
            await LoadHours(Date, doctorId);
            ResultsHours()
        }
    }


    const onChangeAppointmentDoctor = async ({target}) => {
        let index = target.selectedIndex;
        let doctor = Doctors[index];
        SetDoctorID(doctor.User_code); // Doctor_SerialCode;
        if(doctor != null && Days != null)
        {
            await LoadHours(Days, doctor.User_code);
            ResultsHours()
        }
    }

    const onChangeAppointmentService = async ({target}) => {
        let index = target.selectedIndex;
        let service = Services[index];
        SetServiceID(service.Serial_code); // Service_SerialCode;
    }



    //show (jsx) return we see in pup up hours - and click to hour we save what day we chiose and hour to data base
    const ResultsHours = () => (

        onClick(),

        <div className='chioseDayAndDay'>

            <h6>Выберите время, пожалуйста :</h6>

            <div id="results" className="search-results">

                <Row xs={2} md={4} lg={4} className="g-4">

                    {Hours.map(hour =>

                        <div key={hour.Serial_code}>
                            <p href='#'
                                style={{ textDdecoration: "none" }}
                                onClick={() => saveDateUser(hour.Hour_day, hour.Serial_code)}>{hour.Hour_day}
                            </p>
                        </div>
                    )}
                </Row>
            </div>
        </div>

    )

    // save to user date , hour and day what he chiose
    const saveDateUser = async (Hour_day, Serial_code) => {

        userData.Day_date = Days
        userData.Hour_day = Hour_day
        userData.Serial_codeHour = Serial_code

        sessionStorage.setItem("user", JSON.stringify(userData))


        //await UpdateDataUserAddTurn(userDataCode.User_code, userData, dayLocal.Day_date, hourLocal.Hour_day, hourLocal.Serial_code);
        await SendMail();
        await UpdateDataUserAddTurn(userDataCode.User_code, doctorId, serviceId, userData);
        


        if (storedTheme === "dark") {

            await Swal.fire({
                title: 'Ваша запись потдтверждена',
                icon: 'success',
                showConfirmButton: false,
                timer: 1200,
            })
            // await sessionStorage.clear();
            window.location.reload(false);
        }


        if (storedTheme === "light") {

            await Swal.fire({
                title: 'Ваша запись потдтверждена',
                icon: 'success',
                background: '#373E44',
                color: '#ffffffab',
                buttonColor: '#E96E00',
                showConfirmButton: false,
                timer: 1200,
            })
            // await sessionStorage.clear();
            window.location.reload(false);
        }
    }

    //update user date after active hour to NULL day hour and serial code hour
    const reactiveAppointment = async () => {

        DeleteAppointment(userData.Serial_codeHour)
        await UpdateDataUserRemoveTurn(userData.User_code);

        userData.Day_date = null;
        userData.Hour_day = null;
        userData.Serial_codeHour = null;

        sessionStorage.setItem("user", JSON.stringify(userData));
        //window.location.reload(false);
    }

    const LoadCountDetailsFromApi = async () => {
        if(doctorId == 0)
        {
            SetDoctors(await LoadAllDoctors())
            if(Doctors.length > 0)
                SetDoctorID(Doctors[0].User_code);
        }
        if(serviceId == 0)
        {
            SetServices(await LoadServices());
            if(Services.length > 0)
                SetServiceID(Services[0].Serial_code);
        }
    }


    //here we to do check if user have a hour he dont can chiose a new hour and day , he need to delete data what he was
    useEffect(() => {
        
        if (storedTheme === "dark" && userData.Day_date != null) {

            Swal.fire({
                title: 'Вы уже записаны на прием, изменить время записи?',
                icon: 'question',
                showDenyButton: true,
                confirmButtonText: 'yes',
                denyButtonText: `no`,
                background: '#373E44',
                color: '#ffffffab',
                toast: true,
                showDenyButton: true,
                position: 'top-end'
            }).then((result) => {

                if (result.isConfirmed) {
                    reactiveAppointment();

                    //window.location.reload(false);
                }
                else if (result.isDenied) {
                    window.location.reload(false);
                  }
            })
        }

        if (storedTheme === "light" && userData.Day_date != null) {

            Swal.fire({
                title: 'Вы уже записаны на прием, изменить время записи?',
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
                    reactiveAppointment();
                    //window.location.reload(false);
                }
                else if (result.isDenied) {
                    window.location.reload(false);
                  }
            })
        }

        if (userData.Day_date == null) {
            //LoadCountDetailsFromApi();
            //LoadDataAppointmentFromApi();
        }

        if (userData.UserType_code == 2) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Вы доктор (Вы не можете записаться на прием) !',
            }).then((result) => {

                if (result.isConfirmed) {
                    window.location.reload(false);
                }
            })
        }

        if (userData.UserType_code == 3) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Вы Админ (Вы не можете записаться на прием) !',
            }).then((result) => {

                if (result.isConfirmed) {
                    window.location.reload(false);
                }
            })
        }

    }, [])


    LoadCountDetailsFromApi();

    return (
        <div>
            <div className='modal_body'>
                <Table >
                    <tbody>
                        <tr>
                            <td style={{ textAlign: "center", fontSize: "13px", color:"white"  }}>Дата: </td>
                            <td style={{ textAlign: "left", fontSize: "13px", width: "80%" }}>
                                <input type="date" id="date" name="date" onChange={onChangeAppointmentDate}/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: "center", fontSize: "13px", color:"white"  }}>Доктор: </td>
                            <td style={{ textAlign: "left", fontSize: "13px", width: "80%"}}>
                                <select id='doctorsSelect' onChange={onChangeAppointmentDoctor}>
                                {
                                    Doctors.map(doctor =>
                                        <option id={doctor.Serial_code}>{doctor.FirstName}</option>
                                    )
                                }
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: "center", fontSize: "13px", color:"white" }}>Процедура: </td>
                            <td style={{ textAlign: "left", fontSize: "14px", width: "80%" }}>
                                <select id='servicesSelect' onChange={onChangeAppointmentService}>
                                {
                                    Services.map(service =>
                                        <option id={service.Serial_code}>{service.Service_Name}</option>
                                    )
                                }
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                
            </div>
            <Modal.Body>
                    {showResults ? <ResultsHours /> : null}
            </Modal.Body>
        </div>
    );
}


export default Appointment;