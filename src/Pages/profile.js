import React from 'react'
import Admin from '../components/Admin'
import Doctor from '../components/Doctor'
import User from '../components/User'


// profile page , open profile page as per UserType_code from daya base , user-admin-doctor
function profile() {


    let userData = JSON.parse(sessionStorage.getItem("user"));


    //save in opject all data user from session storage "user" , and save code user from "userCode"
    //this opject for user compoment
    const obj = {
        //code: userData._id,
        code: userData.User_code,
        name: userData.FirstName,
        login: userData.User_Login,
        email: userData.Email,
        birthday: userData.Birthday,
        password: userData.User_password,
        confirm_password: userData.Confirm_password,
        day: userData.Day_date,
        hour: userData.Hour_day,
        codeHour: userData.Serial_codeHour
    }



    //user page

    if (userData.UserType_code == 1) {

        return (
            <User data_user={obj} />
        )
    }


    //doctor page

    if (userData.UserType_code == 2) {

        return (
            <Doctor code_doctor={obj} />
        )
    }


    //admin page

    if (userData.UserType_code == 3) {

        return (
            <Admin />
        )
    }


}


export default profile;