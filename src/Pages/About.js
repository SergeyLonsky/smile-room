import React, { useState, useEffect } from 'react'
import '../css/About.css'
import Swal from 'sweetalert2'
import date1 from '../Json_date/date.json'
import { LoadCountDoctors, LoadCountUsers, LoadCountReviews } from '../Api/LoadDataFromApi'


//show about clinic info
function About() {


    const [ShowCountDoctor, SetShowCountDoctor] = useState([]);
    const [ShowCountUsers, SetShowCountUsers] = useState([]);
    const [ShowCountReviews, SetShowCountReviews] = useState([]);
    const [ShowCountServiceOurWork, SetShowCountServiceOurWork] = useState('');

    let storedTheme = localStorage.getItem("theme");



    // load data from LoadDataFromApi component
    const LoadCountDetailsFromApi = async () => {

        SetShowCountDoctor(await LoadCountDoctors())
        SetShowCountUsers(await LoadCountUsers())
        SetShowCountReviews(await LoadCountReviews())
    }



    //long(count) service our work , from fle Json date1.work
    const LoadCountServiceOurWork = async () => {

        let longeur = date1.work.length;

        SetShowCountServiceOurWork(longeur)
    }




    useEffect(() => {

        LoadCountDetailsFromApi()
        LoadCountServiceOurWork();

        Swal.fire({
            background: 'none',
            showConfirmButton: false,
            timer: 1000,
            html: '<div class="loader"></div>'
        })
    }, [])




    if (storedTheme === "dark") {

        return (

            <>
                <div className='titleAbout'>
                    <h1>О клинике SmileRoom</h1>
                    <br />
                    <p>(1) Это клиника №1 в Гродно.</p>
                    <p>(2) Мы обеспечиваем отличное обслуживание клиентов, а также хорошее отношение к нашим клиентам.</p>
                    <p>(3) Мы занимаемся всеми областями, связанными с уходом за зубами. Узнайте больше о наших услугах. - <a href='/OurWork'>Перейти</a>.</p>
                    <p>(4) Мы расположены в центре города - <a href='/Location'>Посмотреть</a>.</p>
                    <p>(5) Отзывы клиентов - <a href='/Service'>Прочитать</a>.</p>

                </div>


                <div className='cardsInfoAbout' >

                    <div className="a-box">
                        <div className="img">
                            <div className="img-inner">
                                <div className="inner-skew">
                                    <img src={require("../images/12.png")} alt="icon" />
                                </div>
                            </div>
                        </div>
                        <div className="text">
                            <h3>Наши врачи :</h3>
                            <div>
                                <p>{ShowCountDoctor}</p>
                            </div>
                        </div>
                    </div>


                    <div className="a-box" >
                        <div className="img">
                            <div className="img-inner">
                                <div className="inner-skew">
                                    <img src={require("../images/ourworkservice.png")} alt="icon" />
                                </div>
                            </div>
                        </div>
                        <div className="text">
                            <h3>Наши услуги :</h3>
                            <div>
                                <p>{ShowCountServiceOurWork}</p>
                            </div>
                        </div>
                    </div>


                    <div className="a-box">
                        <div className="img">
                            <div className="img-inner">
                                <div className="inner-skew">
                                    <img src={require("../images/users.png")} alt="icon" />
                                </div>
                            </div>
                        </div>
                        <div className="text">
                            <h3>Наши пациенты :</h3>
                            <div>
                                <p>{ShowCountUsers}</p>
                            </div>
                        </div>
                    </div>


                    <div className="a-box" >
                        <div className="img">
                            <div className="img-inner">
                                <div className="inner-skew">
                                    <img src={require("../images/reviewuser.png")} alt="icon" />
                                </div>
                            </div>
                        </div>
                        <div className="text">
                            <h3>Отзывы пациентов :</h3>
                            <div>
                                <p>{ShowCountReviews}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        )
    }




    if (storedTheme === "light") {

        return (

            <>
                <div className='titleAboutDark'>
                    <h1>О клинике SmileRoom</h1>
                    <br />
                    <p>(1) Это клиника №1 в Гродно.</p>
                    <p>(2) Мы обеспечиваем отличное обслуживание клиентов, а также хорошее отношение к нашим клиентам.</p>
                    <p>(3) Мы занимаемся всеми областями, связанными с уходом за зубами. Узнайте больше о наших услугах. - <a href='/OurWork'>Перейти</a>.</p>
                    <p>(4) Мы расположены в центре города - <a href='/Location'>Посмотреть</a>.</p>
                    <p>(5) Отзывы клиентов - <a href='/Service'>Прочитать</a>.</p>
                </div>


                <div className='cardsInfoAbout' >

                    <div className="a-box">
                        <div className="img">
                            <div className="img-inner">
                                <div className="inner-skew">
                                    <img src={require("../images/12.png")} alt="icon" />
                                </div>
                            </div>
                        </div>
                        <div className="textDark">
                            <h3>Наши врачи :</h3>
                            <div>
                                <p>{ShowCountDoctor}</p>
                            </div>
                        </div>
                    </div>


                    <div className="a-box" >
                        <div className="img">
                            <div className="img-inner">
                                <div className="inner-skew">
                                    <img src={require("../images/ourworkservice.png")} alt="icon" />
                                </div>
                            </div>
                        </div>
                        <div className="textDark">
                            <h3>Наши услуги :</h3>
                            <div>
                                <p>{ShowCountServiceOurWork}</p>
                            </div>
                        </div>
                    </div>


                    <div className="a-box">
                        <div className="img">
                            <div className="img-inner">
                                <div className="inner-skew">
                                    <img src={require("../images/users.png")} alt="icon" />
                                </div>
                            </div>
                        </div>
                        <div className="textDark">
                            <h3>Наши пацинты :</h3>
                            <div>
                                <p>{ShowCountUsers}</p>
                            </div>
                        </div>
                    </div>



                    <div className="a-box" >
                        <div className="img">
                            <div className="img-inner">
                                <div className="inner-skew">
                                    <img src={require("../images/reviewuser.png")} alt="icon" />
                                </div>
                            </div>
                        </div>
                        <div className="textDark">
                            <h3>Отзывы пагиентов :</h3>
                            <div>
                                <p>{ShowCountReviews}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        )
    }

}

export default About;