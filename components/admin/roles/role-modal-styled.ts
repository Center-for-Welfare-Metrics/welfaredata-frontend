import { CleanInput, CleanTextArea } from '@/components/common/inputs/inputs'
import styled from 'styled-components'

export const Container = styled.div`
    padding:1rem;
`

export const TitleInput = styled(CleanInput)`
    font-size:2.1rem;
`

export const DescriptionInput = styled(CleanTextArea)`
    font-size:1.1rem;
    max-height:5rem;
    width:100%;
`

export const HelperText = styled.div`
    font-size:.9rem;
    margin-top:.8rem;
    margin-left:.1rem;
`


export const PermissionsSection = styled.div`
    margin-top:2rem;
    margin-bottom:1rem;
`