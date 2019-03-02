import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PrintIcon from '@material-ui/icons/Print'
import { Button } from 'react-admin'
import { BlobProvider } from '@react-pdf/renderer'
import { dataProvider } from '../dataProvider'
import Recibo from './pdf'

const PDFonNewTab = (props) => {
    const document = props.document
    if(document) {
        return (
            <BlobProvider document={document}>
            {({ blob, url, loading, error }) => {
                if(!loading) window.open(url, "_blank")
                return ""
            }}
            </BlobProvider>
        )
    } else {
        return ""
    }
}

class ReciboButton extends Component {
    state = {document: null}
    handleClick = () => {
        let parcela = this.props.record
        dataProvider(
            'GET_ONE', 'Contrato', {id: parcela.contrato}
        ).then(result => {
            if(!result.data.id) return undefined
            let fetchImovel = dataProvider(
                'GET_ONE', 'Imovel', {id: result.data.imovel}
            ).then(result => result.data.id ? result.data : {})
            let fetchInquilino = dataProvider(
                'GET_ONE', 'Inquilino', {id: result.data.inquilino}
            ).then(result => result.data.id ? result.data : {})
            return Promise.all([
                Promise.resolve(result.data),
                fetchImovel,
                fetchInquilino
            ])
        }).then(([contrato, imovel, inquilino]) => {
            this.setState({document: Recibo({
                contrato, imovel, inquilino, parcela
            })})
        }).catch(err => console.log(err))
    }
    render() {
        return (
            <div>
                <PDFonNewTab document={this.state.document} />
                <Button label="Recibo" onClick={this.handleClick}>
                    <PrintIcon />
                </Button>
            </div>
        )
    }
}

ReciboButton.propTypes = {
    record: PropTypes.object,
}

export default ReciboButton
