import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './navegacao/home/home.component';
import { RelatorioViagemComponent } from './components/relatorio-viagem/relatorio-viagem.component';
import { ViagemComponent } from './components/viagem/viagem.component';

const rootRouterConfig: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'relatorio', component: RelatorioViagemComponent},
  { path: 'viagem/:id', component: ViagemComponent},
  //{ path: 'viagens', loadChildren: () => import('./components/viagem.module').then(m => m.ViagemModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(rootRouterConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
