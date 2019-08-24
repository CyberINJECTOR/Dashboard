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
        this.id = newUser[0].id;
        this.name =  newUser[0].name ;
        this.email = newUser[0].email ;
        this.email_verified_at = newUser[0].email_verified_at ;
        this.password = newUser[0].password;
        this.profileDescription = newUser[0].profileDescription ;
        this.created_at = newUser[0].created_at;
        this.updated_at = newUser[0].updated_at;
        this.urlImg = newUser[0].urlImg;
        this.company = newUser[0].company;
        this.city = newUser[0].city;
    }

    // constructor( rawJson: any) {
    //     Object.assign(this, rawJson);
    // }
}
