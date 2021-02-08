import withAuth from "@/components/HOC/with-auth"
import DefaultLayout from "@/components/layouts"
import Pigs from "@/components/processograms/piges"
import ProcessogramContext from '@/context/processogram'
import { historyToProcessogramTree, encodeProcessogramTree, decodeProcessogramTree } from "@/utils/processogram"
import { useEffect, useRef, useState } from "react"
import Router from 'next/router'

const PigPage = () => {

    const containerRef = useRef<any>(null)

    const [choosen,setChoosen] = useState(null)

    const [shareLink,setShareLink] = useState('')

    const [pageScrollY,setPageScrollY] = useState(0)

    const [allRefsLoaded,setAllRefsLoaded] = useState(false)

    useEffect(()=>{
        if(choosen){
            storeVerticalScrollScreenValue()
        }
    },[choosen])

    useEffect(()=>{
        if(shareLink){
            console.log(shareLink)
        }
    },[shareLink])

    const generateShareLink = (history:any) => {
        let processogram_tree = historyToProcessogramTree(history)

        let encoded_tree = encodeProcessogramTree(processogram_tree)

        let base_url = window.location.host + '/processograms/pig'

        let share_link = base_url + '?to=' + encoded_tree

        setShareLink(share_link)
    }

    const pigsContextValue = {choosen,setChoosen,shareLink,generateShareLink,pageScrollY,setPageScrollY,allRefsLoaded,setAllRefsLoaded}

    const storeVerticalScrollScreenValue = () => {
        setPageScrollY(window.scrollY)
    }

    useEffect(()=>{
        if(allRefsLoaded){
            let {to} = Router.query
            if(to){
                setTimeout(() => {
                    let processogram_tree = decodeProcessogramTree(to)
                    setChoosen(processogram_tree.ps)
                }, 500);
            }
            // setTimeout(() => {
            //     setChoosen('european_intensive--ps')    
            // }, 500);      
        }
    },[allRefsLoaded])

    return (
        
        <DefaultLayout>
            <ProcessogramContext.Provider value={pigsContextValue}>
                <Pigs innerRef={containerRef} />
            </ProcessogramContext.Provider>
        </DefaultLayout>
    )
}

export default withAuth(PigPage)