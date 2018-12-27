const Contrato = Parse.Object.extend("Contrato")
const Parcela = Parse.Object.extend("Parcela")

async function contratosAtivosQuery() {
    const query = new Parse.Query(Contrato)
    query.equalTo("ativo", true)
    return query.find()
}

async function parcelasDoMesQuery(ids) {
    var hoje = new Date(), mes = hoje.getMonth(), ano = hoje.getFullYear()

    const query = new Parse.Query(Parcela)
    query.greaterThanOrEqualTo("vencimento", new Date(ano, mes, 1))
    query.lessThan("vencimento", new Date(ano, mes+1, 1))
    query.containedIn("contrato", ids)
    return query.find()
}

function criarParcela(contrato) {
    var hoje = new Date(), mes = hoje.getMonth(), ano = hoje.getFullYear()
    let ultimoDia = new Date(ano, mes+1, 0).getDate()
    console.log("Criando parcela para o contrato",
                contrato.id, "mês", mes+"/"+ano)

    let vencimento = new Date(ano, mes, Math.min(ultimoDia, contrato.get("dia_vencimento")))
    if (vencimento < hoje) vencimento = hoje
    let parcela = new Parcela()
    parcela.set("contrato", contrato.id)
    parcela.set("vencimento", vencimento)
    parcela.set("valor", contrato.get("valor_mensal"))
    parcela.set("pago", false)
    return parcela.save()
}

async function contratosComParcelaQuery(ids) {
    return parcelasDoMesQuery(ids).then(parcelas => (
        parcelas.map(it => it.get('contrato'))
    ))
}

Parse.Cloud.job("atualizarParcelas", async (request) => {
    let contratos = await contratosAtivosQuery()
    let contratos_com_parcela = await contratosComParcelaQuery(
        contratos.map(it => it.id))

    contratos.forEach(contrato => {
        if(!contratos_com_parcela.includes(contrato.id)) {
            criarParcela(contrato)
        }
    })
    return {}
})

Parse.Cloud.afterSave("Contrato", async (request) => {
    if(request.object.get("ativo")) {
        let contratos = await contratosComParcelaQuery([request.object.id])
        if(!contratos.includes(request.object.id)) {
            criarParcela(request.object)
        }
    }
})
