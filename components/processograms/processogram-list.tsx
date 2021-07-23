import { useRef, useState } from "react"
import { TweenLite, gsap } from 'gsap'
gsap.registerPlugin(TweenLite)
import Processogram from "@/components/processograms/processogram"
import { SpeciesTypes } from "@/utils/enum_types"
import { SPECIES } from "@/utils/consts"
import { Container, SubContainer,OverlapingMaster } from './processogram-list-styled'
import ProcessogramContext, {IMediaViewer, IProcessogramContext} from '@/context/processogram'
import FullScreenMediasViewer from "./hud/interative-menu/menu-tabs/full-screen-medias-viewer"
import InterativeMenu from './hud/interative-menu/interative-menu'
import { useRouter } from 'next/router'
import { useEffect } from "react"
import { translateStackToCoolFormat } from "@/utils/processogram"
import HudTreeControl from "./hud/hud-tree-control"

import update from 'immutability-helper'

export interface ISpecie{
    _id:SpeciesTypes
    description:string
}

export interface IProcessogramList {
    specie:ISpecie
    collection:any[]
}



const ProcessogramList = ({specie,collection}:IProcessogramList) => {
    
    const containerRef = useRef<HTMLDivElement>(null)    

    const [onHover,setOnHover] = useState<string>(null)

    const [ghost,setGhost] = useState(null)

    const [productionSystemSelected,setProductionSystemSelected] = useState(null)

    const [mediasViewer,setMediasViewer] = useState<IMediaViewer>({medias:[],index:0})

    const [NAOPODEUSAR,PROIBIDO] = useState(false)

    const [stack,setStack] = useState<string[]>([])

    const contextValue : IProcessogramContext = {collection,mediasViewer,setMediasViewer,stack,setStack}

    const [shareString,setShareString] = useState('')

    const router = useRouter()
    
    useEffect(() => {
        let location = window.location.href
        if(!productionSystemSelected){
            setStack([])
            setShareString(location)
        }else{
            let x = location+`?s=${productionSystemSelected}`                                               
            setShareString(x)
        }
    },[productionSystemSelected])    

    const timeout = useRef(null)

    useEffect(() => {
        clearTimeout(timeout.current)

        timeout.current = setTimeout(() => {
            if(productionSystemSelected===null){
                setGhost(onHover)
            }else{
                setGhost(null)
            }
        }, 250);
       
    },[onHover,productionSystemSelected])

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
                        SPECIES[specie._id].map((productionSystem) => (
                            <Processogram
                                key={productionSystem}
                                specie={specie._id}
                                productionSystem={productionSystem}
                                hoverChange={setOnHover}
                                onSelect={setProductionSystemSelected}
                                productionSystemSelected={productionSystemSelected}
                                listContainerRef={containerRef.current}
                                setGhost={setGhost}
                            />
                        ))
                    }
                </SubContainer> 
                <InterativeMenu 
                    shareString={shareString}
                    stackCoolFormat={translateStackToCoolFormat([...stack,ghost])}
                    specie={specie}
                />
                <HudTreeControl 
                    stackCoolFormat={translateStackToCoolFormat([...stack,ghost])}                    
                />                                                                  
            </Container>
            {
                mediasViewer.medias.length >0 &&
                <FullScreenMediasViewer />
            }            
        </ProcessogramContext.Provider>      
    )
}

export default ProcessogramList