import { IMedia } from "@/context/data-entry"

import { Image,Thumbnail,Video } from './thumb-styled'

interface IThumb {
    media:IMedia
}

const Thumb = ({media}:IThumb) => {
    return (
        <>
            {   
                media.type.includes('image') && 
                <Image style={{backgroundImage:`url(${media.url})`}} /> 
            }
            
            { 
                media.type.includes('video') && 
                <Thumbnail>
                    <Video>
                        <source src={media.url+'#t=0.1'} type={media.type}></source>
                    </Video>
                </Thumbnail> 
            } 
        </>
    )
}







export default Thumb