import MediaFile from './media-file'
import { Container } from './list-styled'
import DataEntryContext, { IDataEntryFormInformations, IMedia } from '@/context/data-entry'
import React, { useContext } from 'react'
import toast from 'react-hot-toast'

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