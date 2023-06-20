import { NgModule } from "@angular/core";
import { PessoaComponent } from "./pessoa.component";
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { PanelModule }from 'primeng/panel'
import { CommonModule } from "@angular/common";
import { ButtonModule } from 'primeng/button';
import { PessoaService } from "./pessoa.service";
import { TextMaskModule } from "angular2-text-mask";
import { PessoaFormComponent } from "./pessoa-form/pessoa-form.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';

@NgModule({
    declarations:[PessoaComponent, PessoaFormComponent],
    imports: [DynamicDialogModule, CommonModule, TableModule, PanelModule, ToolbarModule, ToastModule, ButtonModule,  ReactiveFormsModule, FormsModule, TextMaskModule],
    providers: [PessoaService, DialogService],
    exports: [],    
    entryComponents: [PessoaFormComponent],
})

export class PessoaModule{

}