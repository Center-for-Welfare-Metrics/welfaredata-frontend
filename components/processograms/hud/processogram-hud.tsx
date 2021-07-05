import HudContext from '@/context/hud-context'
import ProcessogramControls from './controls'
import ProcessogramHudLegends from './processogram-hud-legends'
import { Container } from './processogram-hud-styled'

interface IProcessogramHud{
    element:Element
    onChange(change):void
    level:number
}

const ProcessogramHud = ({
    element,
    onChange,
    level
}:IProcessogramHud) => {

    const elementRect = element.getBoundingClientRect()

    

    return (
        <HudContext.Provider value={{element,onChange}}>
            <Container style={{
                top:elementRect.top,
                width:elementRect.width,
                height:elementRect.height,
            }}>
                {level>=3 && <ProcessogramControls />}
                <ProcessogramHudLegends />
            </Container>
        </HudContext.Provider>
    )
}


export default ProcessogramHud