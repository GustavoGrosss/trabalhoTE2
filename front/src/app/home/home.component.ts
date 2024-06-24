import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EntregadoresInterface, PratosInterface} from "../interfaces";
import {ToastController} from "@ionic/angular";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    restaurantesCount: number = 0;
    entregadoresCount: number = 0;
    pratosCount: number = 0;

    constructor(
        private toastController: ToastController,
        private httpClient: HttpClient,
    ) { }

    ngOnInit() {
        const lista = this.httpClient.get<EntregadoresInterface[]>('http://localhost:3000/entregadores');

        lista.subscribe(
            (dados) => {
                this.entregadoresCount = dados.length;
            },
            (erro) => {
                this.toastController
                    .create({
                        message: `Erro ao listar: ${erro.message}`,
                        duration: 5000,
                        keyboardClose: true,
                        color: 'danger',
                    })
                    .then((t) => t.present());
            }
        );

        const listaPratos = this.httpClient.get<PratosInterface[]>('http://localhost:3000/pratos');

        listaPratos.subscribe(
            (dados) => {
                this.pratosCount = dados.length;
            },
            (erro) => {
                this.toastController
                    .create({
                        message: `Erro ao listar: ${erro.message}`,
                        duration: 5000,
                        keyboardClose: true,
                        color: 'danger',
                    })
                    .then((t) => t.present());
            }
        );

        const listaRestaurante = this.httpClient.get<any[]>('http://localhost:3000/restaurantes');

        listaRestaurante.subscribe(
            (dados) => {
                this.restaurantesCount = dados.length;
            },
            (erro) => {
                this.toastController
                    .create({
                        message: `Erro ao listar: ${erro.message}`,
                        duration: 5000,
                        keyboardClose: true,
                        color: 'danger',
                    })
                    .then((t) => t.present());
            }
        );
    }
}
