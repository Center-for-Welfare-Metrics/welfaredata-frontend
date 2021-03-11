import ContextMenu from '@/context/context-menu'
import DataEntryContext, { IDataEntryFormInformations, IMedia } from '@/context/data-entry'
import { DefaultEventComportamentOnContextMenuOpen } from '@/utils/context-menu'
import { useContext, useState } from 'react'
import FullScreenView from './full-screen-view'
import { Image, FullImage,Video,Thumb,Container,DialogMiniImage,DialogMiniThumb, DialogVideo } from './media-file-styled'
import Dialog from '@/components/common/dialog/dialog'
import toast from 'react-hot-toast'

export interface IMediaFile {
    media:IMedia
    isLocal?:boolean
}

const MediaFile = ({media,isLocal}:IMediaFile) => {

    const [open,toggle] = useState(false)

    const [openDeleteDialog,setOpenDeleteDialog] = useState(false)

    const { setContextMenu } = useContext(ContextMenu)

    const { currentInformations,currentFieldReference,updateReferenceData,handleLocalInputChange } = useContext(DataEntryContext)

    const onContextMenu = (event:MouseEvent) => {
        DefaultEventComportamentOnContextMenuOpen(event)
        setContextMenu({
            open:true,
            type:'options',
            options:[{
                text:'Open',
                icon:'push-pin',
                onClick:()=>toggle(true),
                type:'primary'
            },{
                text:'Delete',
                icon:'eliminar',
                onClick:()=>setOpenDeleteDialog(true),
                type:'danger'
            }],
            x:event.clientX,
            y:event.clientY,
            optionTarget:media            
        })
    }
    
    const deleteMedia = () => {
        let reference : IDataEntryFormInformations = currentInformations[currentFieldReference]        
        let medias  = reference.medias
        let indexOfDelete = medias.findIndex(x => x._id === media._id)
        medias.splice(indexOfDelete,1)
        updateReferenceData({medias},()=>{
            toast.success('Global media deleted successfully!')   
        }) 
    }

    const deleteLocalMedia = () => {        
        let medias  = currentInformations.medias
        console.log(medias,media)
        let indexOfDelete = medias.findIndex(x => x._id === media._id)
        console.log(indexOfDelete)
        medias.splice(indexOfDelete,1)
        handleLocalInputChange({medias},false)
        toast.success('Specific media deleted successfully!')
    }

    return (    
        <>       
        <Container onContextMenu={onContextMenu}>         
            {   
                media.type.includes('image') && 
                <Image onClick={()=>toggle(true)} style={{backgroundImage:`url(${media.url})`}} /> 
            }
            
            { 
                media.type.includes('video') && 
                <Thumb>
                    <Video onClick={()=>toggle(true)}>
                        <source src={media.url+'#t=0.1'} type={media.type}></source>
                    </Video>
                </Thumb> 
            }           
            <Dialog 
                isOpen={openDeleteDialog}
                onClose={()=>setOpenDeleteDialog(null)}                
                confirmText='Delete'
                title={
                    <>
                        Do you really want to remove <br/>
                        {
                            media.type.includes('image') && 
                            <DialogMiniImage style={{backgroundImage:`url(${media.url})`}} />
                        }
                        {
                            media.type.includes('video') && 
                            <DialogMiniThumb><DialogVideo><source src={media.url+'#t=0.1'} type={media.type}></source></DialogVideo></DialogMiniThumb>
                        }
                        "{media.originalName}"?
                    </>
                }
                subtitle='this action cannot be undone'
                onConfirm={isLocal?deleteLocalMedia:deleteMedia}
                type='danger'                    
            />            
        </Container>   
        {   
            open && 
            <FullScreenView onContextMenu={DefaultEventComportamentOnContextMenuOpen} onClose={()=>toggle(false)}>                
                { media.type.includes('image') && <FullImage src={media.url} /> }
                { media.type.includes('video') && <Video autoPlay controls><source src={media.url} type={media.type}></source></Video> }
            </FullScreenView> 
        }      
        </>                
    )
}


export default MediaFile