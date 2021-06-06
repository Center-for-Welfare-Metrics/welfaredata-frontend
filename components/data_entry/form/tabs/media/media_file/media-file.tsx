import ContextMenu from '@/context/context-menu'
import { IMedia } from '@/context/data-entry'
import { DefaultEventComportamentOnContextMenuOpen } from '@/utils/context-menu'
import { useContext, useState } from 'react'
import FullScreenView from './full-screen-view'
import { Image, FullImage,Video,Thumb,Container,DialogMiniImage,DialogMiniThumb, DialogVideo } from './media-file-styled'
import Dialog from '@/components/common/dialog/dialog'

export interface IMediaFile {
    media:IMedia
    isLocal?:boolean
    disabledContext?:boolean
    deleteMedia?(media:IMedia):void
    deleteLocalMedia?(media:IMedia):void
}

const MediaFile = ({media,isLocal,deleteMedia,deleteLocalMedia,disabledContext}:IMediaFile) => {

    const [open,toggle] = useState(false)

    const [openDeleteDialog,setOpenDeleteDialog] = useState(false)

    const { setContextMenu } = useContext(ContextMenu)

    const onContextMenu = (event:MouseEvent) => {
        DefaultEventComportamentOnContextMenuOpen(event)
        if(!disabledContext){
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
                optionTarget:media,
                position:'mouse-oriented'
            })
        }
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
                onConfirm={isLocal?()=>deleteLocalMedia(media):()=>deleteMedia(media)}
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