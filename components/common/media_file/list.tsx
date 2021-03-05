import MediaFile from './media-file'
import { Container } from './list-styled'
import { IMedia } from '@/context/data-entry'
import React from 'react'

interface IMediaFileList {
    medias:IMedia[]
}


const MediaFileList = ({medias}:IMediaFileList) => {
    return (
        <Container>
            {
                medias.map((media) => (
                    <MediaFile media={media} key={media._id} />
                ))
            }
        </Container>
    )
}


export default React.memo(MediaFileList)