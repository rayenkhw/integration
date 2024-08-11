import { User } from "./user.model";
import { Subject } from "./subject.model";
import { ImageModel } from "./imagemodel.model";
export class Resource{
    
    id_resource: number;
    title: string;
  //  specialty: string;
    status: string;
    upload: User;
    approve: User;
    subject: Subject;
    resourceImages: ImageModel[];
    
    }