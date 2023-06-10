import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RelatorioViagemComponent } from "./relatorio-viagem/relatorio-viagem.component";
import { ViagemComponent } from "./viagem/viagem.component";

const viagemRouterConfig: Routes = [
    { path: '', redirectTo: '/relatorio', pathMatch: 'full'}, 
    { path: 'relatorio', component: RelatorioViagemComponent},     
    { path: 'viagem/:id', component: ViagemComponent}
]

@NgModule({
    imports: [RouterModule.forChild(viagemRouterConfig)],
    exports: [RouterModule]
  })
  export class ViagemRoutingModule { }