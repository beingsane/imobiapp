import React from 'react'
import { Admin, Resource } from 'react-admin'
import portugueseMessages from 'ra-language-portuguese'
import { DataProvider, AuthProvider } from './ra-data-parseserver'
import imovel from './imovel'
import inquilino from './inquilino'
import contrato from './contrato'
import parcela from './parcela'
import Dashboard from './dashboard';
import ImovelIcon from '@material-ui/icons/Business';
import InquilinoIcon from '@material-ui/icons/Group'
import ContratoIcon from  '@material-ui/icons/Receipt'

const parseConfig = {
    "URL": process.env.REACT_APP_API_URL || "",
    "APP-ID": process.env.REACT_APP_APP_ID || "",
    "REST-API-KEY": process.env.REACT_APP_API_KEY || ""
}

const parseData = DataProvider(parseConfig)
const parseAuth = AuthProvider(parseConfig)

const App = props => (
    <Admin dataProvider={parseData} authProvider={parseAuth} i18nProvider={() => portugueseMessages} title="Imobi">
        <Resource name="Imovel" {...imovel} icon={ImovelIcon} />
        <Resource name="Inquilino" {...inquilino} icon={InquilinoIcon} />
        <Resource name="Contrato" {...contrato} icon={ContratoIcon} />
        <Resource name="Parcela" {...parcela} />
    </Admin>
)

export default App
