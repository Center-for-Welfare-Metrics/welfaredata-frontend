import { useRef, useState } from "react"
import { TweenLite, gsap } from 'gsap'
gsap.registerPlugin(TweenLite)
import Processogram from "@/components/processograms/processogram"
import { SpeciesTypes } from "@/utils/enum_types"
import { SPECIES } from "@/utils/consts"
import { Container, SubContainer,OverlapingMaster } from './processogram-list-styled'
import ProcessogramContext, {IMediaViewer, IProcessogramContext} from '@/context/processogram'
import FullScreenMediasViewer from "./hud/interative-menu/menu-tabs/full-screen-medias-viewer"

import { useRouter } from 'next/router'
import { useEffect } from "react"

export interface IProcessogramList {
    specie:SpeciesTypes
    collection:any[]
}



const ProcessogramList = ({specie,collection}:IProcessogramList) => {
    
    const containerRef = useRef<HTMLDivElement>(null)    

    const [onHover,setOnHover] = useState<string>(null)

    const [productionSystemSelected,setProductionSystemSelected] = useState(null)

    const [mediasViewer,setMediasViewer] = useState<IMediaViewer>({medias:[],index:0})

    const [NAOPODEUSAR,PROIBIDO] = useState(false)

    const contextValue : IProcessogramContext = {collection,mediasViewer,setMediasViewer}

    const router = useRouter()
    
    const loadSharedLink = (s:string) => {
        setTimeout(() => {
            try {
                let svg = document.querySelector(`#${s}`)        
                if(svg){
                    let evObj = document.createEvent('Events')
                    evObj.initEvent('click', true, false)
                    svg.dispatchEvent(evObj)                
                    PROIBIDO(false)
                } 
            } catch (error) {
                console.log('para de tentar besteira aí')
            }
                 
        }, 500);    
    }
    
    useEffect(() => {
        if(!router.query.s){
            PROIBIDO(false)
        }else{
            PROIBIDO(true)
            loadSharedLink(router.query.s as string)
        }
    }, [router.query.s]);

    return (   
        <ProcessogramContext.Provider value={contextValue}>   
            {
                NAOPODEUSAR &&
                <OverlapingMaster onContextMenu={(e)=>e.stopPropagation()} />         
            }
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
                                listContainerRef={containerRef.current}
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