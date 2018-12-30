import { createMuiTheme } from '@material-ui/core/styles'
import orange from '@material-ui/core/colors/orange'

export default createMuiTheme({
    palette: {
        primary: {
            main: orange[800],
        },
        secondary: {
            main: orange[700],
        },
        contrastThreshold: 2
    }
})
