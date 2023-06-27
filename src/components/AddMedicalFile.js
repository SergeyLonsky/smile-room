import React, { useState } from 'react'
import '../css/PayService.css'
import Swal from 'sweetalert2'
import { Button, Form, Modal } from 'react-bootstrap';
import '../css/profile.css'
import { DoctorAddMedicalFileUser } from '../Api/ConnectOrAddFromApi'
import { UpdateDataUserRemoveTurn, DeactiveAppointment } from '../Api/DeleteUpdateDataFromApi'



//here component Add Medical File User , doctor add a file to user,and user can see how much pay need and see what doctor write and docoment = this component use in profile doctor
function AddMedicalFileUser(props) {

    const [File_user, setFile_user] = useState('');
    const [textDoctor, setTextDoctor] = useState('');
    const [priceSevice, setPriceSevice] = useState('');

    let date = JSON.parse(sessionStorage.getItem("userDateMedical"));

    if(priceSevice == '')
        setPriceSevice(date.Cost);

    // check if File_user was url link image
    // const checkIfUrlLinkFile = urlString => {
    //     var urlPattern = new RegExp('(jpg|jpeg|png|webp|avif|gif|svg)')
    //     return !!urlPattern.test(urlString);
    // }

    // check all input value
    const checkInput = async () => {

        //let check = checkIfUrlLinkFile(File_user)

        //if (textDoctor == '' || priceSevice == '' || isNaN(priceSevice) || check == false) {
        if (textDoctor == '') {

            Swal.fire({
                icon: 'warning',
                text: 'Необходимо добавить заключение врача !',
                toast: true,
                position: 'top-end'
            })

            return;
        }

        else {

            addMedicalFileUser()
        }
    }

    // add mew medical file to user Id , save in data base
    const addMedicalFileUser = async () => {

        //let d = new Date();

        let File = {
            Publish_by: date.User_code,
            Date_published: props.codeDate, //`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
            File_user: File_user,
            textDoctor: textDoctor,
            priceSevice: priceSevice,
            Appointment_SerialCode: props.codeHour
        };

        await DoctorAddMedicalFileUser(File);

        await DeactiveAppointment(props.codeHour);

        await UpdateDataUserRemoveTurn(date.User_code);

        Swal.fire({
            title: 'Успешно',
            icon: 'success',
            toast: true,
            position: 'top-end'
        }).then((result) => {

            if (result.isConfirmed) {
                sessionStorage.removeItem('userDateMedical');
                window.location.reload(false);
            }
        })
    }

    return (


        <div>

            <Modal.Header>
                <Modal.Title><h1>Медицинское заключение : {date.FirstName}</h1></Modal.Title>
            </Modal.Header>

            <div className='inputMedicalDate'>


                <Form.Group className="mb-3">
                    <Form.Control
                        as="textarea" rows={3}
                        placeholder="Заключение врача"
                        value={textDoctor}
                        onChange={(event) => setTextDoctor(event.target.value)}
                        autoFocus
                    />
                </Form.Group>


                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Оплата"
                        value={priceSevice}
                        onChange={(event) => setPriceSevice(event.target.value)}
                    />
                </Form.Group>


                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Ссылка на файл медицинского заключения"
                        value={File_user}
                        onChange={(event) => setFile_user(event.target.value)}
                    />
                </Form.Group>

                <div className='styleButtonPosition'>
                    <Button variant="success" onClick={checkInput}>Сохранить</Button>
                    <Button variant="secondary" onClick={props.hideModelMedicalFile}>Закрыть</Button>
                </div>


            </div>
        </div>
    );

}


export default AddMedicalFileUser