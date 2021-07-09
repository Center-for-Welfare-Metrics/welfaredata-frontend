import HudContext from "@/context/hud-context"
import ProcessogramContext from "@/context/processogram"
import { getCollectionInformationsByCoolFormat } from "@/utils/processogram"
import { useEffect } from "react"
import { useState } from "react"
import { useContext } from "react"
import {Container} from './interative-menu-styled'

const HudInterativeMenu = () => {

    const {stackCoolFormat} = useContext(HudContext)

    const { collection } = useContext(ProcessogramContext)

    const [content,setContent] = useState(null)

    const [state,setState] = useState<'minimized'|'full'|'hide'>('minimized')

    useEffect(()=>{        
        setContent(getCollectionInformationsByCoolFormat(stackCoolFormat,collection))
    },[stackCoolFormat])   

    const onClick = (event:Event) => {
        event.stopPropagation()
        setState('hide')
    }

    return (
        content &&
        <Container onClick={onClick} state={state}>

        </Container>        
    )
    
}



export default HudInterativeMenu