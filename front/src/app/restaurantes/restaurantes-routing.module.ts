import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RestaurantesCadastroComponent} from './components/restaurantes-cadastro/restaurantes-cadastro.component';

import {RestauranteListaComponent} from './components/restaurantes-lista/restaurantes-lista.page';

const routes: Routes = [
    {
        path: '',
        component: RestauranteListaComponent
    },
    {
        path: 'cadastrar',
        component: RestaurantesCadastroComponent
    },
    {
        path: 'editar/:id',
        component: RestaurantesCadastroComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RestaurantesPageRoutingModule {
}
