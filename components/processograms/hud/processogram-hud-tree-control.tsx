import HudContext from '@/context/hud-context'
import ProcessogramContext from '@/context/processogram'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { getElementViewBox } from '../processogram-helpers'
import { Container,TreeItem } from './processogram-hud-tree-control-styled'


const ProcessogramHudTreeControl = () => {

    const { element,stackCoolFormat,onChange } = useContext(HudContext)
    const { currentProcessogram } = useContext(ProcessogramContext)

    const [localCoolStack,setLocalCoolStack] = useState(stackCoolFormat)

    useEffect(()=>{
        // setTimeout(() => {
            setLocalCoolStack(stackCoolFormat)
        // }, 500);        
    },[stackCoolFormat])

    const onTreeItemClick = ({domID,level}) => (event:Event) => {
        event.stopPropagation()
        if(element.id!==domID){
            let svg = document.getElementById(currentProcessogram)
            
            let element_to_focus = level>1?svg.querySelector(`#${domID}`):svg

            let innerCurrent = level>1?domID:null

            let viewBox = getElementViewBox(element_to_focus)

            onChange({
                viewBox,
                innerCurrent,
                level
            })   
        }     
    }

    return(
        <Container>
            {
                localCoolStack.map(({domID,level,levelName,elementName},index) => (
                    <TreeItem 
                        style={{
                            marginLeft:`${(level-1)*2}rem`,
                        }} 
                        key={domID}
                        active={element.id===domID}
                        onClick={onTreeItemClick({domID,level})}                        
                    > 
                        {levelName} : {elementName} 
                    </TreeItem>
                ))
            }            
        </Container>
    )
}


export default ProcessogramHudTreeControl