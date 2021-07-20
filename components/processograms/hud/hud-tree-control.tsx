import HudContext from '@/context/hud-context'
import { useContext } from 'react'
import { getElementViewBox } from '../processogram-helpers'
import { Container,TreeItem } from './hud-tree-control-styled'


const HudTreeControl = () => {

    const { element,stackCoolFormat,onChange } = useContext(HudContext)

    const onTreeItemClick = ({domID,level}) => (event:Event) => {
        event.stopPropagation()
        if(element.id!==domID && domID){            
            let svg = document.getElementById(stackCoolFormat[0].domID)
            
            let element_to_focus = level>0?svg.querySelector(`#${domID}`):svg

            let currentDomID = level>0?domID:null

            let viewBox = getElementViewBox(element_to_focus)
            
            onChange({
                viewBox,
                currentDomID,
                level                
            })
        }     
    }

    return(
        <Container>
            {
                stackCoolFormat.map(({domID,level,levelName,elementName,isHover},index) => (
                    <TreeItem 
                        style={{
                            marginLeft:`${(level+1)*2}rem`,
                        }} 
                        key={domID}
                        active={element.id===domID}
                        onClick={onTreeItemClick({domID,level})}
                        ishover={isHover}
                    > 
                        {levelName} : {elementName} 
                    </TreeItem>
                ))
            }            
        </Container>
    )
}


export default HudTreeControl