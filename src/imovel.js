import React from 'react'
import {
    Datagrid, List, Responsive, SimpleList, TextField, Filter,
    Create, Edit, SimpleForm, TextInput, EditButton,
    required, minLength
} from 'react-admin'

const ListFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Pesquisar Descrição" source="descricao" alwaysOn />
        <TextInput source="logradouro"/>
        <TextInput source="bairro"/>
        <TextInput source="municipio"/>
    </Filter>
)

export const list = (props) => (
    <List {...props} title="Imóveis" filters={<ListFilter/>}>
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
        <TextInput source="descricao" label="Descrição" validate={[required(), minLength(3)]} fullWidth />
        <TextInput source="logradouro" validate={[required(), minLength(3)]} fullWidth />
        <TextInput source="numero" validate={[required()]} fullWidth />
        <TextInput source="bairro" validate={[required(), minLength(3)]} fullWidth />
        <TextInput source="municipio" validate={[required(), minLength(3)]} fullWidth />
        <TextInput source="uf" label="UF" validate={[required(), minLength(2)]} fullWidth />
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
