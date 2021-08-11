import FormInput from "@/components/common/inputs/form-input"
import DataEntryContext from "@/context/data-entry"
import { useContext } from "react"

const BasicTab = () => {

    const { contentInformation,specie } = useContext(DataEntryContext)

    return (
        <>
            <FormInput 
                value={contentInformation?contentInformation.ref_description:specie.description}
                onChange={()=>{}}
                label='Global'
                name='description'
                multiline={true}
                rows={4}            
            />
            {
                contentInformation && 
                <FormInput 
                    value={contentInformation.description || ''}
                    onChange={()=>{}}
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