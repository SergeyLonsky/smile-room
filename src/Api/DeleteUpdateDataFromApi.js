import { API } from './API';



export async function DeleteUser(Id) {

    await fetch(`${API.USERS.GET}/NotActive/${Id}`,
        { method: 'DELETE' }
    );
    window.location.reload(false);
}



export async function DeleteReview(Id) {

    await fetch(`${API.REVIEWS.GET}/delete/${Id}`,
        { method: 'DELETE' }
    );
    window.location.reload(false);
}

export async function ModerateReview(Id) {

    await fetch(`${API.REVIEWS.PUT}/moderate/${Id}`,
        { method: 'PUT' }
    );
    window.location.reload(false);
}

// Деактивируем запись после создания медицинского заключения
export async function DeactiveAppointment(Id) {

    await fetch(`${API.HOURS.DEACTIVE}/deactive/${Id}`, { method: 'DELETE' });
}

// удаляем активную запись
export async function DeleteAppointment(Id) {

    await fetch(`${API.HOURS.DELETE}/delete/${Id}`, { method: 'DELETE' });
}

export async function UpdateDataUserRemoveTurn(codeUser) {

    try {

        let user = {
            Day_date: null,
            Hour_day: null,
            Serial_codeHour: null
        }

        //await fetch(`${API.USERS.GET}/${codeUser}`, {
            await fetch(`${API.USERS.GET}/updateDayHour/${codeUser}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

    } catch (error) {
        console.log(error)
    }
}



export async function UpdateDataUserAddTurn(id, Doctor_Serial_Code, Service_SerialCode, userData) {

    try {

        let user = {
            Day_date: userData.Day_date,
            Hour_day: userData.Hour_day,
            Serial_codeHour: userData.Serial_codeHour,
            Doctor_Serial_Code : Doctor_Serial_Code,
            Service_SerialCode: Service_SerialCode
        }

        //await fetch(`${API.USERS.GET}/${id}`, {
        await fetch(`${API.USERS.GET}/addAppointment/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

    } catch (error) {
        console.log(error)
    }
}


// не используется
export async function ActiveHourInDataBase(codeHour) {

    fetch(`${API.HOURS.GET}/active/${codeHour}`, { method: 'PUT' });
}



export async function ActiveUserInDataBase(Id) {

    await fetch(`${API.USERS.GET}/active/${Id}`, { method: 'PUT' });
}


// не используется
export async function DeletePayFile(Id) {

    await fetch(`${API.MEDICAL_FILE.GET}/delete/${Id}`, { method: 'PATCH' });
}



export async function ForgetPasswordUpdate(Id, user) {

    try {

        await fetch(`${API.USERS.GET}/${Id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

    } catch (error) {
        console.log(error)
    }
}

export async function UpdateSerice(Id, data) {

    try {

        await fetch(`${API.SERVICES.PUT}/${Id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

    } catch (error) {
        console.log(error)
    }
}