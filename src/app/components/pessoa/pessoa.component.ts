import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { NgBrazilValidators } from 'ng-brazil';
import { Observable, fromEvent, merge, takeUntil, Subject } from 'rxjs';
import { ValidationMessages, GenericValidator, DisplayMessage } from 'src/app/validations/generic-form-validation';
import { Pessoa } from './pessoa';
import { Toolbar } from "primeng/toolbar"; 
import { Table } from "primeng/table"; 
import { Toast } from "primeng/toast"; 
import { Panel }from 'primeng/panel'
import { PessoaService } from './pessoa.service';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PessoaFormComponent } from './pessoa-form/pessoa-form.component';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.scss']
})
export class PessoaComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef}) formInputElements: ElementRef[];

  public gridData: Pessoa[];
  @ViewChild("pessoaTable", { static: false })
  public table: Table; 
  public toolbar: Toolbar; 
  public toast: Toast; 
  public panel: Panel;  
  public gridColumns: any[];
  private unsubscribe = new Subject<void>;  

  constructor(
    public dialogService: DialogService,
    private pessoaService: PessoaService,
    private router: Router,
  ) {}

  ngOnInit(): void {

    this.gridColumns = this.getGridColumns();
    this.updateGrid();
  }

  getGridColumns(): any[] {
    const gridColumns = [
      { field: "id", header: "Id" },
      { field: "nome", header: "Nome" },
      { field: "cpf", header: "CPF" }
    ];

    return gridColumns;
  }

  private updateGrid(){
    this.pessoaService.obterPessoas()
    .pipe(takeUntil(this.unsubscribe))
    .subscribe({
      next: (pessoasRetorno) => 
      {
        this.gridData = pessoasRetorno;
      },
      error: (erro) =>
      { 
        console.log(erro)
      },
      complete: () => console.log('Observer got a complete notification')
    });  
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ref: DynamicDialogRef;

  openNew(): void {

    this.ref = this.dialogService.open(PessoaFormComponent, {
      header: "Cadastro de Pessoa",
      width: "70%",
      contentStyle: { "max-height": "500px", overflow: "auto" },
      baseZIndex: 10000,
  });
  }

}
