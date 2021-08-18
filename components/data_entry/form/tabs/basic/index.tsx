import FormInput from "@/components/common/inputs/form-input"
import DataEntryContext from "@/context/data-entry"
import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useContext } from "react"
import voca from 'voca'
import processogramApi from '@/api/processogram'
import toast from "react-hot-toast"

const BasicTab = () => {

    const { contentInformation,specie,setProcessograms } = useContext(DataEntryContext)

    const [global,setGlobal] = useState('')

    const [specific,setSpecific] = useState('')

    const timer = useRef(null)

    useEffect(()=>{
        setGlobal(contentInformation?contentInformation.ref_description:specie.description)
        setSpecific(contentInformation?.description || '')
    },[contentInformation])

    const updateGlobal = (description) => {
        if(contentInformation){        
            clearTimeout(timer.current)
            let { ref__id,levelName } = contentInformation
            timer.current = setTimeout(() => {                
                processogramApi.updateReference(voca.camelCase(levelName),ref__id,{
                    description:description
                }).then((response) => {
                    setProcessograms(response.data)
                }).catch((error) => {
                    console.log(error)
                    toast.error('Something wrong')
                })                
            }, 500);
        }
    }

    return (
        <>
            <FormInput 
                value={global}
                onChange={(e)=>{setGlobal(e.target.value);updateGlobal(e.target.value)}}
                label='Global'
                name='description'
                multiline={true}
                rows={4}            
            />
            {
                contentInformation && 
                <FormInput 
                    value={specific}
                    onChange={(e)=>{setSpecific(e.target.value)}}
                    label='Specific'
                    name='description'
                    multiline={true}
                    rows={4}            
                />  
            }              
        </>       
    )
}


export default BasicTab