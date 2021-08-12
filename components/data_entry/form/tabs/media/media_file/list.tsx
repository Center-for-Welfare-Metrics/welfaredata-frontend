import MediaFile from './media-file'
import { Container } from './list-styled'

import React from 'react'
import { IMedia } from '@/utils/processogram'

interface IMediaFileList {
    medias:IMedia[],
    isLocal?:boolean
}


const MediaFileList = ({medias,isLocal=false}:IMediaFileList) => {    

    

    return (
        <Container>
            {
                medias.map((media) => (
                    <MediaFile isLocal={isLocal} media={media} key={media._id} />
                ))
            }
        </Container>
    )
}


export default MediaFileList