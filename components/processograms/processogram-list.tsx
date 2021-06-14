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
}


const ProcessogramList = ({specie}:IProcessogramList) => {
    
    const containerRef = useRef<HTMLDivElement>(null)

    const [parentDimensions,setParentDimensions] = useState<any>(null)

    const [onHover,setOnHover] = useState<string>(null)

    const [currentProcessogram,setCurrentProcessogram] = useState<string>(null)

    const contextValue : IProcessogramContext = {onHover,setOnHover,currentProcessogram,setCurrentProcessogram,parentDimensions,setParentDimensions}

    

    useEffect(()=>{
        const resizeEvent = () => {            
            let {width,height,top,left} = containerRef.current.getBoundingClientRect()
            setParentDimensions({width,height,top,left})
        }
        resizeEvent()
        window.addEventListener('resize',resizeEvent)

        return () => window.removeEventListener('resize',resizeEvent)
    },[])

    useEffect(()=>{
        if(currentProcessogram){
            TweenLite.to(containerRef.current,{overflow:'hidden'}).duration(0)
        }
    },[currentProcessogram])

    return (   
        <ProcessogramContext.Provider value={contextValue}>            
            <Container ref={containerRef} hover={onHover} current={currentProcessogram}>
                {
                    SPECIES[specie].map((productionSystem,index) => (
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