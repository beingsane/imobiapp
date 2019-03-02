import { DataProvider, AuthProvider } from './ra-data-parseserver'

const parseConfig = {
    "URL": process.env.REACT_APP_API_URL || "",
    "APP-ID": process.env.REACT_APP_APP_ID || "",
    "REST-API-KEY": process.env.REACT_APP_API_KEY || ""
}

export const dataProvider = DataProvider(parseConfig)
export const authProvider = AuthProvider(parseConfig)

export default dataProvider
