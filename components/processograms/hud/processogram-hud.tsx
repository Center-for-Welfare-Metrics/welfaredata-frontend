import HudContext from '@/context/hud-context'
import { ICoolFormat } from '@/utils/processogram'
import ProcessogramControls from './controls'
import ProcessogramHudTreeControl from './processogram-hud-tree-control'
import { Container } from './processogram-hud-styled'

interface IProcessogramHud{
    element:Element
    onChange(change):void
    level:number
    stackCoolFormat:ICoolFormat[]
}

const ProcessogramHud = ({
    element,
    onChange,
    level,
    stackCoolFormat
}:IProcessogramHud) => {

    const elementRect = element.getBoundingClientRect()

    

    return (
        <HudContext.Provider value={{element,onChange,stackCoolFormat}}>
            <Container style={{
                top:elementRect.top,
                width:elementRect.width,
                height:elementRect.height,
            }}>
                {level>=3 && <ProcessogramControls />}                
            </Container>
            <ProcessogramHudTreeControl />
        </HudContext.Provider>
    )
}


export default ProcessogramHud