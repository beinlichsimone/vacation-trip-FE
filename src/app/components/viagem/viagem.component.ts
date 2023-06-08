import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { fromEvent, merge, Observable } from 'rxjs';
import { DisplayMessage, GenericValidator, ValidationMessages } from '../../validations/generic-form-validation';
import { ViagemDTO } from './viagem-dto';
import { ViagemService } from './viagem.service';

@Component({
  selector: 'app-viagem',
  templateUrl: './viagem.component.html',
  styleUrls: ['./viagem.component.scss']
})
export class ViagemComponent implements OnInit {

  //ViewChildren obter uma coleção de itens do meu formulário
  @ViewChildren(FormControlName, { read: ElementRef}) formInputElements: ElementRef[];

  formGroupCadastro: FormGroup;
  viagem: ViagemDTO;
  formResult: string = '';
  MASKS = MASKS;
  viagemId;  
  

  @Output() aoSalvar = new EventEmitter<any>();

/*   nome: string = 'Nome Viagem';
  descricao: string = 'Descrição Viagem'; */

  constructor(private formBuilder: FormBuilder, private viagemService: ViagemService, private route: ActivatedRoute) { 
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
    this.route.params.subscribe(params => this.viagemId = params['id']);
  }

// Com forma avançada de validação de formulário
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  ngOnInit() {
    this.formGroupCadastro = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: [''],
      dataIda: [''],
      dataVolta: [''],
      cpf: ['', [Validators.required, NgBrazilValidators.cpf]], // só para testar o validator
      email: ['', Validators.email], // só para testar o validator
      //senha: ['', [CustomValidators.rangeLength([6, 9]), Validators.required]]
    });
    

    this.viagemService.obterViagem(this.viagemId)
    .subscribe(
      viagemRetorno => {
        this.viagem = viagemRetorno;
      },
      error => console.log(error)
    );

    console.log(this.viagem);
  }

  ngAfterViewInit(): void { // interface chamada logo após a página ter sido carregada no browser
    let controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
    
    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.formGroupCadastro) // três pontinhos se chama spread significa espalhar, ou seja, este operador é usado para 'espalhar' os elementos de um array quando interpretado em tempo de execução. Ou seja, vai executar aquilo para todos os itens da coleção.
    }) 
  }

// Com forma fácil de validação
/*   ngOnInit() {
    this.formGroupCadastro = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: [''],
      cpf: ['', [Validators.required, NgBrazilValidators.cpf]], // só para testar o validator
      email: ['', Validators.email], // só para testar o validator
      senha: ['', CustomValidators.rangeLength([6, 9])]
    });
  } */

  salvar(){
    if(this.formGroupCadastro.dirty && this.formGroupCadastro.valid){
      console.log(this.formGroupCadastro.value);
      this.viagem = Object.assign({}, this.viagem, this.formGroupCadastro.value)

      this.viagemService.atualizarViagem(this.viagem)
      .subscribe(
        viagemRetorno => {
          this.viagem = viagemRetorno;
        },
        error => console.log(error)
      );

    } else {
      this.formResult = "Não Salvou!"
    }
    //const valorEmitir = {nome: this.nome, descricao: this.descricao};
    //this.aoSalvar.emit(valorEmitir);

  }

}
