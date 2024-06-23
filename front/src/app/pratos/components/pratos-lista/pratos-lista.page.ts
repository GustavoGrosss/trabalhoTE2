import {Component, OnInit} from '@angular/core';
import {AlertController, ToastController, ViewDidLeave, ViewWillEnter, ViewWillLeave,} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {ProteinaEnum} from "../../../../environments/proteina.enum";
import {PratosInterface} from "../../../interfaces";

@Component({
    selector: 'app-pratos',
    templateUrl: './pratos-lista.page.html',
    styleUrls: ['./pratos-lista.page.scss'],
})
export class PratoListaComponent
    implements OnInit, ViewWillEnter, ViewDidLeave, ViewWillLeave, ViewDidLeave {
    pratos: PratosInterface[] = [];

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
        const lista = this.httpClient.get<PratosInterface[]>('http://localhost:3000/pratos');

        lista.subscribe(
            (dados) => {
                this.pratos = dados;
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

    confirmarExclusao(prato: PratosInterface) {
        this.alertController
            .create({
                header: 'Confirmação de exclusão',
                message: `Deseja excluir o prato ${prato.nome}?`,
                buttons: [
                    {
                        text: 'Sim',
                        handler: () => this.excluir(prato),
                    },
                    {
                        text: 'Não',
                    },
                ],
            })
            .then((alerta) => alerta.present());
    }

    private excluir(prato: PratosInterface) {
        if (prato.id) {
            this.httpClient.delete(`http://localhost:3000/pratos/${prato.id}`).subscribe(
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
