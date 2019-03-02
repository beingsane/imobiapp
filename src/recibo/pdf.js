import React from 'react';
import extenso from 'extenso';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        paddingHorizontal: '2cm',
        paddingVertical: '2cm',
        fontSize: 14,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        paddingVertical: '4cm'
    },
    text: {
        textAlign: 'justify',
    },
    footer: {
        textAlign: 'right',
        paddingVertical: '1cm',
    },
    signature: {
        textAlign: 'center',
        paddingTop: '2cm',
    },
})

const Recibo = (item) => {
    let { inquilino, imovel, parcela } = item
    let valor_extenso = extenso(parcela.valor, {mode: 'currency'})
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>
                    RECIBO
                </Text>
                <View>
                <Text style={styles.text}>
                    Recebi de {inquilino.nome}, CPF {inquilino.cpf}, a importância de{` `}
                    R$ {parcela.valor} ({valor_extenso}) referente ao aluguel da casa{` `}
                    situada a {imovel.logradouro}, {imovel.numero} no Bairro {imovel.bairro}
                    , {imovel.municipio} {imovel.uf}.
                </Text>
                <Text style={styles.footer}>
                    Pau dos Ferros, {(new Date()).toLocaleDateString('pt-BR', {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                    })}
                </Text>
                </View>
                <View style={styles.signature}>
                    <Text>
                        _________________________________________
                    </Text>
                    <Text>
                        Recebedor Responsável
                    </Text>
                </View>
            </Page>
        </Document>
    )
}


export default Recibo
