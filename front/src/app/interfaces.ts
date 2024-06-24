import {TipoRestauranteEnum} from "../environments/tipo_restaurante.enum";
import {ProteinaEnum} from "../environments/proteina.enum";
import {GeneroEnum} from "../environments/genero.enum";
import {TipoVeiculoEnum} from "../environments/tipo_veiculo.enum";

export interface RestaurantesInterface {
    id?: string;
    nome: string;
    avaliacao: number;
    endereco: string;
    prazoEntrega: number;
    tipo: TipoRestauranteEnum;
    pratos: PratosInterface[];
    entregadores: EntregadoresInterface[];
}

export interface PratosInterface {
    id?: string;
    nome: string;
    preco: number;
    proteina: ProteinaEnum;
    vegano: string;
    avaliacao: number;
    restauranteId: string;
}

export interface EntregadoresInterface {
    id?: string | null;
    nome: string;
    dataNascimento: Date;
    genero: GeneroEnum;
    placaVeiculo: string;
    tipoVeiculo: TipoVeiculoEnum;
}

export interface RestaurantePratoInterface {
    id?: string | null;
    restaurante_id: string;
    prato_id: string;
}

export interface RestauranteEntregadorInterface {
    id?: string | null;
    restaurante_id: string;
    prato_id: string;
}
