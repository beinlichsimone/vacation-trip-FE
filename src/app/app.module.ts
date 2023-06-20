import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from './app.component';
import { HomeComponent } from './navegacao/home/home.component';
import { MenuComponent } from './navegacao/menu/menu.component';
import { FooterComponent } from './navegacao/footer/footer.component';
import { APP_BASE_HREF } from '@angular/common';
import { ViagemService } from './components/viagem/viagem.service';

import { CustomFormsModule } from 'ng2-validation'
import { AppRoutingModule } from './app-routing.module';
import { ViagemModule } from './components/viagem.module';
import { PessoaModule } from './components/pessoa/pessoa.module';

@NgModule({
  declarations: [AppComponent,HomeComponent,MenuComponent,FooterComponent],
  imports: [BrowserModule,BrowserAnimationsModule,FormsModule,HttpClientModule,ReactiveFormsModule,ViagemModule,CustomFormsModule,AppRoutingModule, PessoaModule],
  providers: [ViagemService,{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
