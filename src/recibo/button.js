import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import PrintIcon from '@material-ui/icons/Print'
import { Responsive } from 'react-admin'
import { connect } from 'react-redux'
import { showNotification } from 'react-admin'
import { push } from 'react-router-redux'
import { BlobProvider } from '@react-pdf/renderer'
import Recibo from './pdf'

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
});

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
                <Responsive
                    small={
                        <IconButton aria-label="Print" onClick={this.handleClick}>
                            <PrintIcon />
                        </IconButton>
                    }
                    medium={
                        <Button onClick={this.handleClick} className={classes.button}>
                            <PrintIcon className={classes.leftIcon} />
                            Recibo
                        </Button>
                    }
                />
            </div>
        )
    }
}

ReciboButton.propTypes = {
    push: PropTypes.func,
    record: PropTypes.object,
    showNotification: PropTypes.func,
};

export default connect(null, {showNotification, push})(
    withStyles(styles)(ReciboButton)
)
