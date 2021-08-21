import ProcessogramContext from '@/context/processogram'
import { ICoolFormat } from '@/utils/processogram'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Container,TreeItem } from './hud-tree-control-styled'
interface IHudTreeControl {
    stackCoolFormat:ICoolFormat[]
}

const HudTreeControl = ({stackCoolFormat}:IHudTreeControl) => {    

    const {specie} = useContext(ProcessogramContext)

    const [localStack,setLocakStack] = useState<ICoolFormat[]>([])

    const [top,setTop] = useState(0)

    const [ style,setStyle] = useState({
        maxWidth:null,
        left:0
    })

    const dict_gambiarra = {
        pig:'Pigs',
        chicken:'Laying Hens'
    }

    useEffect(()=>{
        setLocakStack([{
            domID:null,
            elementName:dict_gambiarra[specie._id],
            level:-1,
            levelName:'Species'
        },...stackCoolFormat])
    },[stackCoolFormat])

    useEffect(() => {
        let nav = document.getElementById('main-nav-menu')
        if(nav){
            let top = nav.getBoundingClientRect().height
            setTop(top)
        }
        let editorParent = document.getElementById('processogram-editor-space')
        if(editorParent){
            let {width,left} = editorParent.getBoundingClientRect()
            setStyle({
                maxWidth:width,
                left: left
            })            
        }
    },[])

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
        <Container style={{top:top,...style}}>
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