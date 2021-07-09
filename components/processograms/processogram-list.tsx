import { useEffect, useRef, useState } from "react"
import { TweenLite, gsap } from 'gsap'

import Processogram from "@/components/processograms/processogram"
import { SpeciesTypes } from "@/utils/enum_types"
import { SPECIES } from "@/utils/consts"
import { Container, SubContainer } from './processogram-list-styled'
import ProcessogramContext, {IProcessogramContext} from '@/context/processogram'

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

    const contextValue : IProcessogramContext = {onHover,setOnHover,currentProcessogram,setCurrentProcessogram,focusedFigure,setFocusedFigure,collection}

    const [scrollTop,setScrollTop] = useState(0)

    useEffect(()=>{
        if(currentProcessogram){            
            setScrollTop(containerRef.current.scrollTop)
            TweenLite.to(containerRef.current,{overflow:'hidden'})
            setFocusedFigure(currentProcessogram)                     
        }else{
            setFocusedFigure(null)            
            // setTimeout(() => {
            //     containerRef.current.scrollTop = scrollTop    
            // }, 1000);
            TweenLite.to(containerRef.current,{overflow:'auto'})
        }
    },[currentProcessogram])

    return (   
        <ProcessogramContext.Provider value={contextValue}>            
            <Container ref={containerRef} hover={onHover} current={currentProcessogram}>
                <SubContainer>
                    {
                        SPECIES[specie].map((productionSystem) => (
                            <Processogram
                                key={productionSystem}
                                specie={specie}
                                productionSystem={productionSystem}
                                gambiarraRef={{ref:containerRef.current,scrollTop:scrollTop}}
                            />
                        ))
                    }
                </SubContainer>                                      
            </Container> 
        </ProcessogramContext.Provider>      
    )
}

export default ProcessogramList