import { API } from './API';



// ALL REVIEWS THIS CLINIC

export async function LoadReviews() {

    let res = await fetch(API.REVIEWS.GET, { method: 'GET' });
    let data = await res.json();
    return data;
}



// ADOUT THIS CLINIC COUNT DETAILS

export async function LoadCountDoctors() {

    let res = await fetch(`${API.USERS.GET}/countDoctors`, { method: 'GET' });
    let data = await res.json();
    console.log(data.Count_Doctors);
    return data.Count_Doctors;
}


export async function LoadCountUsers() {

    let res = await fetch(`${API.USERS.GET}/countUsers`, { method: 'GET' });
    let data = await res.json();
    console.log(data.Count_Users);
    return data.Count_Users;
}


export async function LoadCountReviews() {

    let res = await fetch(`${API.REVIEWS.GET}/countReviews`, { method: 'GET' });
    let data = await res.json();
    return data.Count_Reviews;
}



// ADMIN WORK

export async function LoadAllUsers() {

    let res = await fetch(`${API.USERS.GET}`, { method: 'GET' });
    let data = await res.json();
    return data;
}


export async function LoadAllUsersBlocked(type) {

    let res = await fetch(`${API.USERS.GET}/BlockUsers/${type}`, { method: 'GET' });
    let data = await res.json();
    return data;
}


export async function LoadAllDoctors() {

    let res = await fetch(`${API.USERS.GET}/showDoctors`, { method: 'GET' });
    let data = await res.json();
    return data;
}


export async function LoadAllReviews() {

    let res = await fetch(API.REVIEWS.GET, { method: 'GET' });
    let data = await res.json();
    return data;
}

export async function LoadAllNewReviews() {

    let res = await fetch(`${API.REVIEWS.GET}/new`, { method: 'GET' });
    let data = await res.json();
    return data;
}




// USER DATA

export async function LoadMedicalFileUser(code) {

    let res = await fetch(`${API.MEDICAL_FILE.GET}/user/${code}`, { method: 'GET' });
    let data = await res.json();
    return data;
}


export async function showAllMyReview(code) {

    let res = await fetch(`${API.REVIEWS.GET}/${code}`, { method: 'GET' });
    let data = await res.json();
    return data;;
}


export async function LoadMedicalFileUserIsNotActive(code) {

    let res = await fetch(`${API.MEDICAL_FILE.GET}/showHistoryFiles/${code}`, { method: 'GET' });
    let data = await res.json();
    return data;;
}



// DOCTOR WORK

export async function LoadUsersActive_queues(Doctor_SerialCode) {

    //let res = await fetch(`${API.USERS.GET}/showTurnUsers`, { method: 'GET' });
    let res = await fetch(`${API.USERS.GET}/users_Active_queues/${Doctor_SerialCode}`, { method: 'GET' });
    //users_Active_queues

    let data = await res.json();
    return data;
}


export async function LoadMedicalFileAllUsers(Doctor_SerialCode) {

    //let res = await fetch(`${API.MEDICAL_FILE.GET}/showHowNeedPay`, { method: 'GET' });

    let res = await fetch(`${API.MEDICAL_FILE.GET}/doctor/${Doctor_SerialCode}`, { method: 'GET' });

    let data = await res.json();
    return data;
}



// APPOINTMENT

export async function LoadDays() { // 1

    let res = await fetch(API.DAYS.GET, { method: 'GET' });
    let data = await res.json();
    return data;
}

//SERVICES
export async function LoadServices() { // 1

    let res = await fetch(API.SERVICES.GET, { method: 'GET' });
    let data = await res.json();
    return data;
}