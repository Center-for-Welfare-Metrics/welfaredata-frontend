import FormInput from "@/components/common/inputs/form-input"
import DataEntryContext from "@/context/data-entry"
import { showOnScreen } from "@/utils/processogram"
import { useContext } from "react"
import voca from 'voca'

const BasicTab = () => {

    const {currentInformations,updateCurrentInformations,currentFieldReference} = useContext(DataEntryContext)

    

    return (
        <>
            <FormInput 
                value={ voca.titleCase( showOnScreen('name',currentInformations,currentFieldReference) || '') }
                onChange={(e)=>e.preventDefault()}
                label='Name'
                name='name'
                disabled={true}
            />
            <FormInput 
                value={ showOnScreen('description',currentInformations,currentFieldReference) || '' }
                onChange={(e)=>updateCurrentInformations({description:e.target.value})}
                label='Description'
                name='description'
                multiline={true}
                rows={4}
                disabled={true}
            />
        </>
    )
}



export default BasicTab