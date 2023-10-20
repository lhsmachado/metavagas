import { UserType } from "../entities/User";

interface UserFindByEmailResponse  {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: string | Date ;
    updatedAt: string | Date;
}

export { UserFindByEmailResponse }