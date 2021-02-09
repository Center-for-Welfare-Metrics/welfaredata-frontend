import Processogram from "@/components/processograms/processogram-unique"
import {Container} from '@/components/processograms/zoo-styled'
import ProcessogramContext from '@/context/processogram'
import { useContext, useEffect, useState } from "react"

const svg_file_names = ['european intensive.svg','enhanced intensive.svg','outdoor semi-intensive.svg']

interface IPigs{
    innerRef:any
}

const Pigs = ({innerRef}:IPigs) => {

    return (
            <Container ref={innerRef} >
                {
                    svg_file_names.map((file_name) => (
                        <Processogram key={file_name} file_name={file_name} />
                    ))
                }
            </Container>
    )
}

export default Pigs