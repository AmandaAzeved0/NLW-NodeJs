import {Entity, PrimaryColumn, Column, CreateDateColumn, JoinColumn, ManyToOne} from "typeorm"
import {v4 as uuid} from "uuid" 
import { Tag } from "./Tag"
import { User } from "./User"


@Entity("compliments")
class Compliment{
    @PrimaryColumn()
    readonly id : string

    @Column()
    user_sender: string
    @JoinColumn({name: "user_sender"})
    //muitos elogios feitos por um mesmo usuário
    @ManyToOne(()=>User)
    userSender: User

    @Column()
    user_receiver: string
    @JoinColumn({name: "user_receiver"})
    //muitos elogios recebidos em um mesmo usuário
    @ManyToOne(()=>User)
    userReceiver: User

    @Column()
    tag_id: string
    @JoinColumn({name: "tag_id"})
    //muitos elogios com a mesma tag
    @ManyToOne(()=>Tag)
    tag:Tag

    @Column()
    message: string

    @CreateDateColumn()
    created_at : Date

    @CreateDateColumn()
    updated_at : Date

    constructor(){
        if (!this.id){
            this.id = uuid()
        }
    }
}
export {Compliment}