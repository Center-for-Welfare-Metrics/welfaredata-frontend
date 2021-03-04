import MediaFile from '.'
import { Container } from './list-styled'

interface IMediaFileList {
    srcs:string[]
}


const MediaFileList = ({srcs}:IMediaFileList) => {
    return (
        <Container>
            {
                srcs.map((src) => (
                    <MediaFile 
                        key={src}
                        src={src}
                    />
                ))
            }
        </Container>
    )
}


export default MediaFileList