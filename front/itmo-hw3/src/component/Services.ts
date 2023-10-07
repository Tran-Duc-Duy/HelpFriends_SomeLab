import axios from "axios"

interface ServerData{
    author:string;
    comment:string;
}

export class Services {
    public async getComments(): Promise<ServerData[]> {
        let res = await axios.get<ServerData[]>("http://localhost:8080/allComments");
        return res.data;
    }
}