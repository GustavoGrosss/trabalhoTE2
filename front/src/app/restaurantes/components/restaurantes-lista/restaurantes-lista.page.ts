import {Component, OnInit} from '@angular/core';
import {AlertController, ToastController, ViewDidLeave, ViewWillEnter, ViewWillLeave,} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {RestaurantesInterface} from "../../../interfaces";
import {StorageService} from "../../../storage.service";

@Component({
    selector: 'app-restaurantes',
    templateUrl: './restaurantes-lista.page.html',
    styleUrls: ['./restaurantes-lista.page.scss'],
})
export class RestauranteListaComponent
    implements OnInit, ViewWillEnter, ViewDidLeave, ViewWillLeave, ViewDidLeave {
    restaurantes: RestaurantesInterface[] = [];
    qtdRegistros: string | undefined;

    constructor(
        private alertController: AlertController,
        private toastController: ToastController,
        private httpClient: HttpClient,
        private storageService: StorageService,
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

        this.qtdRegistros = !!this.storageService.getItem('qtd') ? this.storageService.getItem('qtd') : 0;
    }

    listar() {
        const lista = this.httpClient.get<any[]>('http://localhost:3000/restaurantes');

        lista.subscribe(
            (dados) => {
                this.restaurantes = dados;
                this.storageService.setItem('qtd', this.restaurantes.length);
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
                            message: `Erro na exclusão, confira se o restaurante em questão não tem relação com nem um prato ou entregador: ${erro.message}`,
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
