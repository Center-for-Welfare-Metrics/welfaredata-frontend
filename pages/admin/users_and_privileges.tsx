import withAuth from "@/components/HOC/with-auth"
import DefaultLayout from "@/components/layouts"
import { AdminLayout } from "@/components/admin/admin-layout"
import UsersManagement from "@/components/admin/users/users-management"
import RolesManagement from "@/components/admin/roles/roles-management"
import { useEffect, useState } from "react"
import { IRole } from "@/context/roles"
import PrivilegesContext, { IPrivileges } from "@/context/privileges_context"
import adminRolesApi from '@/api/admin/roles'

const UsersAndPrivileges = () => {

    const [roles,setRoles] = useState<IRole[]>([])

    const fetchRoles = () => {
        adminRolesApi.get({skip:0,limit:10,createdBy:'',name:''})
        .then(({data}) => {
            setRoles(data)
        })
    }

    const privilegesContextValues : IPrivileges = {roles,setRoles,fetchRoles}

    useEffect(()=>{
        fetchRoles()
    },[])

    return (
        <DefaultLayout>   
            <PrivilegesContext.Provider value={privilegesContextValues}>
                <AdminLayout>
                    <RolesManagement />
                    <UsersManagement />                
                </AdminLayout>
            </PrivilegesContext.Provider>
        </DefaultLayout>
    )
}

export default withAuth(UsersAndPrivileges)