import Processogram from "@/components/processograms/processogram"
import { SpeciesTypes } from "@/utils/enum_types"
import { SPECIES } from "@/utils/consts"

import { Container } from './processogram-list-styled'

import { TweenLite, gsap } from 'gsap'
import { useEffect, useRef, useState } from "react"

import ProcessogramContext, {IProcessogram, IProcessogramContext} from '@/context/processogram'

gsap.registerPlugin(TweenLite)

export interface IProcessogramList {
    specie:SpeciesTypes
    collection:any[]
}


const ProcessogramList = ({specie,collection}:IProcessogramList) => {
    
    const containerRef = useRef<HTMLDivElement>(null)    

    const [onHover,setOnHover] = useState<string>(null)

    const [currentProcessogram,setCurrentProcessogram] = useState<string>(null)

    const [focusedFigure,setFocusedFigure] = useState<string>(null)

    const contextValue : IProcessogramContext = {onHover,setOnHover,currentProcessogram,setCurrentProcessogram,focusedFigure,setFocusedFigure}

    const [scrollTop,setScrollTop] = useState(0)

    const [stack,setStack] = useState([])

    useEffect(()=>{
        console.log(collection)
    },[collection])

    useEffect(()=>{
        if(currentProcessogram){            
            setScrollTop(containerRef.current.scrollTop)
            setFocusedFigure(currentProcessogram)
            TweenLite.to(containerRef.current,{overflow:'hidden'}).duration(0)            
        }else{
            setFocusedFigure(null)
            if(containerRef.current){                
                TweenLite.to(containerRef.current,{overflow:'auto'}).duration(0)
                .then(()=>{
                    containerRef.current.scrollTo(0,scrollTop)
                })                
            }
        }
    },[currentProcessogram])

    return (   
        <ProcessogramContext.Provider value={contextValue}>            
            <Container ref={containerRef} hover={onHover} current={currentProcessogram}>                
                {
                    SPECIES[specie].map((productionSystem) => (
                        <Processogram
                            key={productionSystem}
                            specie={specie}
                            productionSystem={productionSystem}
                        />
                    ))
                }                       
            </Container> 
        </ProcessogramContext.Provider>      
    )
}

export default ProcessogramList