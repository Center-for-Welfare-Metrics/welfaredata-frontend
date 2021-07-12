import FullScreenView from '@/components/data_entry/form/tabs/media/media_file/full-screen-view'
import { IMedia } from '@/utils/processogram'
import { useState } from 'react'
import { MediaList, MediaStyled, FullScreenImage } from './media-tab-styled'

export interface IMediaTab{
    medias:IMedia[]
}

export interface IMediaComponent {
    media:IMedia
}

const Media = ({media}:IMediaComponent) => {

    const [fullScreen,setFullScreen] = useState(false)

    const mediaClick = (event:Event) => {
        event.stopPropagation()
        setFullScreen(true)
    }

    return(
        <>
            <MediaStyled onClick={mediaClick}>
                <img src={media.url} />                        
            </MediaStyled>
            {
                fullScreen && 
                <FullScreenView 
                    onClose={(e)=>{e.stopPropagation();setFullScreen(false)}}                
                >
                    <FullScreenImage src={media.url} />
                </FullScreenView>
            }
        </>
    )

}

const MediaTab = ({medias}:IMediaTab) => {
    return (
        <MediaList>
            <div style={{
                position:'absolute',
                top:'50%',
                left:'50%',
                transform:'translate(-50%,-30%)',
                fontSize:'2rem',
                backgroundColor:'#000000ce',
                textAlign:'center',
                padding:'1rem'}
            }>
                - work in progress -
            </div>
            {
                medias.map((media) => (
                    <Media 
                        key={media._id}
                        media={media}
                    />
                ))
            }
        </MediaList>
    )
}



export default MediaTab