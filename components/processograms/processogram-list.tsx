import Processogram from "@/components/processograms/processogram"
import {Container} from '@/components/processograms/zoo-styled'
import ProcessogramContext from '@/context/processogram'
import { useContext, useEffect, useRef } from "react"
import { TweenLite, gsap } from 'gsap'

gsap.registerPlugin(TweenLite)

interface IProcessogramList {
    file_names:string[],
    folder:string
}

const ProcessogramList = ({file_names,folder}:IProcessogramList) => {

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
                    file_names.map((file_name) => (
                        <Processogram key={file_name} file_name={`${folder}/${file_name}`} />
                    ))
                }
            </Container>
    )
}

export default ProcessogramList