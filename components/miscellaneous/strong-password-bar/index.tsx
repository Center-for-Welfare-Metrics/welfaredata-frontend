import { Container, Line,LineContainer, StrengthText } from './strong-password-bar-styled'
import React from 'react'

interface IStrongBar {
    strength:string
}

const dict = {
    '':0,
    'Weak':1,
    'Medium':2,
    'Strong':3
}

const StrongPasswordBar = ({strength}:IStrongBar) => {
    return (
        <Container>
            <LineContainer>
                <Line current={1} strength={dict[strength]} />
                <Line current={2} strength={dict[strength]} />
                <Line current={3} strength={dict[strength]} />
            </LineContainer>
            <StrengthText strength={dict[strength]}>{strength || 'Weak'}</StrengthText>
        </Container>
    )
}


export default React.memo(StrongPasswordBar)