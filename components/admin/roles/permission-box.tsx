import React from 'react'
import { RESOURCES } from "@/utils/consts"
import { useState } from "react"
import { Container, PermissionName,Granted,GrantedContainer, HelperMessage, AddGranted,DeleteGranted,GrantedListStyled,GrantedListBackground, GrantedOption } from "./permission-box-styled"

const toColorType  = {
    Create:'success',
    Read:'primary',
    Update:'warning',
    Delete:'danger'
}

interface IGrantedList {
    onClose?(event:Event):void
    granted:string[],
    onClick(optionClicked:string):void
}

const filterResources = (granted:string[]) => {
    if(granted.includes('all')) return []
    else if(granted.length > 0){
        let copy = RESOURCES.slice()
        copy.splice(RESOURCES.indexOf('all'),1)
        return copy.filter(x => !granted.includes(x))    
    }
    return RESOURCES.filter(x => !granted.includes(x))
}

const GrantedList = ({onClose,granted,onClick}:IGrantedList) => {

    const onOptionClick = (optionClicked:string) => (event:Event) => {
        onClick(optionClicked)
        onClose(event)
    }

    return (
        <>
            <GrantedListStyled>
                {
                    filterResources(granted).map((access)=>(
                        <GrantedOption onClick={onOptionClick(access)} key={access}>{access}</GrantedOption>
                    ))
                }
            </GrantedListStyled>
            <GrantedListBackground onClick={onClose} />
        </>
    )
}

interface IPermissionBox {
    type: 'Create' | 'Read' | 'Update' | 'Delete',
    granted: string[],
    onAddClick(granted:string):void,
    onRemoveClick(granted:string):void
}

const PermissionBox = ({type,granted,onAddClick,onRemoveClick}:IPermissionBox) => {

    const [onAddGranted,setOnAddGranted] = useState(false)

    const addGrantedClicked = (event:Event) => {
        setOnAddGranted(true)
    }

    return (
        <Container type={toColorType[type]}>
            <PermissionName>{type}</PermissionName>
            <GrantedContainer>
                {
                    granted.length > 0?
                    (
                        granted.map((access)=>(
                            <Granted key={access}>{access}<DeleteGranted onClick={()=>onRemoveClick(access)} /></Granted>
                        ))
                    )
                    :
                    (
                        <HelperMessage>Can't {type} anything</HelperMessage>
                    )
                }
                {
                    filterResources(granted).length !== 0 && <AddGranted type='button' onClick={addGrantedClicked} />
                }
                {
                    onAddGranted && <GrantedList onClick={onAddClick} granted={granted} onClose={()=>{setOnAddGranted(false)}} />
                }                
            </GrantedContainer>
        </Container>
    )
}




export default React.memo(PermissionBox)