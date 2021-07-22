import HudContext from '@/context/hud-context'
import { ICoolFormat } from '@/utils/processogram'
import { transparentize } from 'polished'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { getElementViewBox } from '../processogram-helpers'
import { Container,TreeItem } from './hud-tree-control-styled'

interface IHudTreeControl {
    stackCoolFormat:ICoolFormat[]
}

const HudTreeControl = ({stackCoolFormat}:IHudTreeControl) => {

    // const { element,stackCoolFormat,onChange } = useContext(HudContext)

    const [localStack,setLocakStack] = useState<ICoolFormat[]>([])

    useEffect(()=>{
        setLocakStack([{
            domID:null,
            elementName:'Pig',
            level:-1,
            levelName:'Specie'
        },...stackCoolFormat])
    },[stackCoolFormat])

    const onTreeItemClick = ({domID,level}) => (event:Event) => {
        event.stopPropagation()
        // if(element.id!==domID && domID){            
        //     let svg = document.getElementById(stackCoolFormat[0].domID)
            
        //     let element_to_focus = level>0?svg.querySelector(`#${domID}`):svg

        //     let currentDomID = level>0?domID:null

        //     let viewBox = getElementViewBox(element_to_focus)
            
        //     onChange({
        //         viewBox,
        //         currentDomID,
        //         level                
        //     })
        // }     
    }

    return(
        <Container>
            {
                localStack.map(({domID,level,levelName,elementName,isHover},index) => (
                    <TreeItem 
                        style={{
                            paddingLeft:`${(level+1)*2}rem`,                            
                        }}
                        key={domID}
                        // active={element.id===domID}
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