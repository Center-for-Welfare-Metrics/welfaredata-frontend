import FormInput from "@/components/common/inputs/form-input"
import DataEntryContext from "@/context/data-entry"
import { showOnScreen } from "@/utils/processogram"
import { ChangeEvent, useContext } from "react"
import voca from 'voca'

const BasicTab = () => {

    const {currentInformations,handleReferenceDataChange,currentFieldReference} = useContext(DataEntryContext)

    const handleChange = (event:any) => {
        let { value,name } = event.target
        handleReferenceDataChange({
            [name]:value
        })
    }   

    return (
        <>
            {/* <FormInput 
                value={ voca.titleCase( showOnScreen('name',currentInformations,currentFieldReference) || '') }
                onChange={handleChange}
                label='Name'
                name='name'
                disabled={true}
            /> */}
            <FormInput 
                value={ showOnScreen('description',currentInformations,currentFieldReference) || '' }
                onChange={handleChange}
                label='Description'
                name='description'
                multiline={true}
                rows={4}
                // disabled={true}
            />            
        </>
    )
}



export default BasicTab