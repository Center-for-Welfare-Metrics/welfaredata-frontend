import FormInput from "@/components/common/inputs/form-input"
import DataEntryContext from "@/context/data-entry"
import { useContext } from "react"

const BasicTab = () => {

    const {currentInformations,currentFieldReference,handleReferenceInputChange,handleLocalInputChange} = useContext(DataEntryContext)

    const handleChange = (event:any) => {
        let { value,name } = event.target
        handleReferenceInputChange({
            [name]:value
        })
    }   
    // mudança qualquer 
    const handleLocalChange = (event:any) => {
        let { value,name } = event.target
        handleLocalInputChange({
            [name]:value
        })
    }

    return (
        <>
            <FormInput 
                value={ currentInformations[currentFieldReference]?.description || '' }
                onChange={handleChange}
                label='Global'
                name='description'
                multiline={true}
                rows={4}            
            />
            <FormInput 
                value={ currentInformations.description || '' }
                onChange={handleLocalChange}
                label='Specific'
                name='description'
                multiline={true}
                rows={4}            
            />    
        </>       
    )
}



export default BasicTab