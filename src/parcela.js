import React from 'react'
import {
    Create, Edit, SimpleForm,
    NumberInput, DateInput, BooleanInput
} from 'react-admin'

const form = (
    <SimpleForm redirect={(basePath, id, data) => `/Contrato/${data.contrato}/show`}>
        <DateInput source="vencimento"/>
        <NumberInput source="valor"/>
        <BooleanInput source="pago"/>
    </SimpleForm>
)

export const create = (props) => (
    <Create {...props}>
        {form}
    </Create>
)

export const edit = (props) => (
    <Edit {...props}>
        {form}
    </Edit>
)

export default {create, edit}
