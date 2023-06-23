import React, { useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import '../css/loction.css'
import date1 from '../Json_date/date.json'
import Swal from 'sweetalert2'



//here we show loction the clinic , we use data from json file and show all data in this page

function Location() {


    let storedTheme = localStorage.getItem("theme");


    useEffect(() => {

        Swal.fire({
            background: 'none',
            showConfirmButton: false,
            timer: 700,
            html: '<div class="loader"></div>'
        })
    }, [])



    if (storedTheme === "light") {

        return (
            <div>
                <section className="bannerLoction">

                    <div className="boxLoctionDark  ">
                        <h3>Контакты :</h3>

                        {date1.Map.map((record) => (

                            <Card.Body key={record.id}>
                                <Card.Text>
                                    Город : {record.country} , {record.City}
                                </Card.Text>
                                <Card.Text>
                                    Адрес : {record.addressCity} , {record.adressNum}
                                </Card.Text>
                                <Card.Text>
                                    Email : anna@gmail.com
                                </Card.Text>
                                <Card.Text>
                                    Телефон : +375 29 1111111
                                </Card.Text>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d590.8104035463407!2d23.835522767329206!3d53.67831912282237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sby!4v1673177337663!5m2!1sru!2sby"
                                    width="100%" height="280" style={{ border: "0" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                                </iframe>

                            </Card.Body>
                        ))}
                    </div>

                    <div className="box contectDark">

                        <div className="logDark">
                            <h3>Время работы :</h3>
                            <br></br>

                            {date1.hours_work.map((record) => (

                                <div key={record.id}>
                                    <p>{record.day} : {record.time}</p>
                                </div>
                            ))}

                            <Card.Img variant="top" src={require("../images/1zx.png")} />
                            <br></br>
                        </div>
                    </div>
                </section>
            </div>
        );
    }



    else {

        return (
            <div>

                <section className="bannerLoction">

                    <div className="boxLoction  ">
                        <h3>Контакты :</h3>

                        {date1.Map.map((record) => (

                            <Card.Body key={record.id}>
                                <Card.Text>
                                    Город : {record.country} , {record.City}
                                </Card.Text>
                                <Card.Text>
                                    Адрес : {record.addressCity} , {record.adressNum}
                                </Card.Text>
                                <Card.Text>
                                    Email : anna@gmail.com
                                </Card.Text>
                                <Card.Text>
                                    Телефон : +375 29 1111111
                                </Card.Text>

                                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d590.8104035463407!2d23.835522767329206!3d53.67831912282237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sby!4v1673177337663!5m2!1sru!2sby"
                                    width="100%" height="280" style={{ border: "0" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                                </iframe>
                            </Card.Body>
                        ))}
                    </div>

                    <div className="box contect">

                        <div className="log">
                            <h3>Время работы :</h3>
                            <br></br>

                            {date1.hours_work.map((record) => (

                                <div key={record.id}>
                                    <p>{record.day} : {record.time}</p>
                                </div>
                            ))}

                            <Card.Img variant="top" src={require("../images/1zx.png")} />
                            <br></br>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

}

export default Location;