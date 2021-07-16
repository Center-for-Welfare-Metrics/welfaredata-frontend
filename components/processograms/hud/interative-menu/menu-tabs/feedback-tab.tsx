import { PrimaryButton } from '@/components/common/buttons/default-button-styled'
import FormInput from '@/components/common/inputs/form-input'
import { useState } from 'react'
import { FormEvent } from 'react'
import { Container,FeedBackForm,ButtonContainer } from './feedback-tab-styled'
import feedback from '@/api/feedback'
import toast from 'react-hot-toast'

const FeedbackTab = () => {

    const [detailed,setDetailed] = useState('')

    const [short,setShort] = useState('')

    const [load,setLoad] = useState(false)

    const submitForm = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoad(true)
        feedback.addFeedBack({
            title:short,
            description:detailed
        })
        .then(() => {
            toast.success('Thank you so much for taking the time to send this!')
        })
        .finally(() => {
            setShort('')
            setDetailed('')
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
                        required
                        type='email'       
                        // value={short}                          
                        // onChange={(e)=>setShort(e.target.value)}
                    />
                    <FormInput
                        customStyle={{paddingBottom:'0'}}
                        onClick={(e)=>e.stopPropagation()}
                        name='short_description'
                        label='Short Description *'
                        required         
                        value={short}                          
                        onChange={(e)=>setShort(e.target.value)}
                    />
                    <FormInput                        
                        onClick={(e)=>e.stopPropagation()}
                        name='detailed_description'
                        label='Detailed Description (optional)'    
                        multiline={true}  
                        value={detailed}                          
                        onChange={(e)=>setDetailed(e.target.value)}                      
                    />
                    <ButtonContainer>
                        <PrimaryButton style={{marginTop:'0'}} load={load} onClick={(e)=>e.stopPropagation()} type="submit">Send</PrimaryButton>
                    </ButtonContainer>
                </form>
            </FeedBackForm>
        </Container>
    )
}






export default FeedbackTab