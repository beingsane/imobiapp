import React from 'react'
import { Admin, Resource } from 'react-admin'
import { DataProvider, AuthProvider } from './ra-data-parseserver'
import imovel from './imovel'
import inquilino from './inquilino'
import contrato from './contrato'
import parcela from './parcela'

const parseConfig = {
    "URL": process.env.REACT_APP_API_URL || "",
    "APP-ID": process.env.REACT_APP_APP_ID || "",
    "REST-API-KEY": process.env.REACT_APP_API_KEY || ""
}

const parseData = DataProvider(parseConfig)
const parseAuth = AuthProvider(parseConfig)

const App = props => (
    <Admin dataProvider={parseData} authProvider={parseAuth} title="Imobi">
        <Resource name="Imovel" {...imovel} />
        <Resource name="Inquilino" {...inquilino} />
        <Resource name="Contrato" {...contrato} />
        <Resource name="Parcela" {...parcela} />
    </Admin>
)

export default App
