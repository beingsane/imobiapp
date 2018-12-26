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
	query.descending("vencimento")
	query.containedIn("contrato", ids)
	return query.find()
}

function criarParcela(contrato) {
	let parcela = new Parcela()
	var hoje = new Date(), mes = hoje.getMonth(), ano = hoje.getFullYear()
	let ultimoDia = new Date(ano, mes+1, 0).getDate()
	parcela.set("contrato", contrato.id)
	parcela.set("vencimento", new Date(ano, mes, Math.min(ultimoDia, contrato.get("dia_vencimento"))))
	parcela.set("valor", contrato.get("valor_mensal"))
	return parcela.save()
}

Parse.Cloud.job("atualizarParcelas", async (request) => {
	let contratos = await contratosAtivosQuery()
	let paercelas = await parcelasDoMesQuery(contratos.map(it => it.id))
	let contratos_com_parcela = paercelas.map(it => it.get('contrato'))
	let novas_parcelas = []
	let parcelas = []

	contratos.forEach(contrato => {
		if(!contratos_com_parcela.includes(contrato.id)) {
			parcelas.push(criarParcela(contrato).then(p => novas_parcelas.push(p)))
		}
	})
	await Promise.all(parcelas)
	return {novas_parcelas: novas_parcelas}
})

Parse.Cloud.afterSave("Contrato", (request) => {
    criarParcela(request.object)
})
