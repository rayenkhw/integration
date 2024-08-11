import { User } from "./user.model";

export class Notification{
    id_notification: number;
    message: string;
    date: Date;
    user: User;
    
    }