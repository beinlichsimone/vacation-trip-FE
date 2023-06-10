import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
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
  private unsubscribe = new Subject<void>;

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
}
  ngOnInit(): void {
    this.viagemService.obterViagens()
    .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (viagensRetorno) => 
        {
          this.viagens = viagensRetorno.content;
        },
        error: (erro) =>
        { 
          console.log(erro)
        },
        complete: () => console.log('Observer got a complete notification')
      }
    );
  }
}
