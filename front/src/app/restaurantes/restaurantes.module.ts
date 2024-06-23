import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {IonicModule} from '@ionic/angular';

import {RestaurantesPageRoutingModule} from './restaurantes-routing.module';

import {RestauranteListaComponent} from './components/restaurantes-lista/restaurantes-lista.page';
import {RestaurantesCadastroComponent} from './components/restaurantes-cadastro/restaurantes-cadastro.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        IonicModule,
        RestaurantesPageRoutingModule,
        HttpClientModule,
    ],
    declarations: [RestauranteListaComponent, RestaurantesCadastroComponent]
})
export class RestaurantesPageModule {
}
