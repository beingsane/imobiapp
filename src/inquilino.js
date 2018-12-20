import React from 'react'
import {
    Datagrid, List, Responsive, SimpleList, TextField,
    Create, Edit, SimpleForm, TextInput, EditButton
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
                    <TextField key="nome" source="nome"/>
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
        <TextInput source="nome"/>
        <TextInput source="cpf" label="CPF"/>
        <TextInput source="rg" label="RG"/>
        <TextInput source="email" label="E-mail"/>
        <TextInput source="telefone"/>
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
