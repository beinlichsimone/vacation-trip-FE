import { Component, OnInit } from '@angular/core';
import { Content, Viagem } from '../viagem/viagem';
import { ViagemService } from '../viagem/viagem.service';

@Component({
  selector: 'app-relatorio-viagem',
  templateUrl: './relatorio-viagem.component.html',
  styleUrls: ['./relatorio-viagem.component.scss']
})
export class RelatorioViagemComponent implements OnInit {

  constructor(private viagemService: ViagemService) { }

  public viagens: Content[];

  ngOnInit(): void {
    this.viagemService.obterViagens()
      .subscribe(
        viagensRetorno => {
          this.viagens = viagensRetorno.content;
        },
        error => console.log(error)
      );

  }

}
