import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'restaurante',
        pathMatch: 'full'
    },
    {
        path: 'folder/:id',
        loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
    },
    {
        path: 'entregador',
        loadChildren: () => import('./entregadores/entregadores.module').then(m => m.EntregadorPageModule)
    },
    {
        path: 'prato',
        loadChildren: () => import('./pratos/pratos.module').then(m => m.PratosPageModule)
    },
    {
        path: 'restaurante',
        loadChildren: () => import('./restaurantes/restaurantes.module').then(m => m.RestaurantesPageModule)
    },
    {
        path: 'pratos/editar',
        loadChildren: () => import('./pratos/pratos.module').then(m => m.PratosPageModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
