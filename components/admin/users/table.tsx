import React from 'react'
import { Container,Table, Td, Tr } from './table-styled'
import { DateTime } from 'luxon'
import { IUser } from '@/context/user'

const dateFormat = (date:string) => {
    return DateTime.fromISO(date).toFormat('DD')
}

const COLUMNS = [
    {
        Header: 'Email',
        accessor: 'email',
    },
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Created At',
        accessor: 'createdAt',
        preRender: dateFormat
    },
    {
        Header: 'Updated At',
        accessor: 'updatedAt',
        preRender: dateFormat
    }
]

const UsersTable = ({data}:{data:IUser[]}) => {
    return (
        <Container>
            <Table>
                <tbody>
                    <Tr>
                        {
                            COLUMNS.map((column) => (
                                <th key={column.accessor}>{column.Header}</th>
                            ))
                        }
                    </Tr>                            
                {
                data.map((row) => (
                    <Tr key={row._id}>{
                        COLUMNS.map((column) => (
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


export default UsersTable