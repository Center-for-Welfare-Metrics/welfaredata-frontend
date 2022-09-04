import ProcessogramContext, { ImainStateChange } from '@/context/processogram'
import { getCollectionInformationsByCoolFormat, ICoolFormat, translateStackToCoolFormat } from '@/utils/processogram'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Container,TreeItem } from './hud-tree-control-styled'
import voca from 'voca'
import { DictAlternativeNames } from '@/utils/consts'
import { getElementViewBox } from '../processogram-helpers'
interface IHudTreeControl {
    stackCoolFormat:ICoolFormat[]
    onChange(change:ImainStateChange):void
}

const HudTreeControl = ({stackCoolFormat,onChange}:IHudTreeControl) => {    

    const {specie,collection,stack} = useContext(ProcessogramContext)

    const [localStack,setLocakStack] = useState<ICoolFormat[]>([])

    const [top,setTop] = useState(0)

    const [ style,setStyle] = useState({
        maxWidth:null,
        left:0
    })

    useEffect(()=>{
        // let {content} = getCollectionInformationsByCoolFormat(translateStackToCoolFormat(stack),collection)
        // console.log(content)
        setLocakStack([{
            domID:null,
            elementName:DictAlternativeNames[specie._id],
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
        let current = stack[stack.length-1]        
        if(current!==domID && domID){            
            let svg = document.getElementById(stackCoolFormat[0].domID)
            
            let element_to_focus = level>0?svg.querySelector(`#${domID}`):svg

            let currentDomID = level>0?domID:null

            let viewBox = getElementViewBox(element_to_focus)
            
            onChange({
                viewBox,
                currentDomID,
                level                
            })
        }else if(domID === null){
            if(stack.length>1){
                let svg = document.getElementById(stackCoolFormat[0].domID)
                let viewBox = getElementViewBox(svg)
                onChange({
                    viewBox,
                    currentDomID:null,
                    level:0                
                })
                setTimeout(() => {
                    onChange(null)    
                }, 600);           
            }else{
                onChange(null)
            }
        }
    }

    const getRealName = (elementName,localStack,index) => {
        try {
            if(index>0){
                return voca.titleCase((getCollectionInformationsByCoolFormat(localStack.slice(1,index),collection).content?.ref_alternative_name || getCollectionInformationsByCoolFormat(localStack.slice(1,index),collection).content?.ref_name) || elementName)
            }else{
                return elementName
            }
        } catch (error) {
            return elementName
        }                
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
                        onClick={onTreeItemClick({domID,level})}
                        ishover={isHover}
                    > 
                        {levelName} : {getRealName(elementName,localStack,index+1)}
                    </TreeItem>
                ))
            }            
        </Container>
    )
}


export default HudTreeControl