import Processogram from "@/components/processograms/processogram-unique"
import {Container} from '@/components/processograms/zoo-styled'
import ProcessogramContext from '@/context/processogram'
import { useContext, useEffect, useState } from "react"

const svg_file_names = ['european intensive.svg','enhanced intensive.svg','outdoor semi-intensive.svg']

interface IPigs{
    innerRef:any
}

const Pigs = ({innerRef}:IPigs) => {
    const {setAllRefsLoaded} = useContext(ProcessogramContext)

    let inte = 0

    const oneRefLoaded = () => {
        inte+=1
        if(inte===svg_file_names.length){
            setAllRefsLoaded(true)
        }
    }

    return (
            <Container ref={innerRef} >
                {
                    svg_file_names.map((file_name) => (
                        <Processogram onRefLoaded={oneRefLoaded} key={file_name} file_name={file_name} />
                    ))
                }
            </Container>
    )
}

export default Pigs