import FullScreenView from '@/components/data_entry/form/tabs/media/media_file/full-screen-view'
import { IMedia } from '@/utils/processogram'
import { useEffect } from 'react'
import { useState } from 'react'
import { MediaList, MediaStyled, FullScreenImage } from './media-tab-styled'
import React from 'react'
import { useContext } from 'react'
import ProcessogramContext from '@/context/processogram'

export interface IMediaComponent {
    media:IMedia
    onClick(event:Event,index:number):void
    index:number
}

const Media = ({media,onClick,index}:IMediaComponent) => {        

     

    return(
        <>
            <MediaStyled style={{backgroundImage:`url(${media.url})`}} onClick={(e)=>onClick(e,index)}>
                
            </MediaStyled>
        </>
    )

}

export interface IMediaTab{
    medias:IMedia[]
    ref_medias:IMedia[]
}

const MediaTab = ({medias,ref_medias}:IMediaTab) => {    

    const { setMediasViewer } = useContext(ProcessogramContext)

    const mediaClick = (event:Event,index:number) => {
        event.stopPropagation()
        setMediasViewer({medias:[...medias,...ref_medias],index:index})
    } 

    return (
        <MediaList>            
            {
                [...medias,...ref_medias].map((media,index) => (
                    <Media 
                        key={media._id}
                        media={media}
                        onClick={mediaClick}
                        index={index}
                    />
                ))
            }
        </MediaList>
    )
}



export default React.memo(MediaTab)