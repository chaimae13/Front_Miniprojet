export type UserProfileToken ={
    accessToken:string
  
}
export type User ={
    firstName:string;
    lastName: string;
    birthDate:Date;
    city:     string;
    country:  string;
    avatar:   string;
    company:  string;
    jobPosition: string;
    mobile:   string;
    username: string;
    email:    string;
    password: string;
    role:     UserRoles;
}

export enum UserRoles {
    admin = 0,
    user = 1,
    }