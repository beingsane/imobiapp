import React from 'react'
import { Admin, Resource } from 'react-admin'
import portugueseMessages from 'ra-language-portuguese'
import { dataProvider, authProvider } from './dataProvider'
import imovel from './imovel'
import inquilino from './inquilino'
import contrato from './contrato'
import parcela from './parcela'
import ImovelIcon from '@material-ui/icons/Business'
import InquilinoIcon from '@material-ui/icons/Group'
import ContratoIcon from  '@material-ui/icons/Receipt'
import theme from './theme'

const App = props => (
    <Admin theme={theme} dataProvider={dataProvider} authProvider={authProvider} i18nProvider={() => portugueseMessages} title="Imobi">
        <Resource name="Imovel" {...imovel} icon={ImovelIcon} />
        <Resource name="Inquilino" {...inquilino} icon={InquilinoIcon} />
        <Resource name="Contrato" {...contrato} icon={ContratoIcon} />
        <Resource name="Parcela" {...parcela} />
    </Admin>
)

export default App
