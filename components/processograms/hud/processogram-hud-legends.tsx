import HudContext from '@/context/hud-context'
import { normalizeElementNameByGivingID } from '@/utils/processogram'
import { useContext } from 'react'
import { Title } from './processogram-hud-legends-styled'



const ProcessogramHudLegends = () => {

    const { element } = useContext(HudContext)


    return(
        <>
            <Title>{ normalizeElementNameByGivingID(element.id)}</Title>
        </>
    )
}


export default ProcessogramHudLegends