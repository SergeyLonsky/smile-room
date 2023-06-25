import { API } from './API';
import Swal from 'sweetalert2'



export async function connectUserLogin(user) {

    try {

        let res = await fetch(API.USERS.LOGIN, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        let data = await res.json();

        if (data == null) {

            Swal.fire({
                icon: 'warning',
                text: 'Sorry dont have This user in Data Base , Try Again',
                toast: true,
                position: 'top-end'
            })
            return;
        }
        else {
            sessionStorage.setItem("user", JSON.stringify(data));
            let userCode = { User_code: data.User_code };
            sessionStorage.setItem("userCode", JSON.stringify(userCode));
        }
    } catch (error) {
        console.log(error);
    }
}



export async function connectDemoUserShow() {

    try {

        let user =
        {
            User_Login: 'User',
            User_password: '123456'
        };

        let res = await fetch(API.USERS.LOGIN, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        let data = await res.json();

        sessionStorage.setItem("user", JSON.stringify(data));
        let userCode = { User_code: data.User_code };
        sessionStorage.setItem("userCode", JSON.stringify(userCode));

    } catch (error) {
        console.log(error);
    }
}



export async function connectDemoDoctorShow() {

    try {

        let user =
        {
            User_Login: 'demoDoctor',
            User_password: 'demodoctor'
        };

        let res = await fetch(API.USERS.LOGIN, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        let data = await res.json();

        sessionStorage.setItem("user", JSON.stringify(data)); // 1
        //let userCode = { User_code: data.User_code }// 2
        let userCode = { User_code: data.User_code };
        sessionStorage.setItem("userCode", JSON.stringify(userCode))// 3

    } catch (error) {
        console.log(error);
    }
}



export async function DoctorAddMedicalFileUser(file) {

    try {
        await fetch(API.MEDICAL_FILE.ADD, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(file)
        });


    } catch (error) {
        console.log(error);
    }
}



export async function AddNewReviews(user) {

    try {

        await fetch(`${API.REVIEWS.ADD}/add`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

    } catch (error) {
        console.log(error);
    }
}



export async function AddNewLikeReviews(like) {

    try {
        await fetch(`${API.REVIEWS.GET}/addLike`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(like)
        });

    } catch (error) {
        console.log(error)
    }
}



export async function AddNewUserRegester(user) {

    try {
        //console.log("AddNewUserRegister")
        await fetch(API.USERS.ADD, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });


    } catch (error) {
        console.log(error);
    }
}