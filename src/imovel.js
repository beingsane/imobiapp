import React from 'react'
import {
    Datagrid, List, Responsive, SimpleList, TextField,
    Create, Edit, SimpleForm, TextInput, EditButton,
    required, minLength
} from 'react-admin'

export const list = (props) => (
    <List {...props} title="Imóveis">
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.descricao}
                    secondaryText={record => (
                        record.logradouro + ', ' +
                        record.numero + ', ' +
                        record.bairro + ', ' +
                        record.municipio + ', ' +
                        record.uf
                    )}/>
                }
            medium={
                <Datagrid>
                    <TextField key="descricao" source="descricao" label="Descrição"/>
                    <TextField key="logradouro" source="logradouro"/>
                    <TextField key="numero" source="numero"/>
                    <TextField key="bairro" source="bairro"/>
                    <TextField key="municipio" source="municipio"/>
                    <TextField key="uf" source="uf" label="UF"/>
                    <EditButton/>
                </Datagrid>
            }
        />
    </List>
)

const form = (
    <SimpleForm redirect="list">
        <TextInput source="descricao" label="Descrição" validate={[required(), minLength(3)]}/>
        <TextInput source="logradouro" validate={[required(), minLength(3)]}/>
        <TextInput source="numero" validate={[required()]}/>
        <TextInput source="bairro" validate={[required(), minLength(3)]}/>
        <TextInput source="municipio" validate={[required(), minLength(3)]}/>
        <TextInput source="uf" label="UF" validate={[required(), minLength(2)]}/>
    </SimpleForm>
)

export const create = (props) => (
    <Create {...props} title="Novo Imóvel">
        {form}
    </Create>
)

export const edit = (props) => (
    <Edit {...props} title="Editar Imóvel">
        {form}
    </Edit>
)

export default {list, create, edit}
