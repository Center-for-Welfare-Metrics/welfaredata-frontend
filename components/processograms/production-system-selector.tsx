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
    parent:HTMLElement,
    onChange?(currentInformations:any,id_tree:any,svg_id:string):void
    setTarget?(target:any):void,
    triggerToSetFetchData?:any,
    data_entry:boolean
    fullPageTrigger?():void
    cantClick?:boolean
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

const ProductionSystemSelector = ({specie,parent,onChange,processograms,setTarget,triggerToSetFetchData,data_entry,fullPageTrigger,cantClick}:IProcessogramsHomePage) => {
    const [choosen,setChoosen] = useState(null)

    const [shareLink,setShareLink] = useState('')

    const [processogramTreeFromQuery,setProcessogramTreeFromQuery] = useState(null)

    const [firstLoad,setFirstLoad] = useState(false)

    const [history,setHistory] = useState({})

    const [mouseOverOn,setMouseOverOn] = useState('')

    const [idFromCurrentFocusedElement,setIDFromCurrentFocusedElement] = useState('')

    const [level,setLevel] = useState(0)    

    const [onContext,setOnContext] = useState('')

    const [subtitles,setSubtitles] = useState<any>(null)

    const [onZoom,setOnZoom] = useState(false)

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
            TweenLite.to(parent,{overflow:'hidden'}).duration(0)
        }else{
            if(firstLoad){
                onChange?.(null,null,null)
                Router.push({query:{specie}})                
                TweenLite.to(parent,{overflow:'auto'}).delay(1).duration(0)         
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
        setOnContext,
        onZoom,
        setOnZoom
    }


    const focusedElementPosition = (id) => {
        try {
            let findIn : any = document
            if(choosen){
                findIn = document.getElementById(choosen)
            }        
            let element = findIn.querySelector(`#${id}`)
            if(element === null){
                element = document.getElementById(id)
            }
            let { top,left,width } = element.getBoundingClientRect()                     
            let parentRect = parent.getBoundingClientRect()
            top -= parentRect.top
            left -= parentRect.left
            return {
                top:top + parent.scrollTop,
                left,
                width
            }
        } catch (error) {
            return {
                top:0,
                left:0,
                width:0
            }
        }        
    }
    

    useEffect(()=>{
        let greatTitle = null
        let position = null
        if(idFromCurrentFocusedElement){
            position = focusedElementPosition(idFromCurrentFocusedElement)
            greatTitle = getReadableInformations(idFromCurrentFocusedElement)
            setSubtitles({...greatTitle,...position})    
        }
        if(mouseOverOn){
            position = focusedElementPosition(mouseOverOn)
            greatTitle = getReadableInformations(mouseOverOn)
            setSubtitles({...greatTitle,...position})  
        }
        if(onContext){
            position = focusedElementPosition(onContext)
            greatTitle = getReadableInformations(onContext)
            setSubtitles({...greatTitle,...position})  
        }        
        if(greatTitle && position){
                      
        }else{
            setSubtitles(null)
        }
    },[idFromCurrentFocusedElement,mouseOverOn,onContext,onZoom])


    return (                
        <ProcessogramContext.Provider value={processogramContextValues}>
            
            <GreatTitle choosen={choosen?1:0}>
            {                
                subtitles?.layerName
            }
            </GreatTitle>

            {
                !onZoom &&
                <Title top={subtitles?.top} left={subtitles?.left} >
                    {
                        subtitles?.name
                    }
                </Title>
            }
                        
            {
                SPECIES[specie].map((productionSystem,index) => (
                    <Processogram 
                        index={index}
                        data_entry={data_entry} 
                        parent={parent}
                        key={productionSystem} 
                        specie={specie} 
                        productionSystem={productionSystem}
                        fullPageTrigger={fullPageTrigger}
                        cantClick={cantClick}
                    />
                ))
            }     
        </ProcessogramContext.Provider>       
    )
}

export default ProductionSystemSelector