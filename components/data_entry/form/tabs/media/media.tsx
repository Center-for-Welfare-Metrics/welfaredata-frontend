import MediaFileList from "@/components/common/media_file/list"
import DataEntryContext, { IDataEntryFormInformations } from "@/context/data-entry"
import { useContext, useEffect, useRef, useState } from "react"

import { Container } from './media-styled'

import { Title } from '../tab-commons-styled'

import processogramApi from '@/api/processogram'
import UploadFile from "@/components/common/inputs/upload-file"
import voca from 'voca'

const MediasTab = () => {

    const {currentInformations,currentFieldReference,updateCurrentInformations} = useContext(DataEntryContext)

    const [file,setFile] = useState<any>(null)

    const [progress,setProgress] = useState(0)

    const [onFetch,setOnFetch] = useState(false)

    useEffect(()=>{
        if(file){
            submitFile()
        }
    },[file])

    const inputFileRef = useRef<HTMLInputElement>(null)

    const onUploadProgress = (progressEvent:ProgressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        setProgress(percentCompleted)        
    }


    const submitFile = () => {                
        let reference : IDataEntryFormInformations = currentInformations[currentFieldReference]
        const formData = new FormData()
        formData.append('file',file)
        setOnFetch(true)
        processogramApi.uploadFileToReference(currentFieldReference,reference._id,formData,onUploadProgress)
        .then(({data})=>{
            setFile(null)
            inputFileRef.current.value = null
            updateCurrentInformations({
                [currentFieldReference]:data
            },false)
            setProgress(0)
            setOnFetch(false)
        })
        .catch(console.log)        
    }

    return (
        <Container>
            {/* <Title>{ voca.titleCase(currentInformations[currentFieldReference]?.name) }</Title> */}
            <MediaFileList medias={ currentInformations[currentFieldReference]?.medias || [] } />
            <UploadFile                 
                setFile={setFile}                
                inputFileRef={inputFileRef}
                progress={progress}
                onFetch={onFetch}
            />
        </Container>
    )
}



export default MediasTab