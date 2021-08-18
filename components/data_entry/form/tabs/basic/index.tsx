import FormInput from "@/components/common/inputs/form-input"
import DataEntryContext from "@/context/data-entry"
import { useRef,useEffect,useState,useContext } from "react"
import voca from 'voca'
import processogramApi from '@/api/processogram'
import toast from "react-hot-toast"
import lodash from 'lodash'
import update from 'immutability-helper'

const BasicTab = () => {

    const { contentInformation,specie,setProcessograms,pathAsObject,processograms } = useContext(DataEntryContext)

    const [global,setGlobal] = useState('')

    const [specific,setSpecific] = useState('')

    const globalTimer = useRef(null)
    const specificTimer = useRef(null)

    useEffect(()=>{
        setGlobal(contentInformation?contentInformation.ref_description:specie.description)
        setSpecific(contentInformation?.description || '')
    },[contentInformation])

    const updateGlobal = (description) => {
        if(contentInformation){        
            clearTimeout(globalTimer.current)
            let { ref__id,levelName } = contentInformation
            globalTimer.current = setTimeout(() => {                
                processogramApi.updateReference(voca.camelCase(levelName),ref__id,{
                    description:description
                }).then((response) => {
                    setProcessograms(response.data)
                }).catch((error) => {
                    console.log(error)
                    toast.error("Can't do your request now. Please try later.")
                })                
            }, 500);
        }
    }

    const updateSpecific = (description) => {
        if(contentInformation){
            clearTimeout(specificTimer.current)        
            specificTimer.current = setTimeout(() => {                
                processogramApi.update({id_tree:pathAsObject.id_tree,values:{description}},pathAsObject.processogram_id)
                .then((response) => {
                    let index = lodash.findIndex(processograms,{_id:response.data._id})
                    setProcessograms(update(processograms,{
                        [index]:{$set:response.data}
                    }))                    
                }).catch((error) => {
                    console.log(error)
                    toast.error("Can't do your request now. Please try later.")
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
                    onChange={(e)=>{setSpecific(e.target.value);updateSpecific(e.target.value)}}
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