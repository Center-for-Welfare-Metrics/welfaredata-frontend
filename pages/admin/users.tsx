import withAuth from "@/components/HOC/with-auth"
import { useEffect, useState } from "react"
import usersAdminApi from '@/api/admin/users'
import UsersTable from "@/components/admin/users/table"
import { DefaultButton } from "@/buttons/default-button-styled"
import DefaultLayout from "@/components/layouts"
import { AdminLayout, UsersTableContainer } from "@/components/admin/admin-layout"




const UsersPage = () => { 

    const [users,setUsers] = useState([])

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
                    <UsersTable data={users} />
                    <DefaultButton>new user</DefaultButton>
                </UsersTableContainer>
            </AdminLayout>
        </DefaultLayout>
    )
}


export default withAuth(UsersPage)