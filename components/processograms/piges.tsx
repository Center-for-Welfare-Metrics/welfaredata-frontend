import Processogram from "@/components/processograms/processogram-unique"
import {Container} from '@/components/processograms/zoo-styled'
import ProcessogramContext from '@/context/processogram'
import { useContext, useEffect, useRef } from "react"
import { TweenLite, gsap } from 'gsap'

gsap.registerPlugin(TweenLite)

const svg_file_names = ['european intensive.svg','enhanced intensive.svg','outdoor semi-intensive.svg']

const Pigs = () => {

    const {choosen} = useContext(ProcessogramContext)

    const containerRef = useRef(null)

    useEffect(()=>{
        if(choosen){
            TweenLite.to(containerRef.current,{
                marginTop:'0',
                position:'absolute',
                top:0,
                overflow:'hidden'
            }).delay(1).duration(0)
        }else{
            TweenLite.to(containerRef.current,{
                marginTop:'6rem',
                position:'static',
                overflow:'auto'
            })
        }
    },[choosen])

    return (
            <Container ref={containerRef} type={choosen?'1':'0'} >
                {
                    svg_file_names.map((file_name) => (
                        <Processogram key={file_name} file_name={file_name} />
                    ))
                }
            </Container>
    )
}

export default Pigs