import FormInput from "@/components/common/inputs/form-input"
import DataEntryContext from "@/context/data-entry"
import { useContext } from "react"

const BasicTab = () => {

    const {currentInformations,handleReferenceDataChange,currentFieldReference,updateCurrentInformations,handleLocalDataChange} = useContext(DataEntryContext)

    const handleChange = (event:any) => {
        let { value,name } = event.target
        handleReferenceDataChange({
            [name]:value
        })
    }   

    const handleLocalChange = (event:any) => {
        let { value,name } = event.target
        handleLocalDataChange({
            [name]:value
        })
    }

    return (
        <>
            <FormInput 
                value={ currentInformations[currentFieldReference]?.description }
                onChange={handleChange}
                label='Global'
                name='description'
                multiline={true}
                rows={4}            
            />
            <FormInput 
                value={ currentInformations.description || '' }
                onChange={handleLocalChange}
                label='Local'
                name='description'
                multiline={true}
                rows={4}            
            />    
        </>       
    )
}



export default BasicTab