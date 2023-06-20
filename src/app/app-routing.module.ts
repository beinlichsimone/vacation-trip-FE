import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoaFormComponent } from './components/pessoa/pessoa-form/pessoa-form.component';
import { PessoaComponent } from './components/pessoa/pessoa.component';
import { HomeComponent } from './navegacao/home/home.component';

const rootRouterConfig: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'pessoa', component: PessoaComponent},
  { path: 'pessoa-form', component: PessoaFormComponent},
  { path: 'viagens', loadChildren: () => import('./components/viagem.module').then(m => m.ViagemModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(rootRouterConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
