import MediaFileList from "@/components/data_entry/form/tabs/media/media_file/list"
import DataEntryContext, { IDataEntryFormInformations } from "@/context/data-entry"
import { useContext, useEffect, useRef, useState } from "react"

import { Container,Section,Title } from './media-styled'

import processogramApi from '@/api/processogram'
import UploadFile from "@/components/common/inputs/upload-file"

import toast from "react-hot-toast"

const MediasTab = () => {

    const {currentInformations,currentFieldReference,updateCurrentInformations,idTree} = useContext(DataEntryContext)

    const [globalFile,setGlobalFile] = useState<any>(null)
    const [localFile,setLocalFile] = useState<any>(null)

    const [progress,setProgress] = useState(0)

    const [onFetchGlobal,setOnFetchGlobal] = useState(false)

    const [onFetchLocal,setOnFetchLocal] = useState(false)

    useEffect(()=>{
        if(globalFile){
            submitGlobalFile()
        }
    },[globalFile])

    useEffect(()=>{
        if(localFile){
            submitLocalFile()
        }
    },[localFile])

    const globalInputFileRef = useRef<HTMLInputElement>(null)

    const localInputFileRef = useRef<HTMLInputElement>(null)

    const onUploadProgress = (progressEvent:ProgressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        setProgress(percentCompleted)        
    }

    const submitLocalFile = () => {                        
        const formData = new FormData()
        formData.append('id_tree',JSON.stringify({...idTree,_id:undefined}))
        formData.append('file',localFile)
        setOnFetchLocal(true)
        processogramApi.uploadLocalFile(idTree._id,formData,onUploadProgress)
        .then(({data})=>{
            setGlobalFile(null)
            globalInputFileRef.current.value = null
            updateCurrentInformations({
                medias:data.medias
            },false)
            setProgress(0)
            setOnFetchLocal(false)
        })
        .catch(() => {
            setOnFetchLocal(false)
            toast.error('Something gone wrong. Try again later.')
        })   
    }

    const submitGlobalFile = () => {                
        let reference : IDataEntryFormInformations = currentInformations[currentFieldReference]
        const formData = new FormData()
        formData.append('file',globalFile)
        setOnFetchGlobal(true)
        processogramApi.uploadFileToReference(currentFieldReference,reference._id,formData,onUploadProgress)
        .then(({data})=>{
            setGlobalFile(null)
            globalInputFileRef.current.value = null
            updateCurrentInformations({
                [currentFieldReference]:data
            },false)
            setProgress(0)
            setOnFetchGlobal(false)
        })
        .catch(() => {
            setOnFetchGlobal(false)
            toast.error('Something gone wrong. Try again later.')
        })   
    }

    return (
        <Container>       
            <Section>
                <Title>Global</Title>
                <MediaFileList medias={ currentInformations[currentFieldReference]?.medias || [] } />
                <UploadFile                 
                    setFile={setGlobalFile}                
                    inputFileRef={globalInputFileRef}
                    progress={progress}
                    onFetch={onFetchGlobal}
                />
            </Section>
            <Section>
                <Title>Specific</Title>
                <MediaFileList isLocal={true} medias={ currentInformations.medias || [] } />
                <UploadFile                 
                    setFile={setLocalFile}                
                    inputFileRef={localInputFileRef}
                    progress={progress}
                    onFetch={onFetchLocal}
                />
            </Section>
        </Container>
    )
}



export default MediasTab