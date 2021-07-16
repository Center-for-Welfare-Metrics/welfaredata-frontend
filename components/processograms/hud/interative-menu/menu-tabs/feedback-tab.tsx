import { PrimaryButton } from '@/components/common/buttons/default-button-styled'
import FormInput from '@/components/common/inputs/form-input'
import { Container,FeedBackForm,ButtonContainer } from './feedback-tab-styled'


const FeedbackTab = () => {




    return(
        <Container>
            <div>
                Want to leave some feedback? Please use the fields below to enter a short description, and optionally a more detailed explanation
            </div>
            <FeedBackForm>
                <form method="post" onSubmit={(e)=>e.preventDefault()}>
                    <FormInput
                        onClick={(e)=>e.stopPropagation()}
                        name='short_description'
                        label='Short Description *'
                        required              
                    />
                    <FormInput
                        onClick={(e)=>e.stopPropagation()}
                        name='detailed_description'
                        label='Detailed Description'    
                        multiline={true}
                    />
                    <ButtonContainer>
                        <PrimaryButton onClick={(e)=>e.stopPropagation()} type="submit">Send</PrimaryButton>
                    </ButtonContainer>
                </form>
            </FeedBackForm>
        </Container>
    )
}






export default FeedbackTab