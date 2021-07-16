import { Container,Image,ThumbnailImage } from './full-screen-medias-viewer-styled'
import { useContext } from 'react';
import ProcessogramContext from '@/context/processogram';
import ImageGallery from 'react-image-gallery'

const FullScreenMediasViewer = () => {

    const { mediasViewer,setMediasViewer } = useContext(ProcessogramContext)

    const clickOut = (e:Event) => {
        e.stopPropagation()
        setMediasViewer({medias:[],index:0})
    }

    return(        
        <Container onClick={clickOut} onContextMenu={(e)=>e.stopPropagation()}>
            <div style={{maxWidth:'80vw',margin:'auto'}} onClick={(e)=>e.stopPropagation()}>
                <ImageGallery items={mediasViewer.medias.map((media)=> ({
                        original:media.url,
                        thumbnail:media.url,
                        originalTitle:media.originalName
                    }) )} 
                    showPlayButton={false}
                    // stopPropagation={true}
                    showBullets={true}
                    startIndex={mediasViewer.index}
                />
            </div>
        </Container>
    )

}





export default FullScreenMediasViewer