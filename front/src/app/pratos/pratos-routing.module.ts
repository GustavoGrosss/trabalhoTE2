import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PratosCadastroComponent} from './components/pratos-cadastro/pratos-cadastro.component';

import {PratoListaComponent} from './components/pratos-lista/pratos-lista.page';

const routes: Routes = [
    {
        path: '',
        component: PratoListaComponent
    },
    {
        path: 'cadastrar',
        component: PratosCadastroComponent
    },
    {
        path: 'editar/:id',
        component: PratosCadastroComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PratosPageRoutingModule {
}
