import { useEffect, useRef, useState } from "react"
import { TweenLite, gsap } from 'gsap'

import Processogram from "@/components/processograms/processogram"
import { SpeciesTypes } from "@/utils/enum_types"
import { SPECIES } from "@/utils/consts"
import { Container, SubContainer } from './processogram-list-styled'
import ProcessogramContext, {ImainState, IProcessogramContext} from '@/context/processogram'

gsap.registerPlugin(TweenLite)

export interface IProcessogramList {
    specie:SpeciesTypes
    collection:any[]
}



const ProcessogramList = ({specie,collection}:IProcessogramList) => {
    
    const containerRef = useRef<HTMLDivElement>(null)    

    const [onHover,setOnHover] = useState<string>(null)

    const [productionSystemSelected,setProductionSystemSelected] = useState(null)

    const contextValue : IProcessogramContext = {collection}

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
                            />
                        ))
                    }
                </SubContainer>                                      
            </Container> 
        </ProcessogramContext.Provider>      
    )
}

export default ProcessogramList