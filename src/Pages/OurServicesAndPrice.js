import React, { useState, useEffect } from 'react'
import date1 from '../Json_date/date.json'
import '../css/OurServicesAndPrice.css'
import { Card, Row, Col } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { LoadServices } from '../Api/LoadDataFromApi'



//show from jsom file a what to do in this clinic service

function OurServicesAndPrice() {


    let storedTheme = localStorage.getItem("theme");

    const [Services, SetServices] = useState([]);

    const LoadData = async () => {

        SetServices(await LoadServices());
    }


    useEffect(() => {

        LoadData();

        Swal.fire({
            background: 'none',
            showConfirmButton: false,
            timer: 1000,
            html: '<div class="loader"></div>'
        })
    }, [])




    if (storedTheme === "light") {

        return (
            <div>

                <div className='titleOurWorkDark'>
                    <h1>Наши услуги и цены :</h1>
                </div>

                <div className='OurWorkLook'>

                    <Row xs={1} md={2} className="g-4">
                        {Services.map((record) => (

                            <Col key={record.Serial_code}>
                                <Card style={{ marginTop: "10px", background: "#424242", borderRadius: "15px", padding: "3%" }}>
                                    {/* <Card.Img variant="top" src={record.path} /> */}
                                    <Card.Body style={{ color: "#ffffffab" }}>
                                        <Card.Title ><h3>{record.Service_Name} :</h3></Card.Title>
                                        <Card.Text>
                                            {record.Description}
                                        </Card.Text>
                                        <Card.Text><h3>Стоимость: {record.Cost} руб.</h3></Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        );
    }



    else {

        return (
            <div>

                <div className='titleOurWork'>
                    <h1>Наши услуги и цены :</h1>
                </div>

                <div className='OurWorkLook'>

                    <Row xs={1} md={2} className="g-4">
                        {Services.map((record) => (

                            <Col key={record.Serial_code}>
                                <Card style={{ marginTop: "10px", borderRadius: "15px", padding: "3%" }}>
                                    {/* <Card.Img variant="top" src={record.path} /> */}
                                    <Card.Body >
                                        <Card.Title ><h3>{record.Service_Name} :</h3></Card.Title>
                                        <Card.Text>
                                            {record.Description}
                                        </Card.Text>
                                        <Card.Text><h3>Стоимость: {record.Cost} руб.</h3></Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        );
    }

}

export default OurServicesAndPrice;