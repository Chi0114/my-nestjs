import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("users")
export class Users{
    @PrimaryColumn()
    username:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @Column()
    nickname:string;

}