import React from 'react'
import {
    Datagrid, List, Responsive, SimpleList, TextField,
    Create, Edit, SimpleForm, TextInput, EditButton,
    required, minLength, email, regex
} from 'react-admin'

export const list = (props) => (
    <List {...props} title="Inquilinos">
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.nome}
                    secondaryText={record => record.telefone}/>
                }
            medium={
                <Datagrid>
                    <TextField key="nome" source="nome" />
                    <TextField key="email" source="email" label="E-mail"/>
                    <TextField key="telefone" source="telefone"/>
                    <EditButton key="editButton"/>
                </Datagrid>
            }
        />
    </List>
)

const form = (
    <SimpleForm redirect="list">
        <TextInput source="nome" validate={[required(), minLength(3)]}/>
        <TextInput source="cpf" label="CPF" validate={[required(), regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]}/>
        <TextInput source="rg" label="RG" validate={[required(), regex(/[\d.]+ \w+\/\w{2}/)]}/>
        <TextInput source="email" label="E-mail" validate={email()}/>
        <TextInput source="telefone" validate={regex(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/)}/>
    </SimpleForm>
)

export const create = (props) => (
    <Create {...props} title="Novo Inquilino">
        {form}
    </Create>
)

export const edit = (props) => (
    <Edit {...props} title="Editar Inquilino">
        {form}
    </Edit>
)

export default {list, create, edit}
