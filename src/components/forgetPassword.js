import React, { useState } from 'react'
import { API } from '../Api/API';
import { Button, Modal, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'
import '../css/forgetPassword.css'
import { ForgetPasswordUpdate } from '../Api/DeleteUpdateDataFromApi'



//here component forget Paswword use in sign In component
function ForgetPaswword() {

    const history = useHistory()

    const [showNewNewPassword, setShowNewPassword] = useState(false);
    const handleShowNewPassword = () => setShowNewPassword(true);

    const [Email, setEmail] = useState('');

    const [User_password, setUser_password] = useState('');
    const [Confirm_password, setConfirm_password] = useState('');


    //create a this sessioStorgae in ForgetUser
    let userForget = JSON.parse(sessionStorage.getItem("userForgetPassword"));

    let storedTheme = localStorage.getItem("theme");



    //here we search if we have this email in data bse , if have we send the data use from data base to sessionStorage
    const ForgetUser = async () => {

        if (Email < 1) {
            Swal.fire({
                text: 'Введите ваш Email ',
                icon: 'warning',
                toast: true,
                position: 'top-end'
            })
        }

        else {

            try {

                let user =
                {
                    Email: Email
                };

                let res = await fetch(API.USERS.FORGET, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                });

                let data = await res.json();


                if (storedTheme === "dark") {

                    Swal.fire({
                        title: `${data.FirstName} Мы нашли Вас. Введите новый пароль :)`,
                        icon: 'info',
                        toast: true,
                        position: 'top-end',
                    }).then((result) => {

                        if (result.isConfirmed) {

                            sessionStorage.setItem("userForgetPassword", JSON.stringify(data));
                            handleShowNewPassword() // show pop up change password
                        }
                    })
                }

                if (storedTheme === "light") {

                    Swal.fire({
                        title: `${data.FirstName} Мы нашли Вас. Введите новый пароль :)`,
                        icon: 'info',
                        background: '#373E44',
                        color: '#ffffffab',
                        toast: true,
                        position: 'top-end'
                    }).then((result) => {

                        if (result.isConfirmed) {

                            sessionStorage.setItem("userForgetPassword", JSON.stringify(data));

                            handleShowNewPassword() // show pop up change password
                        }
                    })
                }


            } catch (error) {
                console.log(error);
            }
        }
    }



    // check value input a new password
    const checkValueInput = () => {

        if (User_password == '' || Confirm_password == '') {

            if (storedTheme === "dark") {

                Swal.fire({
                    text: 'Новый пароль!',
                    icon: 'error',
                    toast: true,
                    position: 'top-end'
                })

                return;
            }

            if (storedTheme === "light") {

                Swal.fire({
                    text: 'Новый пароль!',
                    icon: 'error',
                    toast: true,
                    background: '#373E44',
                    position: 'top-end'
                })
                return;
            }

        }


        if (User_password === Confirm_password) {

            ForgetPassword();
        }

        else {

            if (storedTheme === "dark") {

                Swal.fire({
                    text: 'Пароли не совпадат!',
                    icon: 'error',
                    toast: true,
                    position: 'top-end'
                })
            }

            if (storedTheme === "light") {

                Swal.fire({
                    text: 'Пароли не совпадат!',
                    icon: 'error',
                    background: '#373E44',
                    toast: true,
                    position: 'top-end'
                })
            }
        }

    }



    //here update to new password 
    const ForgetPassword = async () => {

        let user = {
            User_password: User_password,
            ConfirmPassword: Confirm_password
        }

        await ForgetPasswordUpdate(userForget._id, user);


        if (storedTheme === "dark") {

            Swal.fire({
                icon: 'success',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                toast: true,
            })

            sessionStorage.clear('userForgetPassword');
            window.location.reload(false);
        }

        if (storedTheme === "light") {

            Swal.fire({
                icon: 'success',
                background: '#373E44',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                toast: true,
            })

            sessionStorage.clear('userForgetPassword');
            window.location.reload(false);
        }
    }




    //if you click not save new password
    const closeForgetPassword = async () => {

        if (storedTheme === "dark") {

            Swal.fire({
                title: 'Вы действительно не хотите поменять пароль?',
                icon: 'question',
                showDenyButton: true,
                confirmButtonText: 'yes',
                denyButtonText: `no`,
                toast: true,
                position: 'top-end'
            }).then((result) => {

                if (result.isConfirmed) {

                    sessionStorage.clear('userForgetPassword');
                    window.location.reload(false);
                }
            })
        }

        if (storedTheme === "light") {

            Swal.fire({
                title: 'Вы действительно не хотите поменять пароль?',
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

                    sessionStorage.clear('userForgetPassword');
                    window.location.reload(false);
                }
            })
        }
    }



    return (

        <>
            <div className='enterEmail'>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="email"
                        placeholder="введите ваш Email"
                        value={Email}
                        onChange={(event) => setEmail(event.target.value)}
                        autoFocus
                    />

                    <div className='startChangePassword'>
                        <Button variant="warning" onClick={ForgetUser}>Ok</Button>
                        <Button variant="danger" onClick={closeForgetPassword}>Закрыть</Button>
                    </div>

                </Form.Group>
            </div>



            <div className='inputChangePasswort'>
                <Modal show={showNewNewPassword} style={{ background: "rgba(0, 0, 0, 0.9)" }}>

                    <Modal.Header>
                        <Modal.Title><h1>Введите новый пароль :</h1></Modal.Title>
                    </Modal.Header>


                    <Form.Group className="mb-3">
                        <Form.Control
                            type="password"
                            placeholder="enter new password"
                            value={User_password}
                            onChange={(event) => setUser_password(event.target.value)}
                            autoFocus
                        />
                    </Form.Group>


                    <Form.Group className="mb-3">
                        <Form.Control
                            type="password"
                            placeholder="confirm password"
                            value={Confirm_password}
                            onChange={(event) => setConfirm_password(event.target.value)}
                        />
                    </Form.Group>


                    <Modal.Footer>

                        <Button variant="primary" onClick={checkValueInput}>
                            Save Changes
                        </Button>

                        <Button variant="secondary" onClick={closeForgetPassword}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>
        </>


    )
}


export default ForgetPaswword;