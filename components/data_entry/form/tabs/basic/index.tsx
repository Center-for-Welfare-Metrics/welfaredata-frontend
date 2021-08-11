import FormInput from "@/components/common/inputs/form-input"

const BasicTab = () => {

    return (
        <>
            <FormInput 
                value={ '' }
                onChange={()=>{}}
                label='Global'
                name='description'
                multiline={true}
                rows={4}            
            />
            <FormInput 
                value={ ' ' }
                onChange={()=>{}}
                label='Specific'
                name='description'
                multiline={true}
                rows={4}            
            />    
        </>       
    )
}


export default BasicTab