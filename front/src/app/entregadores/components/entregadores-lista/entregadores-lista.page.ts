import {Component, OnInit} from '@angular/core';
import {AlertController, ToastController, ViewDidLeave, ViewWillEnter, ViewWillLeave,} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {EntregadoresInterface} from "../../../interfaces";

@Component({
    selector: 'app-entregadores',
    templateUrl: './entregadores-lista.page.html',
    styleUrls: ['./entregadores-lista.page.scss'],
})
export class EntregadorListaComponent
    implements OnInit, ViewWillEnter, ViewDidLeave, ViewWillLeave, ViewDidLeave {
    entregadores: EntregadoresInterface[] = [];

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
        const lista = this.httpClient.get<EntregadoresInterface[]>('http://localhost:3000/entregadores');

        lista.subscribe(
            (dados) => {
                this.entregadores = dados;
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

    confirmarExclusao(entregador: EntregadoresInterface) {
        this.alertController
            .create({
                header: 'Confirmação de exclusão',
                message: `Deseja excluir o entregador ${entregador.nome}?`,
                buttons: [
                    {
                        text: 'Sim',
                        handler: () => this.excluir(entregador),
                    },
                    {
                        text: 'Não',
                    },
                ],
            })
            .then((alerta) => alerta.present());
    }

    private excluir(entregador: EntregadoresInterface) {
        if (entregador.id) {
            this.httpClient.delete(`http://localhost:3000/entregadores/${entregador.id}`).subscribe(
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



