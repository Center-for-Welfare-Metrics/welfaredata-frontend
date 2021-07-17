import { PrimaryButton } from '@/components/common/buttons/default-button-styled'
import FormInput from '@/components/common/inputs/form-input'
import { useState } from 'react'
import { FormEvent } from 'react'
import feedback from '@/api/feedback'
import toast from 'react-hot-toast'
import { useContext } from 'react'
import HudContext from '@/context/hud-context'
import { generateFormatedLog } from '@/components/processograms/processogram-helpers'

import * as EmailValidator from 'email-validator';

import { Container,FeedBackForm,ButtonContainer,CheckContainer,CheckButton } from './feedback-tab-styled'

const FeedbackTab = () => {

    const { stackCoolFormat } = useContext(HudContext)

    const [detailed,setDetailed] = useState('')

    const [short,setShort] = useState('')

    const [email,setEmail] = useState('')

    const [newsletter,setNewsLetter] = useState(false)

    const [load,setLoad] = useState(false)

    const submitForm = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        let path_log = generateFormatedLog(stackCoolFormat)

        let real_description = `Email: ${email || 'Not Provided'}<br/><br/>${email?`NewsLetter: ${newsletter?'Yes':'No'}`:''}<br/><br/>${detailed?`-------- description --------<br/>${detailed}<br/><br/><br/><br/>`:''}-------- path --------<br/>${path_log}`

        setLoad(true)
        feedback.addFeedBack({
            title:short,
            description:real_description
        })
        .then(() => {
            setShort('')
            setDetailed('')
            setNewsLetter(false)
            toast.success(<div onClick={(e)=>e.stopPropagation()}>Thank you so much for taking the time to send this!</div>)
        })
        .catch(() => {                
            toast.error(<div onClick={(e)=>e.stopPropagation()}>I'm sorry but I could not receive your feedback. Try later :)</div>)
        })
        .finally(() => {            
            setLoad(false)
        })
    }

    return(
        <Container>
            <div style={{marginBottom:'1rem'}}>
                Want to leave some feedback? Please use the fields below to enter a short description, and optionally a more detailed explanation
            </div>
            <FeedBackForm>
                <form method="post" onSubmit={submitForm}>
                    <FormInput
                        customStyle={{paddingBottom:'0'}}
                        onClick={(e)=>e.stopPropagation()}
                        name='email'
                        label='Email (optional)'                        
                        type='email'      
                        autoFocus 
                        value={email}                          
                        onChange={(e)=>setEmail(e.target.value)}
                    />                    
                    <FormInput
                        customStyle={{paddingBottom:'0'}}
                        onClick={(e)=>e.stopPropagation()}
                        name='short_description'
                        label='Short Description *'
                        required         
                        value={short}                          
                        onChange={(e)=>setShort(e.target.value)}
                        autoComplete="off"
                    />
                    <FormInput                        
                        onClick={(e)=>e.stopPropagation()}
                        name='detailed_description'
                        label='Detailed Description (optional)'    
                        multiline={true}  
                        value={detailed}                          
                        onChange={(e)=>setDetailed(e.target.value)}                      
                    />
                    {
                        EmailValidator.validate(email) &&
                        <CheckContainer>
                            <CheckButton ischecked={newsletter} htmlFor='newsletter'><div/></CheckButton>
                            <input checked={newsletter} onChange={(e)=>setNewsLetter(e.target.checked)} id='newsletter' type='checkbox' />
                            <label style={{marginLeft:'.5rem'}} htmlFor='newsletter'>select if you wish to receive our newsletters</label>
                        </CheckContainer>
                    }                    
                    <ButtonContainer>
                        <PrimaryButton disabled={load===true} style={{marginTop:'0'}} load={load} onClick={(e)=>e.stopPropagation()} type="submit">Send</PrimaryButton>
                    </ButtonContainer>
                </form>
            </FeedBackForm>
        </Container>
    )
}






export default FeedbackTab