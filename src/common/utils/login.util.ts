import { Injectable } from "@nestjs/common";
import { createHash } from "crypto";

@Injectable()
export class LoginUtil{

    constructor(){}
 
    encryptPassword(password:string):string{
        return createHash("sha256").update(password).digest("hex")
    }
    checkPassword(password:string,encryptedPassword:any):boolean{
        const currentPass = this.encryptPassword(password);
        if(currentPass ===  encryptedPassword){
            return true;
        }
        return false;
    }
}