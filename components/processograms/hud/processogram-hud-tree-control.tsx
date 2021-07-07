import HudContext from '@/context/hud-context'
import ProcessogramContext from '@/context/processogram'
import { normalizeElementNameByGivingID } from '@/utils/processogram'
import { useContext } from 'react'
import { getElementViewBox } from '../processogram-helpers'
import { Container,TreeItem } from './processogram-hud-legends-styled'



const ProcessogramHudTreeControl = () => {

    const { element,stackCoolFormat,onChange } = useContext(HudContext)
    const { currentProcessogram } = useContext(ProcessogramContext)

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
                stackCoolFormat.map(({domID,level,levelName,elementName}) => (
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