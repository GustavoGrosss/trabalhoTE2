import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {IonicModule} from '@ionic/angular';

import {PratosPageRoutingModule} from './pratos-routing.module';

import {PratoListaComponent} from './components/pratos-lista/pratos-lista.page';
import {PratosCadastroComponent} from './components/pratos-cadastro/pratos-cadastro.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        IonicModule,
        PratosPageRoutingModule,
        HttpClientModule,
    ],
    declarations: [PratoListaComponent, PratosCadastroComponent]
})
export class PratosPageModule {
}
