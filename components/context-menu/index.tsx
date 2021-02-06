import { SvgIcons } from '@/utils/assets_path'
import { useEffect, useRef, useState } from 'react'
import { Container,Body,Footer,ButtonNavigator,ButtonIcon } from './index-styled'

import { TweenLite, gsap } from 'gsap'
gsap.registerPlugin(TweenLite)

const map_buttons_navigation = [
    {
        title:'Charts',
        src:SvgIcons('barchart')
    },
    {
        title:'Media',
        src:SvgIcons('media')
    },
    {
        title:'Sources',
        src:SvgIcons('books')
    },
    {
        title:'Feedback',
        src:SvgIcons('pencil')
    }
]

const POSITIONS = {
    'bottom-right':{
        bottom:'2rem',
        right:'2rem',
        top:'initial',
        left:'initial'
    },
    'bottom-left':{
        bottom:'2rem',
        left:'2rem',
        top:'initial',
        right:'initial'
    },
    'top-right':{
        top:'2rem',
        right:'2rem',
        bottom:'initial',
        left:'initial'
    },
    'top-left':{
        top:'2rem',
        left:'2rem',
        bottom:'initial',
        right:'initial'
    }
}

interface IContextMenu{
    position:string
    visible?:boolean
    name?:string
}

const ContextMenu = ({
    position,
    visible=false,
    name=''
}:IContextMenu) => {

    const containerRef = useRef<HTMLElement>(null)

    const [stateName,setStateName] = useState(name)

    useEffect(()=>{
        if(visible){
            TweenLite.to(containerRef.current,{opacity:1}).delay(0.5).duration(0.5)
        }
    },[visible])

    useEffect(()=>{
        if(position && visible){
            let to = getPosition(position)
            TweenLite.to(containerRef.current,{opacity:0})
            .duration(0.5)
            .then(()=>{
                setStateName(name)
                TweenLite.to(containerRef.current,to).duration(0)
                TweenLite.to(containerRef.current,{opacity:1}).duration(0.5)
            })
        }
    },[position])

    const getPosition = (position='bottom-right') => {
        return JSON.parse(JSON.stringify(POSITIONS[position]))
    }

    return (
        <Container ref={containerRef} display={visible?'block':'none'}>
            <Body>
                {stateName}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ullamcorper malesuada consectetur. Proin commodo sem est, aliquam vulputate nibh bibendum non. Nulla facilisi. Proin eleifend, enim eu tempus tempus, est lectus sodales felis, quis ullamcorper justo diam id ligula. Proin mattis lorem nec posuere iaculis. Cras faucibus mollis nunc, ac vulputate eros hendrerit a. Ut sit amet blandit ex, eget fermentum urna. Nunc non neque vehicula, iaculis nunc varius, dignissim tellus. Duis suscipit dictum erat, ut fermentum est scelerisque et. Mauris ullamcorper nulla ac nibh tincidunt, ac rutrum libero eleifend. Phasellus a aliquam leo. Suspendisse varius consectetur leo, quis sodales eros tempor eget. Sed molestie lacus nisl, nec cursus diam rhoncus ac.

                Etiam eget massa lobortis, convallis sapien vitae, mattis purus. Vivamus quam quam, maximus at dolor a, mollis tincidunt leo. Etiam molestie consequat euismod. Vivamus elementum a ligula nec interdum. Vestibulum pulvinar ullamcorper mi, ut mollis sapien porttitor at. Nam sodales lacus purus. Vivamus tempus et arcu et elementum. In porttitor nibh sit amet dui luctus gravida. Vestibulum magna nunc, euismod quis consequat id, rutrum sit amet ex. Proin hendrerit justo eget nisl porttitor, nec eleifend orci mollis. Fusce sit amet nibh nulla. Etiam rhoncus quam odio, et rutrum sem ultrices et. Pellentesque vel tincidunt nisl. Vivamus ut mi dolor.

                Nulla facilisi. In hac habitasse platea dictumst. Donec sed enim volutpat, mattis lectus id, imperdiet erat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum eleifend ultrices posuere. Cras euismod arcu sit amet viverra fermentum. Suspendisse porta, lorem sed sodales tincidunt, ex lorem varius nibh, quis posuere neque sem fermentum lectus. Cras quis nunc bibendum magna posuere porttitor in venenatis magna. Quisque id vehicula lectus, sit amet consectetur dolor. Nam vitae ornare augue, in lacinia diam.

                Sed scelerisque nulla a nulla scelerisque, ut egestas eros porta. Donec vitae est nisi. Suspendisse consequat fringilla velit molestie lobortis. Curabitur mattis vitae urna non pellentesque. Etiam ultricies tellus vel hendrerit bibendum. Morbi maximus, nulla vel scelerisque tempor, nisi elit sollicitudin erat, at sodales lacus felis eget est. Pellentesque finibus sem imperdiet nisi faucibus, vel interdum quam blandit.

                Donec nibh mi, pretium ac interdum vitae, consectetur non erat. Mauris in arcu id quam congue vehicula. Cras in nibh dapibus elit dictum maximus non ut augue. Sed congue nulla tempus lacus convallis congue. Phasellus varius mattis nulla, et imperdiet sem posuere eget. Vivamus a metus nisl. Sed odio mi, aliquam lobortis nisi vitae, ornare tincidunt quam.
            </Body>
            <Footer>
                {
                    map_buttons_navigation.map((button_navigator) => (
                        <ButtonNavigator key={button_navigator.title}>
                            <ButtonIcon src={button_navigator.src} title={button_navigator.title} />
                        </ButtonNavigator>
                    ))
                }
                
            </Footer>
        </Container>
    )
}



export default ContextMenu