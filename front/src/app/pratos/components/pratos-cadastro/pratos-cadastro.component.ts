import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {HttpClient} from "@angular/common/http";
import {ProteinaEnum} from "../../../../environments/proteina.enum";
import {PratosInterface} from "../../../interfaces";

@Component({
    selector: 'app-pratos-cadastro',
    templateUrl: './pratos-cadastro.component.html',
    styleUrls: ['./pratos-cadastro.component.scss'],
})
export class PratosCadastroComponent implements OnInit {
    pratoId: string | null;
    pratosForm: FormGroup;

    constructor(
        private toastController: ToastController,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private httpClient: HttpClient,
    ) {
        this.pratoId = null;
        this.pratosForm = this.createForm();
    }

    ngOnInit() {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        if (id) {
            this.pratoId = id;
            this.httpClient.get<PratosInterface>(`http://localhost:3000/pratos/${id}`).subscribe((prato) => {
                this.pratosForm = this.createForm(prato);
            });
        }
    }

    private createForm(prato?: PratosInterface) {
        return new FormGroup({
            nome: new FormControl(prato?.nome || '', [
                Validators.required,
                Validators.minLength(3),
                Validators.minLength(3),
                Validators.maxLength(150),
            ]),
            preco: new FormControl(
                prato?.preco || 0
            ),
            proteina: new FormControl(
                prato?.proteina || ProteinaEnum.GADO,
                Validators.required
            ),
            vegano: new FormControl(prato?.vegano || '', [
                Validators.required,
            ]),
            avaliacao: new FormControl(
                prato?.avaliacao || 1, [
                    Validators.required,
                    Validators.min(1),
                    Validators.max(5)
                ]),
        })
            ;
    }

    salvar() {
        const prato: PratosInterface = {
            ...this.pratosForm.value,
            id: this.pratoId,
        };

        if (!prato.id) {
            this.httpClient.post('http://localhost:3000/pratos', prato).subscribe(
                () => this.router.navigate(['prato']),
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

        this.httpClient.put(`http://localhost:3000/pratos/${prato.id}`, prato).subscribe(
            () => this.router.navigate(['prato']),
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
        return this.pratosForm.get('nome');
    }

    get avaliacao() {
        return this.pratosForm.get('avaliacao');
    }
}
