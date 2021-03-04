import MediaFile from "@/components/common/media_file"
import MediaFileList from "@/components/common/media_file/list"
import DataEntryContext from "@/context/data-entry"
import { useContext } from "react"

import { Container } from './media-styled'

const temp_medias = [
    'https://www.petz.com.br/blog/wp-content/uploads/2020/09/mini-porco-de-estimacao.jpg',
    'https://www.segredosdosonho.com.br/wp-content/uploads/2018/06/cropped-Significado-de-sonhar-com-porco-1-840x400.jpg',
    'https://i0.statig.com.br/bancodeimagens/e7/86/hj/e786hj4ij5rsgnaskazifxl76.jpg'
]

const MediasTab = () => {

    const {currentInformations} = useContext(DataEntryContext)


    return (
        <Container>
            <MediaFileList srcs={temp_medias} />
        </Container>
    )
}



export default MediasTab