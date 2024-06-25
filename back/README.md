## TRABALHO GUSTAVO GROSS E PEDRO H.

## INSTALAÇÃO

```bash
yarn install
```

## BUILDANDO O PROJETO

```bash
yarn build
```

## RODANDO MIGRATIONS

```bash
npm run typeorm -- migration:run -d ./data-source.ts 
```

## INICIANDO APP

```bash
yarn run start
```

## SCRIPTS PRO BANCO 

INSERT INTO restaurantes (id, nome, avaliacao, endereco, prazo_entrega, tipo) VALUES
('01385823-a3b6-47a4-9b46-608cf1284ca1', 'Restaurante A', 4, 'Rua das Flores, 123', 30, 'P')

INSERT INTO restaurantes (id, nome, avaliacao, endereco, prazo_entrega, tipo)
VALUES
('4823d103-6c7c-42ee-8c4d-60f7b783e265', 'Restaurante B', 5, 'Avenida Central, 456', 45, 'B')

INSERT INTO restaurantes (id, nome, avaliacao, endereco, prazo_entrega, tipo)
VALUES
('5a2d7aca-e343-4be6-a1f1-8f597173df5f', 'Restaurante C', 3, 'Praça das Árvores, 789', 25, 'D')

INSERT INTO pratos (id,nome,preco,proteina,vegano,avaliacao,"restauranteId") VALUES
('5ccd8803-f7fb-421a-8f70-63ac4692c3d5','XIS BACON',10.5,'S',false,5,'1a2b3c4d-5678-90ab-cdef-1234567890ab'),
('5b6f7daf-c375-4740-a05e-5ecccafb534e','CHURRAS',10.5,'G',false,5,'01385823-a3b6-47a4-9b46-608cf1284ca1'),
('b1f858f1-a4de-4cce-8da3-fd2fcb0ae7ad','LAGOSTA',11.0,'O',false,5,'5a2d7aca-e343-4be6-a1f1-8f597173df5f');

INSERT INTO entregadores (id,nome,data_nascimento,genero,placa_veiculo,tipo_veiculo) VALUES
('03e7b4b3-879f-4fd1-ad5f-e9cead4fa8ec','CLAUDIO 2','2006-06-08','M','HPN0741','M'),
('85a0dde0-b057-4588-8ab3-ff43f8e9f293','Leo kbça','1998-06-08','M','HPN0741','C'),
('1cbd958b-02a4-4495-9e79-1f21b7c3fc4f','Entregador A','1990-05-15','M','ABC-1234','O');

INSERT INTO restaurantes_entregadores (restaurante_id,entregador_id) VALUES
('4823d103-6c7c-42ee-8c4d-60f7b783e265','03e7b4b3-879f-4fd1-ad5f-e9cead4fa8ec'),
('01385823-a3b6-47a4-9b46-608cf1284ca1','85a0dde0-b057-4588-8ab3-ff43f8e9f293'),
('5a2d7aca-e343-4be6-a1f1-8f597173df5f','1cbd958b-02a4-4495-9e79-1f21b7c3fc4f');
