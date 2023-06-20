import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Pessoa } from "./pessoa";

@Injectable()
export class PessoaService{

    constructor(private http: HttpClient){}

    obterPessoas() : Observable<Pessoa[]> {
        return this.http.get<Pessoa[]>("http://localhost:8081/pessoa/pessoas");
    }

}