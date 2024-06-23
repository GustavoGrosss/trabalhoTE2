import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EntregadoresCadastroComponent} from './components/entregadores-cadastro/entregadores-cadastro.component';

import {EntregadorListaComponent} from './components/entregadores-lista/entregadores-lista.page';

const routes: Routes = [
    {
        path: '',
        component: EntregadorListaComponent
    },
    {
        path: 'cadastrar',
        component: EntregadoresCadastroComponent
    },
    {
        path: 'editar/:id',
        component: EntregadoresCadastroComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EntregadoresPageRoutingModule {
}
