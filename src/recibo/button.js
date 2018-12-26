import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PrintIcon from '@material-ui/icons/Print'
import { Button } from 'react-admin'
import { BlobProvider } from '@react-pdf/renderer'
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
        this.setState({document: Recibo(this.props.record)})
    }
    render() {
        const { classes } = this.props
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
