import { useState } from 'react'
import FullScreenView from './full-screen-view'
import { Container, FullImage } from './media-file-styled'

export interface IMediaFile {
    src:string
}

const MediaFile = ({src}:IMediaFile) => {

    const [open,toggle] = useState(false)



    return (
        <>
            <Container onClick={()=>toggle(true)} style={{backgroundImage:`url(${src})`}} />
            { open && <FullScreenView onClose={()=>toggle(false)}>
                <FullImage src={src} />
            </FullScreenView> }        
        </>
    )
}


export default MediaFile