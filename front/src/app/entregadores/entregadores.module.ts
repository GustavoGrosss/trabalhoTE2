import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {IonicModule} from '@ionic/angular';

import {EntregadoresPageRoutingModule} from './entregadores-routing.module';

import {EntregadorListaComponent} from './components/entregadores-lista/entregadores-lista.page';
import {EntregadoresCadastroComponent} from './components/entregadores-cadastro/entregadores-cadastro.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        IonicModule,
        EntregadoresPageRoutingModule,
        HttpClientModule,
    ],
    declarations: [EntregadorListaComponent, EntregadoresCadastroComponent]
})
export class EntregadorPageModule {
}
