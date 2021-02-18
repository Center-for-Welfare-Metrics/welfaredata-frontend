import withAuth from "@/components/HOC/with-auth"
import { useEffect, useState } from "react"
import usersAdminApi from '@/api/admin/users'
import { DefaultButton } from "@/buttons/default-button-styled"
import DefaultLayout from "@/components/layouts"
import { AdminLayout } from "@/components/admin/admin-layout"
import { UsersTableContainer } from "@/components/admin/users/users-styled"
import DefaultTable from "@/components/common/tables/default-table"
import { DateTime } from 'luxon'
import UserModal from "@/components/admin/users/user-modal"

const dateFormat = (date:string) => {
    return DateTime.fromISO(date).toFormat('DD')
}

const columns = [
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


const UsersPage = () => {

    const [users,setUsers] = useState([])

    const [userOnEdit,setUserOnEdit] = useState(null)

    const [userModalOpen,setUserModalOpen] = useState(false)

    useEffect(()=>{
        usersAdminApi.get({skip:0,limit:10,name:'',createdBy:''})
        .then(({data})=>{
            setUsers(data)
        })
    },[])

    return (
        <DefaultLayout>   
            <AdminLayout>
                <UsersTableContainer>
                    <DefaultTable data={users} columns={columns} />
                    <DefaultButton onClick={()=>setUserModalOpen(true)}>new user</DefaultButton>
                </UsersTableContainer>
                <UserModal isOpen={userModalOpen} user={userOnEdit} onClose={()=>setUserModalOpen(false)} />
            </AdminLayout>
        </DefaultLayout>
    )
}

export default withAuth(UsersPage)