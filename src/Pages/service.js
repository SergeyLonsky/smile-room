import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Row, Button, Form, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import '../css/service.css'
import Swal from 'sweetalert2'
import { LoadReviews } from '../Api/LoadDataFromApi'
import { AddNewReviews, AddNewLikeReviews } from '../Api/ConnectOrAddFromApi'



//here we show Reviews and like and add them
function Service() {


    const [showAddReviews, setShowAddReviews] = useState(false);
    const handleCloseAddReviews = () => setShowAddReviews(false);
    const handleShowAddReviews = () => setShowAddReviews(true);

    const [textReviews, setTextReviews] = useState('');
    const [reviews, SetReviews] = useState([])

    let userData = JSON.parse(sessionStorage.getItem("user"));
    let storedTheme = localStorage.getItem("theme");



    // load data from LoadDataFromApi component
    const LoadReviewsFromApi = async () => {

        SetReviews(await LoadReviews());
    }



    //check if user connect , if yes ew can add new review
    const CheckUserConnected = () => {

        if (userData == null && storedTheme === "dark") {

            Swal.fire({
                icon: 'warning',
                title: 'Вход/Регистрация',
                html: 'Вам нужно авторизироваться или зарегистрироваться, чтобы добавть отзыв',
                toast: true,
                position: 'top-end',
            })
            return;
        }

        if (userData == null && storedTheme === "light") {

            Swal.fire({
                icon: 'warning',
                title: 'Вход/Регистрация',
                html: 'Вам нужно авторизироваться или зарегистрироваться, чтобы добавть отзыв',
                toast: true,
                position: 'top-end',
                background: '#373E44',
                color: '#ffffffab',
                buttonColor: '#E96E00'
            })

            return;
        }

        if (userData != null) {
            handleShowAddReviews();
        }
    }




    //add review to data base
    const addReviews = async () => {

        if (textReviews < 1) {

            Swal.fire({
                icon: 'error',
                title: 'Oops...отзыв не добавлен!',
                toast: true,
                position: 'top-end'
            })
            return;
        }


        else {

            let Publish_by = userData.User_code;
            //let FirstName = userData.FirstName;
            //let User_Login = userData.User_Login;

            let d = Date.now();

            let user = {
                textReviews,
                DatePublished: moment(d).format('DD.MM.YYYY'), // `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`,
                Publish_by,
            };

            await AddNewReviews(user);


            if (storedTheme === "dark") {

                await Swal.fire({
                    title: 'Отзыв будет добавлен после модерирования администратором',
                    icon: 'success',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                })
                window.location.reload(false);
            }

            if (storedTheme === "light") {

                await Swal.fire({
                    title: 'Отзыв будет добавлен после модерирования администратором',
                    icon: 'success',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    background: '#373E44',
                    color: '#ffffffab'
                })
                window.location.reload(false);
            }
        }
    }




    //add likes to review what user chiose
    const addReviewsLike = async (Count, Serial_code) => {

        if (userData != null) {

            let like = {
                Serial_code: Serial_code,
                Count_Likes:Count+1
            };

            await AddNewLikeReviews(like);
            window.location.reload(false);
        }

        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...Пожалуйста, подключитесь, и вы можете добавить лайк (:',
                toast: true,
                position: 'top-end'
            })
            return;
        }

    }




    //here we show pop up ui/ux when load this page
    useEffect(() => {

        Swal.fire({
            title: '<img src="https://media3.giphy.com/media/lMl2tZmYHhrJHvY4rP/200w.gif?cid=82a1493bv5vympwzpd0gt9did8lb8r9vlei1poc0gx1gw4zx&rid=200w.gif&ct=s" height="170"></img>',
            background: 'none',
            showConfirmButton: false,
            timer: 1000,
        })

        LoadReviewsFromApi();
    }, [])





    if (storedTheme === "light") {

        return (

            <div>
                <div className='titleOurReviewDark'>
                    <h1>Отзывы о нашей клинике :</h1>
                </div>

                <div className="d-grid gap-2 addReviews" >
                    <button className="button-55Dark" role="button" onClick={CheckUserConnected}>Добавить новый отзыв</button>
                </div>


                <div>
                    <Modal show={showAddReviews} onHide={handleCloseAddReviews} style={{ background: "rgba(0, 0, 0, 0.8)" }}>
                        <Modal.Header className='titleHeater'>
                            <Modal.Title><h1>Здесь вы можете добавить новый отзыв :</h1></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1">
                                    <Form.Control as="textarea" rows={3}
                                        value={textReviews}
                                        onChange={(event) => setTextReviews(event.target.value)} />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>

                            <Button variant="success" onClick={addReviews}>
                                Добавить отзыв
                            </Button>

                            <Button variant="danger" onClick={handleCloseAddReviews}>
                                Закрыть
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>


                <div className='space'></div>

                <div className='OurReviews'>

                    <Row xs={1} md={2} lg={3} className="g-3">
                    {/* <Row className="row"> */}

                        {reviews.map((record) => (

                            <div key={record.Serial_code} className="testimonial-box-container">

                                <div className="testimonial-box">

                                    <div className="box-top">

                                        <div className="profileReviews">

                                            <div className="nameInfo-userInfo">
                                                <span>Имя : {record.FirstName}</span>

                                                <span>Логин : @{record.User_Login}</span>
                                            </div>
                                        </div>

                                        <div className="reviews">
                                            <p>{record.Date_published}</p>
                                        </div>
                                    </div>


                                    <div className="client-comment">
                                        <p>{record.textReviews}</p>
                                    </div>


                                    <div className='clickLike'>
                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Like👍🏼</Tooltip>}>

                                            <button className="button-30" role="button"
                                                onClick={() => addReviewsLike(record.Count_Likes, record.Serial_code)}>
                                                <i className="far fa-thumbs-up"></i> {record.Count_Likes}
                                            </button>

                                        </OverlayTrigger>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Row>
                </div>
            </div>
        );
    }



    else {

        return (
            <div>
                <div className='titleOurReview'>
                    <h1>Отзывы о нашей клинике :</h1>
                </div>

                <div className="d-grid gap-2 addReviews">
                    <button className="button-55" role="button" onClick={CheckUserConnected}>Добавить новый отзыв</button>
                </div>


                <div>
                    <Modal show={showAddReviews} onHide={handleCloseAddReviews} style={{ background: "rgba(0, 0, 0, 0.8)" }}>
                        <Modal.Header className='titleHeater'>
                            <Modal.Title ><h1>Здесь вы можете добавить новый отзыв :</h1></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1">
                                    <Form.Control as="textarea" rows={3}
                                        value={textReviews}
                                        onChange={(event) => setTextReviews(event.target.value)} />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>

                            <Button variant="success" onClick={addReviews}>
                                Добавить отзыв
                            </Button>

                            <Button variant="danger" onClick={handleCloseAddReviews}>
                                Закрыть
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>

                <div className='space'></div>



                <div className='OurReviews'>

                    <Row xs={1} md={2} lg={3} className="g-3">
                    {/* <div className="container"> */}
                        {reviews.map((record) => (

                            <div key={record.Serial_code} className="testimonial-box-container">

                                <div className="testimonial-box">

                                    <div className="box-top">

                                        <div className="profileReviews">

                                            <div className="nameInfo-userInfo">
                                                <span>Имя : {record.FirstName}</span>

                                                <span>Логин : @{record.User_Login}</span>
                                            </div>
                                        </div>

                                        <div className="reviews">
                                            <p>{record.Date_published}</p>
                                        </div>
                                    </div>


                                    <div className="client-comment">
                                        <p>{record.textReviews}</p>
                                    </div>


                                    <div className='clickLike'>
                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Like👍🏼</Tooltip>}>

                                            <button className="button-30" role="button"
                                                onClick={() => addReviewsLike(record.Count_Likes, record.Serial_code)}>
                                                <i className="far fa-thumbs-up"></i> {record.Count_Likes}
                                            </button>

                                        </OverlayTrigger>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Row>
                </div>
            </div>
        );
    }

}

export default Service;