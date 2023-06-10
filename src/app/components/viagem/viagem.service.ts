import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Viagem, Content } from "./viagem";
import { Observable } from "rxjs";
import { ViagemDTO } from "./viagem-dto";

@Injectable()
export class ViagemService{

constructor(private http: HttpClient){}

    obterViagens() : Observable<Viagem> {
        return this.http.get<Viagem>("http://localhost:8081/viagem/viagens");
    }

    obterViagem(viagemId: string) : Observable<Content> {
        return this.http.get<Content>("http://localhost:8081/viagem/" + viagemId);
    }

    atualizarViagem(viagem: ViagemDTO) : Observable<Content> {
        return this.http.put<Content>("http://localhost:8081/viagem/" + viagem.id, viagem);
    }

}