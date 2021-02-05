import Processogram from "./processogram"
import {Container} from './zoo-styled'
import ProcessogramContext from '@/context/processogram'
import { useEffect, useRef, useState } from "react"
import { TweenLite } from 'gsap'


const svg_file_names = ['enhanced intensive.svg','european intensive.svg','outdoor semi-intensive.svg','conventional cages.svg']
const Pigs = () => {

    const containerRef = useRef<SVGElement>(null)

    const [choosen,setChoosen] = useState(null)

    const pigsContextValue = {choosen,setChoosen}

    useEffect(()=>{
        
    },[choosen])

    return (
        <ProcessogramContext.Provider value={pigsContextValue}>
            <Container ref={containerRef}>
                {
                    svg_file_names.map((file_name) => (
                        <Processogram key={file_name} file_name={file_name} />
                    ))
                }
            </Container>
        </ProcessogramContext.Provider>
    )
}



export default Pigs