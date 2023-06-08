import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RelatorioViagemComponent } from "./relatorio-viagem/relatorio-viagem.component";
import { ViagemRoutingModule } from "./viagem.route";
import { ViagemComponent } from "./viagem/viagem.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { PessoaComponent } from './pessoa/pessoa.component';

@NgModule({
    declarations:[ViagemComponent, RelatorioViagemComponent, PessoaComponent], // componentes
    imports: [CommonModule, ViagemRoutingModule, ReactiveFormsModule, FormsModule, TextMaskModule], //modulos
    exports: [] //oq quer exportar
})
export class ViagemModule{

}