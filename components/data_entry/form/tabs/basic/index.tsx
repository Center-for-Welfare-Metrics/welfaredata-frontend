import FormInput from "@/components/common/inputs/form-input"
import DataEntryContext from "@/context/data-entry"
import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useContext } from "react"

const BasicTab = () => {

    const { contentInformation,specie } = useContext(DataEntryContext)

    const [global,setGlobal] = useState('')

    const [specific,setSpecific] = useState('')

    const timer = useRef(null)

    useEffect(()=>{
        setGlobal(contentInformation?contentInformation.ref_description:specie.description)
        setSpecific(contentInformation?.description || '')
    },[contentInformation])

    const update = () => {
        clearTimeout(timer.current)

        timer.current = setTimeout(() => {
            console.log('update trigger...')
        }, 500);
    }

    return (
        <>
            <FormInput 
                value={global}
                onChange={(e)=>{setGlobal(e.target.value);update()}}
                label='Global'
                name='description'
                multiline={true}
                rows={4}            
            />
            {
                contentInformation && 
                <FormInput 
                    value={specific}
                    onChange={(e)=>{setSpecific(e.target.value);update()}}
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