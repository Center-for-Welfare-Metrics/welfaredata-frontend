import Processogram from "@/components/processograms/processogram"
import { SpeciesTypes } from "@/utils/enum_types"
import { SPECIES } from "@/utils/consts"

import { Container } from './processogram-list-styled'

import { TweenLite, gsap } from 'gsap'
import { useState } from "react"

import ProcessogramContext, {IProcessogramContext} from '@/context/processogram'

gsap.registerPlugin(TweenLite)

export interface IProcessogramList {
    specie:SpeciesTypes
}


const ProcessogramList = ({specie}:IProcessogramList) => {
    
    const [onHover,setOnHover] = useState<string>(null)

    const [currentProcessogram,setCurrentProcessogram] = useState(null)

    const contextValue : IProcessogramContext = {onHover,setOnHover,currentProcessogram,setCurrentProcessogram}

    return (   
        <ProcessogramContext.Provider value={contextValue}>
            <Container hover={onHover} current={currentProcessogram}>
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