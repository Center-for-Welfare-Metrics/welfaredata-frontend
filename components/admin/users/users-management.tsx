import { useEffect, useState } from "react"
import usersAdminApi from '@/api/admin/users'
import { DefaultButton } from "@/buttons/default-button-styled"
import DefaultTable from "@/components/common/tables/default-table"
import { DateTime } from 'luxon'
import UserModal from "@/components/admin/users/user-modal"
import { PrimaryCard } from "@/components/common/cards/cards"
import { ManagementTitle,ManagementCardDefaultContainer } from "../admin-layout"

const dateFormat = (date:string) => {
    return DateTime.fromISO(date).toFormat('DD')
}

const tableColumns = [
    {
        Header: 'Email',
        accessor: 'email',
    },
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header:'Role',
        accessor:'role',
        preRender:(role)=>{
            return role.name
        }
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

const UsersManagement = () => {

    const [users,setUsers] = useState([])

    const [userOnEdit,setUserOnEdit] = useState(null)

    const [userModalOpen,setUserModalOpen] = useState(false)

    useEffect(()=>{
        fetchUsers()
    },[])

    useEffect(()=>{
        if(userOnEdit){
            setUserModalOpen(true)
        }
    },[userOnEdit])


    const fetchUsers = () => {
        usersAdminApi.get({skip:0,limit:10,name:'',createdBy:''})
        .then(({data})=>{
            setUsers(data)
        })
    }

    return (
        <>
            <ManagementCardDefaultContainer>
                <ManagementTitle>Users</ManagementTitle>
                <PrimaryCard>
                    <DefaultTable 
                        options={
                            [
                                {text:'Open',onClick:(row)=>setUserOnEdit(row),icon:'push-pin',type:'primary'},
                                {text:'Delete',onClick:console.log,icon:'eliminar',type:'danger'},
                                {text:'Report',onClick:console.log,icon:'exclamation-button',type:'warning'}
                            ]
                        } 
                        rowClick={(row)=>setUserOnEdit(row)} 
                        data={users} 
                        columns={tableColumns} 
                    />
                </PrimaryCard>
                <DefaultButton onClick={()=>setUserModalOpen(true)}>new user</DefaultButton>
            </ManagementCardDefaultContainer>
            <UserModal onSuccess={fetchUsers} clear={()=>setUserOnEdit(null)} isOpen={userModalOpen} user={userOnEdit} onClose={()=>setUserModalOpen(false)} />
        </>
    )
}

export default UsersManagement