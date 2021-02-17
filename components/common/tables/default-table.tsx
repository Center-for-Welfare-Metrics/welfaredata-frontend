import React from 'react'
import { Container,Table, Td, Tr } from './default-table-styled'

interface IColumn {
    Header:string,
    accessor:string,
    preRender?(rowValue:string):any
}


interface IDefaultTable {
    data:any[],
    columns:IColumn[]
}

const DefaultTable = ({data,columns}:IDefaultTable) => {
    return (
        <Container>
            <Table>
                <tbody>
                    <Tr>
                        {
                            columns.map((column) => (
                                <th key={column.accessor}>{column.Header}</th>
                            ))
                        }
                    </Tr>                            
                {
                data.map((row) => (
                    <Tr key={row._id}>{
                        columns.map((column) => (
                            <Td key={column.accessor}>
                                {
                                    row[column.accessor] &&
                                    column.preRender?
                                    (
                                        column.preRender(row[column.accessor])
                                    )
                                    :
                                    (
                                        row[column.accessor]
                                    )
                                }
                            </Td>
                        ))}
                    </Tr>
                ))
                }            
                </tbody>
            </Table>
        </Container>
    )
}


export default DefaultTable