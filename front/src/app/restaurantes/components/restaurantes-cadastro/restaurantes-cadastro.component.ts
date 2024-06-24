import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {HttpClient} from "@angular/common/http";
import {TipoRestauranteEnum} from "../../../../environments/tipo_restaurante.enum";
import {EntregadoresInterface, PratosInterface, RestaurantesInterface} from "../../../interfaces";

@Component({
    selector: 'app-restaurantes-cadastro',
    templateUrl: './restaurantes-cadastro.component.html',
    styleUrls: ['./restaurantes-cadastro.component.scss'],
})
export class RestaurantesCadastroComponent implements OnInit {
    restauranteId: string | null;
    restaurantesForm: FormGroup;
    selectedEntregadores: EntregadoresInterface[] = [];
    entregadores: EntregadoresInterface[] = [];
    pratos: PratosInterface[] = [];

    constructor(
        private toastController: ToastController,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private httpClient: HttpClient,
    ) {
        this.restauranteId = null;
        this.restaurantesForm = this.createForm();
    }

    ngOnInit() {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        if (id) {
            this.restauranteId = id;
            this.httpClient.get<RestaurantesInterface>(`http://localhost:3000/restaurantes/${id}`).subscribe((restaurante) => {

                this.selectedEntregadores = restaurante.entregadores
                this.pratos = restaurante.pratos

                this.restaurantesForm = this.createForm(restaurante);
            });
        }

        this.httpClient.get<EntregadoresInterface[]>(`http://localhost:3000/entregadores`).subscribe((entregadores) => {
            this.entregadores = entregadores;
        });
    }

    private createForm(restaurante?: RestaurantesInterface) {
        return new FormGroup({
            nome: new FormControl(restaurante?.nome || '', [
                Validators.required,
                Validators.minLength(3),
                Validators.minLength(3),
                Validators.maxLength(150),
            ]),
            avaliacao: new FormControl(
                restaurante?.avaliacao || 1, [
                    Validators.required,
                    Validators.min(1),
                    Validators.max(5)
                ]),
            endereco: new FormControl(
                restaurante?.endereco || 'S/E',
                Validators.required
            ),
            prazoEntrega: new FormControl(restaurante?.prazoEntrega || 30, [
                Validators.min(1),
                Validators.max(180)
            ]),
            tipo: new FormControl(
                restaurante?.tipo || TipoRestauranteEnum.LANCHE
            ),
            pratos: new FormControl(restaurante?.pratos || null),
            entregadores: new FormControl(restaurante?.entregadores || null),
        });
    }

    salvar() {
        const restaurante: RestaurantesInterface = {
            ...this.restaurantesForm.value,
            id: this.restauranteId,
            entregadores: this.selectedEntregadores
        };

        if (!restaurante.id) {
            this.httpClient.post('http://localhost:3000/restaurantes', restaurante).subscribe(
                () => this.router.navigate(['restaurante']),
                (erro) => {

                    let messagem = '';

                    if (Array.isArray(erro.error.message)) {
                        erro.error.message.map((item: string)=> {
                                console.log(item)
                                messagem = messagem + item + ';';
                            }
                        )
                    } else {
                        messagem = erro.error.message;
                    }

                    this.toastController
                        .create({
                            message: `Erro ao atualizar: ${messagem}`,
                            duration: 5000,
                            keyboardClose: true,
                            color: 'danger',
                        })
                        .then((t) => t.present());
                }
            )

            return
        }

        this.httpClient.put(`http://localhost:3000/restaurantes/${restaurante.id}`, restaurante).subscribe(
            () => this.router.navigate(['restaurante']),
            (erro) => {

                let messagem = '';

                if (Array.isArray(erro.error.message)) {
                    erro.error.message.map((item: string)=> {
                            console.log(item)
                            messagem = messagem + item + ';';
                        }
                    )
                } else {
                    messagem = erro.error.message;
                }

                this.toastController
                    .create({
                        message: `Erro ao atualizar: ${messagem}`,
                        duration: 5000,
                        keyboardClose: true,
                        color: 'danger',
                    })
                    .then((t) => t.present());
            }
        );
    }

    get nome() {
        return this.restaurantesForm.get('nome');
    }

    get avaliacao() {
        return this.restaurantesForm.get('avaliacao');
    }

    onEntregadorSelected(entregador: EntregadoresInterface) {
        const index = this.selectedEntregadores.findIndex(r => r.id === entregador.id);
        if (index === -1) {
            this.selectedEntregadores.push(entregador);
        } else {
            this.selectedEntregadores.splice(index, 1);
        }
    }

    isSelected(entregador: EntregadoresInterface): boolean {
        return this.selectedEntregadores.some(r => r.id === entregador.id);
    }

    editDish() {
        this.router.navigate([`/pratos/editar`]);
    }
}
