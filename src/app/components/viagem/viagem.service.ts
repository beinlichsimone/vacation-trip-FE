import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Viagem, Content } from "./viagem";
import { Observable } from "rxjs";
import { ViagemDTO } from "./viagem-dto";

@Injectable()
export class ViagemService{

constructor(private http: HttpClient){}

    protected UrlServiceV1: string = "http://localhost:8081/viagem/viagens";

    obterViagens() : Observable<Viagem> {
        return this.http.get<Viagem>(this.UrlServiceV1);
    }

    obterViagem(viagemId: string) : Observable<Content> {
        this.UrlServiceV1 = "http://localhost:8081/viagem/" + viagemId;
        return this.http.get<Content>(this.UrlServiceV1);
    }

    atualizarViagem(viagem: ViagemDTO) : Observable<Content> {
        this.UrlServiceV1 = "http://localhost:8081/viagem/" + viagem.id;
        return this.http.put<Content>(this.UrlServiceV1, viagem);
    }

}