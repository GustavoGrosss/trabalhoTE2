import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    public appPages = [
        { title: 'Restaurantes', url: '/restaurante', icon: 'restaurant' },
        { title: 'Pratos', url: '/prato', icon: 'fast-food' },
        { title: 'Entregadores', url: '/entregador', icon: 'person-circle' },
    ];

    constructor() {
    }
}
