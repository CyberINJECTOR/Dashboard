export interface IUser {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    password: string;
    profileDescription: string;
    created_at: string;
    updated_at; string;
    urlImg: string;
    company: string;
    city: string;
}

export class User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    password: string;
    profileDescription: string;
    created_at: string;
    updated_at; string;
    urlImg: string;
    company: string;
    city: string;

    constructor(newUser: any) {
            this.id = (newUser[0].id) ? newUser[0].id : null ;
            this.name =  (newUser[0].name ? newUser[0].name : null) ;
            this.email = (newUser[0].email ? newUser[0].email : null) ;
            this.email_verified_at = (newUser[0].email_verified_at) ? newUser[0].email_verified_at : null;
            this.password = (newUser[0].password) ? newUser[0].password : null;
            this.profileDescription = newUser[0].profileDescription ;
            this.created_at = (newUser[0].created_at) ? newUser[0].created_at : null;
            this.updated_at = (newUser[0].updated_at) ? newUser[0].created_at : null;
            this.urlImg = (newUser[0].urlImg) ? newUser[0].urlImg : null;
            this.company = (newUser[0].company) ? newUser[0].company : null;
            this.city = (newUser[0].city) ? newUser[0].city : null;
    }
}

export class UserUpdate {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    password: string;
    profileDescription: string;
    created_at: string;
    updated_at; string;
    urlImg: string;
    company: string;
    city: string;

    constructor(newUser: any) {
        this.id = (newUser.id) ? newUser.id : null ;
        this.name =  (newUser.name ? newUser.name : null) ;
        this.email = (newUser.email ? newUser.email : null) ;
        this.email_verified_at = (newUser.email_verified_at) ? newUser.email_verified_at : null;
        this.password = (newUser.password) ? newUser.password : null;
        this.profileDescription = newUser.profileDescription ;
        this.created_at = (newUser.created_at) ? newUser.created_at : null;
        this.updated_at = (newUser.updated_at) ? newUser.created_at : null;
        this.urlImg = (newUser.urlImg) ? newUser.urlImg : null;
        this.company = (newUser.company) ? newUser.company : null;
        this.city = (newUser.city) ? newUser.city : null;
    }
}