import React from 'react';
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
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>
                    RECIBO
                </Text>
                <View>
                <Text style={styles.text}>
                    Recebi d senhora Maria Lozangela a importância de {item.valor} 
                    (quatrocentos Reais) referente ao aluguel da casa situada Rua
                    Elizier Joca Feitosa, 110 no Bairro Chico Cajá, Pau dos Ferros RN.
                </Text>
                <Text style={styles.footer}>
                    Pau dos Ferros 10/02/2018
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
