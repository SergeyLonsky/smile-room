import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { Button, Form, Modal } from 'react-bootstrap';
import '../css/profile.css'
import { UpdateSerice } from '../Api/DeleteUpdateDataFromApi'

function EditService(props) {

    const [Service_Name, setService_Name] = useState('');
    const [Description, setDescriprion] = useState('');
    const [Cost, setCost] = useState('');    

    useEffect(() => {

        let data = JSON.parse(sessionStorage.getItem("serviceData"));
                //show use date- when i update user date i show all value in input and choise what i need update
        setService_Name(data.Service_Name);
        setDescriprion(data.Description);
        setCost(data.Cost);
    }, [])


    // check all input value
    const checkInput = async () => {

        //let check = checkIfUrlLinkFile(File_user)

        //if (textDoctor == '' || priceSevice == '' || isNaN(priceSevice) || check == false) {
        if (Service_Name == '' || Description == '' || Cost == '') {

            Swal.fire({
                icon: 'warning',
                text: 'Необходимо запонлить все поля !',
                toast: true,
                position: 'top-end'
            })

            return;
        }

        else {

            editService()
        }
    }

    // add mew medical file to user Id , save in data base
    const editService = async () => {


        let service = {
            Service_Name: Service_Name,
            Description: Description,
            Cost : Cost,
        };

        await UpdateSerice(props.serialCode, service)        

        Swal.fire({
            title: 'success',
            icon: 'success',
            toast: true,
            position: 'top-end'
        }).then((result) => {

            if (result.isConfirmed) {
                sessionStorage.removeItem('serviceData');
                window.location.reload(false);
            }
        })
    }

    return (


        <div>

            <Modal.Header>
                <Modal.Title><h1>Вы редактируете услугу : {Service_Name}</h1></Modal.Title>
            </Modal.Header>

            <div className='inputMedicalDate'>


                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Название услуги"
                        value={Service_Name}
                        onChange={(event) => setService_Name(event.target.value)}
                        autoFocus
                    />
                </Form.Group>


                <Form.Group className="mb-3">
                    <Form.Control                        
                        as="textarea" rows={3}
                        placeholder="Описание услуги"
                        value={Description}
                        onChange={(event) => setDescriprion(event.target.value)}
                    />
                </Form.Group>


                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Стоимость услуги"
                        value={Cost}
                        onChange={(event) => setCost(event.target.value)}
                    />
                </Form.Group>

                <div className='styleButtonPosition'>
                    <Button variant="success" onClick={checkInput}>Сохранить</Button>
                    <Button variant="secondary" onClick={props.hideEditService}>Закрыть</Button>
                </div>

            </div>
        </div>
    );

}


export default EditService