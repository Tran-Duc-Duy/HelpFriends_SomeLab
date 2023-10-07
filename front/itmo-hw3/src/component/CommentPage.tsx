import React, {Component, ReactNode} from "react";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import { Services } from "./Services";
import "./CommentPage.scss"

interface ServerData{
    author:string;
    comment:string;
}

interface CommentStates{
    name:ServerData[];
    author:string;
    comment:string;
}


export class CommentPage extends Component <{},CommentStates> {
    constructor(props:any) {
        super(props);
        this.state = {name: [], author: "", comment: ""}
    }

    async componentDidMount():Promise<void>{
        new Services().getComments().then((res)=>{this.setState({name:(res)})}).catch(err=>{console.error(err)})
        setInterval(() => {
            new Services().getComments().then((res)=>{this.setState({name:(res)})}).catch(err=>{console.error(err)})
          }, 5000)
        }
        


    public render(): ReactNode {
        let res = this.state.name.map(function(item) {
            return <ul  className={"comment-item"}>
               <li className="list-01">{item.author}</li>
               <li className="list-02">{item.comment}</li>
               </ul>
         });
        return (<>
            <span style={{textAlign:"center"}}><h1>Comment System</h1></span>
            <div className="div-comments-page" >

                <div className="comment-form">
                    <TextField label="Имя"
                    margin="normal"
                    value={this.state.author}
                    onChange={(event)=>this.onChangeName(event.target.value)}/>
                    <TextField
                    label="Комментарий"
                    variant="outlined" placeholder="Введите комментарий. . ." multiline rows={5} rowsMax={10}
                    margin="normal"
                    value={this.state.comment}
                    onChange={(event)=>this.onChangeComment(event.target.value)}/>
                    <Button onClick={()=> {this.handleSubmit()}}
                    color="inherit">Отправить комментарий</Button>
                </div>
                <div className={"comment-box"}>
                    <h2>Комментарии:</h2>
                    <div className={"comment"}>
                    {res}
                    </div>
                </div>
            </div>
            </>
        )
    }
    //валидация поля Имя, устанавливаем в поле Имя значение, введённое пользователем
    private onChangeName(value:string){
        this.setState({author:value})
    }
    //валидация поля Имя, устанавливаем в поле Имя значение, введённое пользователем
    private onChangeComment(value:string){
        this.setState({comment:value})
    }
    //для валидации поля Имя
    private validateName(name:string){
        if(name.length>0 && name.length<=300){
            return true
        }
        else {
            return false
        }
       
    }
    //для валидации поля Комментарий
    private validateComment(comment:string){
        return (comment.length>0 && comment.length<=1000)
    }
    //сообщение об ошибке при валидации
    handleSubmit() {
        if(this.validateName(this.state.author) === false){
            console.log("NOT Validated")
            alert("Поле Имя не должно быть пустым и не превышать 300 символов")
        }
        if(this.validateComment(this.state.comment)===false){
            console.log("NOT Validated")
            alert("Поле Комменатрий не должно быть пустым и не превышать 1000 символов")
        }
        else
        { 
            this.postRequest()
            this.setState({author:"",comment:""})
        }

    }
    async postRequest(){
        await axios.post("http://localhost:8080/addComment", {author: this.state.author, comment: this.state.comment}).then(res=>console.log(res))
    }
}
