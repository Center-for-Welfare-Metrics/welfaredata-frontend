import DataEntryContext from "@/context/data-entry"
import { useContext } from "react"
import FormInput from "../common/inputs/form-input"
import { Container,Title } from './reference-settings-styled'
import voca from 'voca'
import { useRef } from "react"
import processogramApi from '@/api/processogram'
import toast from "react-hot-toast"
import { useState } from "react"
const ReferenceSettings = () => {

    const { contentInformation,setProcessograms,updateContent,specie } = useContext(DataEntryContext)

    const timer = useRef(null)

    const [alternative,setAlternative] = useState(contentInformation.ref_alternative_name || '')

    const onChange = (value) => {
        clearTimeout(timer.current)
                         
        let { ref__id,levelName } = contentInformation
        if(!contentInformation.noinformation){
            timer.current = setTimeout(() => {                
                processogramApi.updateReference(voca.camelCase(levelName),ref__id,{
                    alternative_name:value
                },specie._id).then((response) => {
                    setProcessograms(response.data)
                    updateContent(response.data)
                }).catch((error) => {
                    console.log(error)
                    toast.error("Can't do your request now. Please try later.")
                })                
            }, 500);
        }        
    }

    return (
        <Container>
            <Title>{voca.titleCase(contentInformation.levelName)} : {voca.titleCase(contentInformation.ref_name)}</Title>
            <FormInput 
                label='Alternative Name'
                name='alternative_name' 
                onChange={(e)=>{onChange(e.target.value); setAlternative(e.target.value)}}
                value={alternative}
            />
        </Container>
    )
}


export default ReferenceSettings