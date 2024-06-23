import {Component, OnInit} from '@angular/core';
import {AlertController, ToastController, ViewDidLeave, ViewWillEnter, ViewWillLeave,} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {RestaurantesInterface} from "../../../interfaces";

@Component({
    selector: 'app-restaurantes',
    templateUrl: './restaurantes-lista.page.html',
    styleUrls: ['./restaurantes-lista.page.scss'],
})
export class RestauranteListaComponent
    implements OnInit, ViewWillEnter, ViewDidLeave, ViewWillLeave, ViewDidLeave {
    restaurantes: RestaurantesInterface[] = [];

    constructor(
        private alertController: AlertController,
        private toastController: ToastController,
        private httpClient: HttpClient,
    ) {
    }

    ionViewWillEnter() {
        this.listar();
    }

    ionViewDidEnter() {
    }

    ionViewWillLeave() {
    }

    ionViewDidLeave() {
    }

    ngOnInit() {
        this.listar();
    }

    listar() {
        const lista = this.httpClient.get<any[]>('http://localhost:3000/restaurantes');

        lista.subscribe(
            (dados) => {
                this.restaurantes = dados;
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

    confirmarExclusao(restaurante: RestaurantesInterface) {
        this.alertController
            .create({
                header: 'Confirmação de exclusão',
                message: `Deseja excluir o restaurante ${restaurante.nome}?`,
                buttons: [
                    {
                        text: 'Sim',
                        handler: () => this.excluir(restaurante),
                    },
                    {
                        text: 'Não',
                    },
                ],
            })
            .then((alerta) => alerta.present());
    }

    private excluir(restaurante: RestaurantesInterface) {
        if (restaurante.id) {
            this.httpClient.delete(`http://localhost:3000/restaurantes/${restaurante.id}`).subscribe(
                () => this.listar(),
                (erro) => {
                    this.toastController
                        .create({
                            message: `Erro na exclusão: ${erro.message}`,
                            duration: 5000,
                            keyboardClose: true,
                            color: 'danger',
                        })
                        .then((t) => t.present());
                }
            );
        }
    }
}
