import { useContext, useEffect, useRef } from 'react'
import { TweenLite } from 'gsap'
import { Container,Svg } from './ProcessogramStyled'
import ProcessogramContext from '@/context/processogram'
import { getElementByLayerSufix } from '@/utils/processogram';

interface IProcessogram {
    file_name:string
}

const Processogram = ({file_name}:IProcessogram) => {

    const {choosen,setChoosen} = useContext(ProcessogramContext)

    useEffect(()=>{
        if(choosen){

        }
    },[choosen])

    const svgRef = useRef<SVGElement>(null)

    const selectProcessogram = () => {
        // setChoosen(file_name)
    }

    const navigate = () => {

    }

    const selected = ({target}:React.MouseEvent<SVGElement,MouseEvent>) => {
        setChoosen(file_name)
        levelChanger(target,'--ps')
    }

    const zoomOnElement = (element:HTMLElement) => {
        // let {processogram} = this.props
        // this.newSelected(element,sufix)
        let elementRect = element.getBoundingClientRect()
        
        // let position = {
        //     x:(window.innerWidth/2) - (((clientRect.x - svg_rect.left) + (clientRect.width/2))),
        //     y:(window.innerHeight/2) - ((clientRect.y + (clientRect.height/2)))
        // }

        // let new_gsap = {
        //     // x:0,
        //     // y:0,
        //     scale:0,
        //     // duration:1
        // }

        // let last_gsap = {
        //     x:0,
        //     y:0,
        //     scale:1,
        //     duration:1
        // }

        let scale = getScaleTo(elementRect)        
        // let next_height = (clientRect.height/last_gsap.scale) * new_gsap.scale
        // let next_top = ((((clientRect.top - last_gsap.y) - (svg_rect.top - last_gsap.y))/last_gsap.scale) * new_gsap.scale) + (svg_rect.top - last_gsap.y)
        // // new_gsap.x = ((last_gsap.x + (position.x))/last_gsap.scale)*new_gsap.scale
        // // new_gsap.y = (window.innerHeight/2) - (next_top + (next_height/2))
        TweenLite.fromTo(svgRef.current,{
            scale,
            top:elementRect.top,
            left:elementRect.left,
            zIndex:'999'
        },{
            position:'fixed',
            top:(window.innerHeight/2)-(elementRect.height/2),
        })
        // this.addGsapToLevel(this.state.level,new_gsap)
    }

    const getScaleTo = (clientRect) => {
        let last_gsap = {
            x:0,
            y:0,
            scale:1,
            duration:1
        }
        let element_height = (clientRect.height)/last_gsap.scale
        let element_width = (clientRect.width)/last_gsap.scale
        
        let window_height = window.innerHeight - 200
        let window_width = window.innerWidth - 200
        
        let scale_to = window_width/(element_width + 20)
        let element_height_after_scale = ((element_height + 20) * scale_to)
        if(element_height_after_scale > window_height){
            scale_to = window_height/(element_height + 20)
        }
        return scale_to
    }

    const levelChanger = (target:EventTarget,sufix:string) => {
        let element = getElementByLayerSufix(target,sufix)
        if(element){    
            zoomOnElement(element)
        }
    }

    return (
        <Container>
            <Svg 
                off={(choosen && choosen!==file_name)?'true':'false'}
                innerRef={svgRef} 
                src={`/assets/svg/zoo/${file_name}`}
                onClick={selected}
            />         
        </Container>
    )
}


export default Processogram