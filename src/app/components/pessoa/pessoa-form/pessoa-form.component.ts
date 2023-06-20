import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { CustomValidators } from 'ng2-validation';
import { fromEvent, merge, Observable, Subject } from 'rxjs';
import { ValidationMessages, GenericValidator, DisplayMessage } from 'src/app/validations/generic-form-validation';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.scss']
})
export class PessoaFormComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef}) formInputElements: ElementRef[];
  @Output() aoSalvar = new EventEmitter<any>();

  // Com forma avançada de validação de formulário
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};
  formGroupCadastro: FormGroup;
  MASKS = MASKS;
  
  private unsubscribe = new Subject<void>;
  
  constructor(private formBuilder: FormBuilder, ) {
    this.validationMessages = {
      nome: {
        required: 'O nome é obrigatório'
      },
      cpf: {
        required: 'O CPF é obrigatório',
        cpf: 'CPF em formato inválido'
      },
      senha: {
        required: 'A senha é obrigatória',
        rangeLength: 'A senha deve possuir entre 6 e 9 caracteres'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);   
   }

  ngAfterViewInit(): void { // interface chamada logo após a página ter sido carregada no browser
    let controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.formGroupCadastro) // três pontinhos se chama spread significa espalhar, ou seja, este operador é usado para 'espalhar' os elementos de um array quando interpretado em tempo de execução. Ou seja, vai executar aquilo para todos os itens da coleção.
    }) 
  }

  ngOnInit(): void {

    this.formGroupCadastro = this.formBuilder.group({
      nome: ['', Validators.required],
      endereco: [''],
      dtNascimento: [''],
      telefone: ['', NgBrazilValidators.telefone],
      cpf: ['', [ NgBrazilValidators.cpf]], 
      email: [''], 
      senha: ['', [CustomValidators.rangeLength([6, 9]), Validators.required]]
    });
  }

  salvar(){

  }
}
