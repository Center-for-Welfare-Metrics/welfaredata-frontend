import withAuth from "@/components/HOC/with-auth"
import DefaultLayout from "@/components/layouts"
import Pigs from "@/components/processograms/piges"
import ProcessogramContext from '@/context/processogram'
import { historyToProcessogramTree, encodeProcessogramTree, decodeProcessogramTree } from "@/utils/processogram"
import { useEffect, useRef, useState } from "react"
import processogramApi from '@/api/processogram'
import Router from 'next/router'

const translateBySufix = {
    lf:'lifefates',
    ph:'phases',
    ci:'circumstances'
}

const PigPage = () => {

    const containerRef = useRef<any>(null)

    const [choosen,setChoosen] = useState(null)

    const [shareLink,setShareLink] = useState('')

    const [pageScrollY,setPageScrollY] = useState(0)

    const [processogramTreeFromQuery,setProcessogramTreeFromQuery] = useState(null)

    const [firstLoad,setFirstLoad] = useState(false)

    const [processograms,setProcessograms] = useState([])

    useEffect(()=>{
        processogramApi.all()
        .then(({data})=>{
            setProcessograms(data)
        })
    },[])

    useEffect(()=>{
        if(choosen){
            storeVerticalScrollScreenValue()
        }else{
            if(firstLoad){
                Router.push({query:{}})
            }else{ 
                setFirstLoad(true)
            }
        }
    },[choosen])

    const getFigureRealInformations = (history:any) => {
        let lastObject : any = {}
        try {
            Object.keys(history).forEach((level) => {
                let currentHistory = history[level]
                if(currentHistory.sufix === 'ps'){
                    lastObject = processograms.find(x => x.name === currentHistory.name)
                }else{
                    let childrensName = translateBySufix[currentHistory.sufix]
                    lastObject = lastObject[childrensName].find(x => x.name === currentHistory.name)
                }
            })
        } catch (error) {
            return undefined
        }

        return lastObject
    }
 
    const generateShareLink = (history:any) => {
        let processogram_tree = historyToProcessogramTree(history)

        let encoded_tree = encodeProcessogramTree(processogram_tree)

        let base_url = window.location.host + '/processograms/pig'

        Router.push({query:{to:encoded_tree}})

        let share_link = base_url + '?to=' + encoded_tree
        
        setShareLink(share_link)
    }

    const pigsContextValue = {choosen,setChoosen,shareLink,generateShareLink,pageScrollY,setPageScrollY,processogramTreeFromQuery,setProcessogramTreeFromQuery,getFigureRealInformations}

    const storeVerticalScrollScreenValue = () => {
        setPageScrollY(window.scrollY)
    }

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

    return (
        
        <DefaultLayout>
            <ProcessogramContext.Provider value={pigsContextValue}>
                <Pigs innerRef={containerRef} />
            </ProcessogramContext.Provider>
        </DefaultLayout>
    )
}

export default withAuth(PigPage)