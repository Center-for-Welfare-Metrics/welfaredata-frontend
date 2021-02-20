import { Container,Options,Option} from './box-select-styled'

interface IPrepare {
    key:string,
    render:string
}

interface IFormSelect{
    options:any[]
    prepare:IPrepare
    value:any
    onChoose(option:any):void
}

const FormSelect = ({value,options,prepare,onChoose}:IFormSelect) => {
    
    const isSelected = (option) => {
        if(value){
            return value[prepare.key] === option[prepare.key]
        }
        return false
    }

    const choose = (option:any) => (event:Event) => {
        onChoose(option)
    }

    return (       
            <Container>                                
                <Options>
                    {
                        options.map((option) => (
                            <Option onClick={choose(option)} selected={isSelected(option)} key={option[prepare.key]}>{option[prepare.render]}</Option>
                        ))
                    }
                </Options>
            </Container>                    
    )
}


export default FormSelect