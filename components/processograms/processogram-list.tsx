import { useEffect, useRef, useState } from "react"
import { TweenLite, gsap } from 'gsap'

import Processogram from "@/components/processograms/processogram"
import { SpeciesTypes } from "@/utils/enum_types"
import { SPECIES } from "@/utils/consts"
import { Container, SubContainer } from './processogram-list-styled'
import ProcessogramContext, {IMediaViewer, IProcessogramContext} from '@/context/processogram'
import FullScreenMediasViewer from "./hud/interative-menu/menu-tabs/full-screen-medias-viewer"
import { IMedia } from "@/utils/processogram"

gsap.registerPlugin(TweenLite)

export interface IProcessogramList {
    specie:SpeciesTypes
    collection:any[]
}



const ProcessogramList = ({specie,collection}:IProcessogramList) => {
    
    const containerRef = useRef<HTMLDivElement>(null)    

    const [onHover,setOnHover] = useState<string>(null)

    const [productionSystemSelected,setProductionSystemSelected] = useState(null)

    const [mediasViewer,setMediasViewer] = useState<IMediaViewer>({medias:[],index:0})

    const contextValue : IProcessogramContext = {collection,mediasViewer,setMediasViewer}

    return (   
        <ProcessogramContext.Provider value={contextValue}>            
            <Container ref={containerRef} hover={onHover} current={productionSystemSelected}>
                <SubContainer>
                    {
                        SPECIES[specie].map((productionSystem) => (
                            <Processogram
                                key={productionSystem}
                                specie={specie}
                                productionSystem={productionSystem}
                                hoverChange={setOnHover}
                                onSelect={setProductionSystemSelected}
                                productionSystemSelected={productionSystemSelected}
                            />
                        ))
                    }
                </SubContainer>                                      
            </Container>
            {
                mediasViewer.medias.length >0 &&
                <FullScreenMediasViewer />
            }            
        </ProcessogramContext.Provider>      
    )
}

export default ProcessogramList