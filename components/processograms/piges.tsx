import Processogram from "@/components/processograms/processogram-unique"
import {Container} from '@/components/processograms/zoo-styled'
import ProcessogramContext from '@/context/processogram'
import { useEffect, useRef, useState } from "react"


const svg_file_names = ['enhanced intensive.svg','european intensive.svg','outdoor semi-intensive.svg']
const Pigs = () => {

    const containerRef = useRef<SVGElement>(null)

    const [choosen,setChoosen] = useState(null)

    const [firstLoad,setFirstLoad] = useState(false)

    const pigsContextValue = {choosen,setChoosen}

    const [scrollY,setScrollY] = useState(0)

    useEffect(()=>{
        if(choosen){
            storeVerticalScrollScreenValue()
        }else{
            if(firstLoad){
                
            }else{
                setFirstLoad(true)
            }
        }
    },[choosen])

    const storeVerticalScrollScreenValue = () => {
        setScrollY(window.scrollY)
    }

    return (
        <ProcessogramContext.Provider value={pigsContextValue}>
            <Container ref={containerRef}>
                {
                    svg_file_names.map((file_name) => (
                        <Processogram scrollY={scrollY} key={file_name} file_name={file_name} />
                    ))
                }
            </Container>
        </ProcessogramContext.Provider>
    )
}



export default Pigs