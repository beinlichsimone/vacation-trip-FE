import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { NgBrazilValidators } from 'ng-brazil';
import { Observable, fromEvent, merge } from 'rxjs';
import { ValidationMessages, GenericValidator, DisplayMessage } from 'src/app/validations/generic-form-validation';
import { Pessoa } from './pessoa';
/* import { Table } from "primeng/table"; */

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.scss']
})
export class PessoaComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef}) formInputElements: ElementRef[];

  public gridData: Pessoa[];
  @ViewChild("pessoaTable", { static: false })
/*   public table: Table; */
  
  formGroupCadastro: FormGroup;

  // Com forma avançada de validação de formulário
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(private formBuilder: FormBuilder) {
    this.validationMessages = {
      nome: {
        required: 'O nome é obrigatório'
      },
      cpf: {
        required: 'O CPF é obrigatório',
        cpf: 'CPF em formato inválido'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);    
   }

  ngOnInit(): void {
    this.formGroupCadastro = this.formBuilder.group({
      nome: ['', Validators.required],
      endereco: [''],
      dtNascimento: [''],
      telefone: ['', NgBrazilValidators.telefone],
      cpf: ['', [ NgBrazilValidators.cpf]], 
      email: [''], 
    });
  }

  ngAfterViewInit(): void { // interface chamada logo após a página ter sido carregada no browser
    let controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
    
    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.formGroupCadastro) // três pontinhos se chama spread significa espalhar, ou seja, este operador é usado para 'espalhar' os elementos de um array quando interpretado em tempo de execução. Ou seja, vai executar aquilo para todos os itens da coleção.
    }) 
  }

}
