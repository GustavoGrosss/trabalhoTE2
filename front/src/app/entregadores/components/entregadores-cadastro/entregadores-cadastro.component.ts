import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {GeneroEnum} from '../../../../environments/genero.enum';
import {HttpClient} from "@angular/common/http";
import {TipoVeiculoEnum} from "../../../../environments/tipo_veiculo.enum";
import {EntregadoresInterface} from "../../../interfaces";

@Component({
    selector: 'app-entregadores-cadastro',
    templateUrl: './entregadores-cadastro.component.html',
    styleUrls: ['./entregadores-cadastro.component.scss'],
})
export class EntregadoresCadastroComponent implements OnInit {
    entregadorId: string | null;
    entregadoresForm: FormGroup;

    constructor(
        private toastController: ToastController,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private httpClient: HttpClient,
    ) {
        this.entregadorId = null;
        this.entregadoresForm = this.createForm();
    }

    ngOnInit() {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        if (id) {
            this.entregadorId = id;
            this.httpClient.get<EntregadoresInterface>(`http://localhost:3000/entregadores/${id}`).subscribe((entregador) => {
                this.entregadoresForm = this.createForm(entregador);
            });
        }
    }

    private createForm(entregador?: EntregadoresInterface) {
        return new FormGroup({
            nome: new FormControl(entregador?.nome || '', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(150),
            ]),
            data_nascimento: new FormControl(
                entregador?.data_nascimento || new Date().toISOString()
            ),
            genero: new FormControl(
                entregador?.genero || GeneroEnum.FEMININO,
                Validators.required
            ),
            placaVeiculo: new FormControl(entregador?.placaVeiculo || '', [
                    Validators.required,
                    Validators.minLength(7)
            ]),
            tipoVeiculo: new FormControl(
                entregador?.tipoVeiculo || TipoVeiculoEnum.MOTO,
                Validators.required
            ),
        })
            ;
    }

    salvar() {
        const entregador: EntregadoresInterface = {
            ...this.entregadoresForm.value,
            id: this.entregadorId,
        };

        if (!entregador.id) {
            this.httpClient.post('http://localhost:3000/entregadores', entregador).subscribe(
                () => this.router.navigate(['entregador']),
                (erro) => {
                    this.toastController
                        .create({
                            message: `Erro ao atualizar: ${erro.message}`,
                            duration: 5000,
                            keyboardClose: true,
                            color: 'danger',
                        })
                        .then((t) => t.present());
                }
            )

            return
        }

        this.httpClient.put(`http://localhost:3000/entregadores/${entregador.id}`, entregador).subscribe(
            () => this.router.navigate(['entregador']),
            (erro) => {
                this.toastController
                    .create({
                        message: `Erro ao atualizar: ${erro.message}`,
                        duration: 5000,
                        keyboardClose: true,
                        color: 'danger',
                    })
                    .then((t) => t.present());
            }
        );
    }

    get nome() {
        return this.entregadoresForm.get('nome');
    }

    get placaVeiculo() {
        return this.entregadoresForm.get('placaVeiculo');
    }
}
