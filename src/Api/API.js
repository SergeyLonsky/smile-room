import { Config } from "./config";


//here we take all function from Node Js use config import

export const API = {

    USERS: {

        GET: `${Config.API.BASE}/api/users`,
        FORGET: `${Config.API.BASE}/api/users/findUser`,
        ADD: `${Config.API.BASE}/api/users/add`,
        LOGIN: `${Config.API.BASE}/api/users/login`,
        PUT: `${Config.API.BASE}/api/users`,
    },

    REVIEWS: {

        GET: `${Config.API.BASE}/api/reviews`,
        ADD: `${Config.API.BASE}/api/reviews`,
        PUT: `${Config.API.BASE}/api/reviews`,
    },

    HOURS: {

        GET: `${Config.API.BASE}/api/hours`,
        DELETE: `${Config.API.BASE}/api/hours/delete`,
        DEACTIVE: `${Config.API.BASE}/api/hours/deactive`,
    },

    DAYS: {

        GET: `${Config.API.BASE}/api/days`,
    },

    MEDICAL_FILE: {

        GET: `${Config.API.BASE}/api/medicalFile`,
        ADD: `${Config.API.BASE}/api/medicalFile/add`
    },

    SERVICES: {

        GET: `${Config.API.BASE}/api/services`,
        PUT: `${Config.API.BASE}/api/services/update`,
        // ADD: `${Config.API.BASE}/api/medicalFile/add`
    }
}