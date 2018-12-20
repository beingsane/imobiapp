export default {
    imovel: [
        {
            "id": "11",
            "descricao": "Casa 1",
            "logradouro": "Rua José do Anzois",
            "numero": "1235",
            "bairro": "São Francisco de Assis",
            "municipio": "Pau dos Ferros",
            "uf": "RN",
            "endereco": "Rua José do Anzois Pereita e Souza, 1235, Pau dos Ferros"
        }
    ],
    inquilino: [
        {
            "id": "2",
            "nome": "Maria das Dores de Silva",
            "cpf": "123.456.789-09",
            "rg": "1.234.567 SSP/RN",
            "email": "dores.maria@gmail.com",
            "telefone": "+5584988775544"
        }
    ],
    contrato: [
        {
            "id": "122",
            "numero": "1222",
            "inquilino": "2",
            "imovel": "11",
            "duracao": "36"
        },
        {
            "id": "123",
            "numero": "1465",
            "inquilino": "2",
            "imovel": "11",
            "duracao": "36"
        }
    ],
    parcela: [
        {
            "contrato": "122",
            "vencimento": "2018-09-12 00:00:00",
            "valor": 235.0,
            "pago": true
        },
        {
            "contrato": "122",
            "vencimento": "2018-10-12 00:00:00",
            "valor": 235.0,
            "pago": false
        }
    ]
}
