import React from 'react'
import {
    Datagrid, List, Responsive, SimpleList, TextField,  DateField,
    NumberField, BooleanField, FunctionField, ShowButton, EditButton,
    Create, Edit, SimpleForm, TextInput, SelectInput, DateInput, BooleanInput,
    ReferenceField, ReferenceManyField, ReferenceInput,
    SimpleShowLayout, Show
} from 'react-admin'

const situacao = (r) => {
    if(r.pago) return "Pago"
    return (new Date(r.vencimento) < new Date()) ? "Vencido" : "Pendente"
}

export const list = (props) => (
    <List {...props} title="Contratos">
        <Responsive
            small={
                <SimpleList linkType="show"
                primaryText={record => (
                    <ReferenceField label="Descrição" source="imovel" reference="Imovel" basePath="imovel" linkType={false} record={record}>
                        <TextField source="descricao" />
                    </ReferenceField>)}
                secondaryText={record => (
                    <ReferenceField label="Inquilino" source="inquilino" reference="Inquilino" basePath="inquilino" linkType={false} record={record}>
                        <TextField source="nome" />
                    </ReferenceField>)}/>
            }
            medium={
                <Datagrid>
                    <TextField source="numero"/>
                    <ReferenceField reference="Inquilino" source="inquilino" linkType={false}>
                        <TextField source="nome"/>
                    </ReferenceField>
                    <ReferenceField reference="Imovel" source="imovel" linkType={false}>
                        <TextField source="descricao"/>
                    </ReferenceField>
                    <TextField source="duracao" label="Duração"/>
                    <BooleanField source="ativo"/>
                    <ShowButton/>
                </Datagrid>
            }
        />
    </List>
)

const form = (
    <SimpleForm redirect="show">
        <ReferenceInput reference="Inquilino" source="inquilino">
            <SelectInput optionText="nome"/>
        </ReferenceInput>
        <ReferenceInput reference="Imovel" source="imovel">
            <SelectInput optionText="descricao"/>
        </ReferenceInput>
        <DateInput source="data_inicio" label="Data início"/>
        <TextInput source="duracao" label="Duração (meses)"/>
    </SimpleForm>
)

export const create = (props) => (
    <Create {...props} title="Novo Contrato">
        {form}
    </Create>
)

export const edit = (props) => (
    <Edit {...props} title="Editar Contrato">
        <SimpleForm redirect="show">
            <BooleanInput source="ativo"/>
        </SimpleForm>
    </Edit>
)

export const show = (props) => (
    <Show {...props} title="Ver Contrato">
        <SimpleShowLayout>
            <TextField source="numero"/>
            <ReferenceField reference="Inquilino" source="inquilino" linkType={false}>
                <TextField source="nome"/>
            </ReferenceField>
            <ReferenceField reference="Imovel" source="imovel" linkType={false}>
                <TextField source="descricao"/>
            </ReferenceField>
            <TextField source="duracao" label="Duração (meses)"/>
            <BooleanField source="ativo"/>
            <ReferenceManyField label="Parcelas" reference="Parcela" target="contrato">
                <Responsive
                    small={
                        <SimpleList
                            primaryText={r => r.vencimento}
                            secondaryText={r => r.valor}
                            tertiaryText={situacao}/>
                        }
                    medium={
                        <Datagrid>
                            <DateField source="vencimento"/>
                            <NumberField source="valor" options={{ style: 'currency', currency: 'BRL' }} />
                            <FunctionField label="Situação" render={situacao}/>
                            <BooleanField source="pago"/>
                            <EditButton/>
                        </Datagrid>
                    }
                />
            </ReferenceManyField>
        </SimpleShowLayout>
    </Show>
)

export default {list, create, edit, show}
