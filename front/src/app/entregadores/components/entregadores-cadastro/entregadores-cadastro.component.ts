import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {GeneroEnum} from '../../../../environments/genero.enum';
import {HttpClient} from "@angular/common/http";
import {TipoVeiculoEnum} from "../../../../environments/tipo_veiculo.enum";
import {EntregadoresInterface, RestaurantesInterface} from "../../../interfaces";

@Component({
    selector: 'app-entregadores-cadastro',
    templateUrl: './entregadores-cadastro.component.html',
    styleUrls: ['./entregadores-cadastro.component.scss'],
})
export class EntregadoresCadastroComponent implements OnInit {
    entregadorId: string | null;
    entregadoresForm: FormGroup;
    restaurantes: RestaurantesInterface[] = [];
    selectedRestaurants: RestaurantesInterface[] = [];

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
            this.httpClient.get<any>(`http://localhost:3000/entregadores/${id}`).subscribe((entregador) => {

                this.selectedRestaurants = entregador.restaurantes

                this.entregadoresForm = this.createForm(entregador);
            });
        }

        this.httpClient.get<RestaurantesInterface[]>(`http://localhost:3000/restaurantes`).subscribe((restaurantes) => {
            this.restaurantes = restaurantes;
        });
    }

    private createForm(entregador?: EntregadoresInterface) {
        return new FormGroup({
            nome: new FormControl(entregador?.nome || '', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(150),
            ]),
            dataNascimento: new FormControl(
                entregador?.dataNascimento || new Date().toISOString()
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
            )
        });
    }

    salvar() {
        const entregador: any = {
            ...this.entregadoresForm.value,
            id: this.entregadorId,
            restaurantes: this.selectedRestaurants
        };

        if (!entregador.id) {
            this.httpClient.post('http://localhost:3000/entregadores', entregador).subscribe(
                () => this.router.navigate(['entregador']),
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

                    this.toastController.create({
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

        this.httpClient.put(`http://localhost:3000/entregadores/${entregador.id}`, entregador).subscribe(
            () => this.router.navigate(['entregador']),
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
        return this.entregadoresForm.get('nome');
    }

    get placaVeiculo() {
        return this.entregadoresForm.get('placaVeiculo');
    }

    onRestaurantSelected(restaurant: RestaurantesInterface) {
        const index = this.selectedRestaurants.findIndex(r => r.id === restaurant.id);
        if (index === -1) {
            this.selectedRestaurants.push(restaurant);
        } else {
            this.selectedRestaurants.splice(index, 1);
        }

        console.log(this.selectedRestaurants)
    }

    isSelected(restaurant: RestaurantesInterface): boolean {
        return this.selectedRestaurants.some(r => r.id === restaurant.id);
    }
}
