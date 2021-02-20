import withAuth from "@/components/HOC/with-auth"
import DefaultLayout from "@/components/layouts"
import { useEffect } from "react"
import adminRolesApi from '@/api/admin/roles'

const PrivilegesPages = () => {

    useEffect(()=>{
        adminRolesApi.get({skip:0,limit:10,name:'',createdBy:''})
        .then(({data})=>{
            console.log(data)
        })
    },[])

    return (
        <DefaultLayout>

        </DefaultLayout>
    )
}

export default withAuth(PrivilegesPages)