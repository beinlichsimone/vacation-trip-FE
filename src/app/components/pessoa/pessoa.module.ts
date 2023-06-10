import { NgModule } from "@angular/core";
import { PessoaComponent } from "./pessoa.component";
import { TableModule } from 'primeng/table';
import { CommonModule } from "@angular/common";

@NgModule({
    declarations:[PessoaComponent],
    imports: [CommonModule, TableModule],
    exports: [],    
})

export class PessoaModule{

}