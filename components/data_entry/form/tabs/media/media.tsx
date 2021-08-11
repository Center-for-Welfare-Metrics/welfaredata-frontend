import MediaFileList from "@/components/data_entry/form/tabs/media/media_file/list"

import { useRef } from "react"

import { Container,Section,Title } from './media-styled'

import UploadFile from "@/components/common/inputs/upload-file"

const MediasTab = () => {    

    const globalInputFileRef = useRef<HTMLInputElement>(null)

    const localInputFileRef = useRef<HTMLInputElement>(null)    

    return (
        <Container>       
            <Section>
                <Title>Global</Title>
                <MediaFileList medias={ [] } />
                <UploadFile                 
                    setFile={()=>{}}                
                    inputFileRef={globalInputFileRef}
                    progress={0}
                    onFetch={false}
                />
            </Section>
            <Section>
                <Title>Specific</Title>
                <MediaFileList isLocal={true} medias={ [] } />
                <UploadFile                 
                    setFile={()=>{}}                
                    inputFileRef={localInputFileRef}
                    progress={0}
                    onFetch={false}
                />
            </Section>
        </Container>
    )
}



export default MediasTab