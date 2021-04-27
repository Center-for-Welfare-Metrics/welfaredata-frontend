import Processogram from "@/components/processograms/processogram"
import ProcessogramContext, { IProcessogramContext } from '@/context/processogram'
import { historyToProcessogramTree, encodeProcessogramTree, decodeProcessogramTree, getReadableInformations } from "@/utils/processogram"
import { useEffect, useRef, useState } from "react"
import Router from 'next/router'
import { SpeciesTypes } from "@/utils/enum_types"
import { SPECIES } from "@/utils/consts"
import { TweenLite, gsap } from 'gsap'
import { Title,GreatTitle } from './production-system-selector-styled'
gsap.registerPlugin(TweenLite)

interface IProcessogramsHomePage {
    specie:SpeciesTypes,
    processograms:any[],
    parent?:HTMLElement,
    onChange?(currentInformations:any,id_tree:any,svg_id:string):void
    setTarget?(target:any):void,
    triggerToSetFetchData?:any,
    data_entry:boolean
}

const translateBySufix = {
    lf:'lifefates',
    ph:'phases',
    ci:'circumstances'
}

const fieldNameBySufix = {
    ps:'productionSystem',
    lf:'lifeFate',
    ph:'phase',
    ci:'circumstance'
}

const ProductionSystemSelector = ({specie,parent,onChange,processograms,setTarget,triggerToSetFetchData,data_entry}:IProcessogramsHomePage) => {
    const [choosen,setChoosen] = useState(null)

    const [shareLink,setShareLink] = useState('')

    const [processogramTreeFromQuery,setProcessogramTreeFromQuery] = useState(null)

    const [firstLoad,setFirstLoad] = useState(false)

    const [history,setHistory] = useState({})

    const [mouseOverOn,setMouseOverOn] = useState('')

    const [idFromCurrentFocusedElement,setIDFromCurrentFocusedElement] = useState('')

    const [level,setLevel] = useState(0)    

    const [onContext,setOnContext] = useState('')

    useEffect(() => {
        if(Object.keys(history).length > 0){
            let {target,id_tree,svg_id} = currentState(history)            
            onChange?.(target,id_tree,svg_id)            
        }else{
            onChange?.(null,null,null)
        }
    },[history])

    useEffect(()=>{
        if(processograms.length > 0){
            setTimeout(() => {
                let {to} = Router.query
                if(to){
                    let processogram_tree = decodeProcessogramTree(to)
                    if(processogram_tree.lf){
                        setProcessogramTreeFromQuery(processogram_tree)
                    }
                    setTimeout(() => {                    
                        setChoosen(processogram_tree.ps)                          
                    }, 500);
                }  
            }, 500);
        }
    },[processograms])

    useEffect(() => {
        if(Object.keys(history).length > 0){
            let {target} = currentState(history)
            if(target){            
                setTarget?.(target)
            }
        }
    },[triggerToSetFetchData])


    useEffect(()=>{
        if(choosen){
            if(parent){
                TweenLite.to(parent,{height:parent.getBoundingClientRect().height,overflow:'hidden'}).duration(0)
            }       
        }else{
            if(firstLoad){
                onChange?.(null,null,null)
                Router.push({query:{specie}})
                if(parent){
                    TweenLite.to(parent,{overflow:'auto'}).duration(0)
                }
            }else{ 
                setFirstLoad(true)
            }
        }
    },[choosen])

    const currentState = (history:any) => {
        let lastObject : any = {}
        let id_tree : any = {}
        let svg_id = null
        try {
            Object.keys(history).forEach((level) => {
                let currentHistory = history[level]
                svg_id = currentHistory.id
                if(currentHistory.sufix === 'ps'){
                    lastObject = processograms.find(x => x.productionSystem?.name.toLowerCase() === currentHistory.name.toLowerCase())    
                    id_tree._id = lastObject._id                              
                }else{
                    let childrensName = translateBySufix[currentHistory.sufix]     
                    let fieldName = fieldNameBySufix[currentHistory.sufix]
                    lastObject = lastObject[childrensName].find(x => x[fieldName]?.name.toLowerCase() === currentHistory.name.toLowerCase())
                    let fullPathChildrenName = translateBySufix[currentHistory.sufix]
                    id_tree[fullPathChildrenName] = lastObject._id
                }
            })
        } catch (error) {
            return {
                target:undefined,
                id_tree,
                svg_id
            }
        }

        return {
            target:lastObject,
            id_tree:id_tree,
            svg_id
        }
    }
 
    const generateShareLink = (history:any) => {        
        let processogram_tree = historyToProcessogramTree(history)

        let encoded_tree = encodeProcessogramTree(processogram_tree)

        let base_url = window.location.host + window.location.pathname

        let share_link = base_url + '?to=' + encoded_tree
        
        setShareLink(share_link)        
    }

    const processogramContextValues : IProcessogramContext = {
        history,
        setHistory, 
        choosen,
        setChoosen,
        shareLink,
        generateShareLink,
        processogramTreeFromQuery,
        setProcessogramTreeFromQuery,
        currentState,
        mouseOverOn,
        setMouseOverOn,
        idFromCurrentFocusedElement,
        setIDFromCurrentFocusedElement,
        level,
        setLevel,
        onContext,
        setOnContext
    }

    const titleGenerator = () => {
        let greatTitle = null
        if(idFromCurrentFocusedElement){
            greatTitle = getReadableInformations(idFromCurrentFocusedElement)
        }
        if(mouseOverOn){
            greatTitle = getReadableInformations(mouseOverOn)
        }
        if(onContext){
            greatTitle = getReadableInformations(onContext)
        }
        return greatTitle
    }

    return (                
        <ProcessogramContext.Provider value={processogramContextValues}>
            <GreatTitle>
            {
                titleGenerator()?.layerName
            }
            </GreatTitle>
            <Title>
            {
                titleGenerator()?.name
            }
            </Title>            
            {
                SPECIES[specie].map((productionSystem) => (
                    <Processogram data_entry={data_entry} parent={parent} key={productionSystem} specie={specie} productionSystem={productionSystem}/>
                ))
            }     
        </ProcessogramContext.Provider>       
    )
}

export default ProductionSystemSelector