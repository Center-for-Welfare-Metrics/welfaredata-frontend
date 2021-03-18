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

    const { currentInformations,currentFieldReference,updateReferenceData,handleLocalInputChange } = useContext(DataEntryContext)

    const deleteMedia = (media) => {
        let reference : IDataEntryFormInformations = currentInformations[currentFieldReference]        
        let medias  = reference.medias
        let indexOfDelete = medias.findIndex(x => x._id === media._id)
        medias.splice(indexOfDelete,1)
        updateReferenceData({medias},()=>{
            toast.success('Global media deleted successfully!')   
        }) 
    }

    const deleteLocalMedia = (media) => {        
        let medias  = currentInformations.medias        
        let indexOfDelete = medias.findIndex(x => x._id === media._id)
        medias.splice(indexOfDelete,1)
        handleLocalInputChange({medias},false)
        toast.success('Specific media deleted successfully!')
    }

    return (
        <Container>
            {
                medias.map((media) => (
                    <MediaFile deleteMedia={deleteMedia} deleteLocalMedia={deleteLocalMedia} isLocal={isLocal} media={media} key={media._id} />
                ))
            }
        </Container>
    )
}


export default MediaFileList