import ProcessogramDataEntry from "@/components/data_entry/processogram"
import withAuth from "@/components/HOC/with-auth"
import DefaultLayout from "@/components/layouts"
import { SpeciesTypes } from "@/utils/enum_types"
import Router from 'next/router'
import { useEffect, useState } from "react"


const SpecieDataEntryPage = () => {

    const [specie,setSpecie] = useState<SpeciesTypes>(null)


    useEffect(()=>{
        let specie_from_url : SpeciesTypes = Router.query.specie as any
        setSpecie(specie_from_url)        
    },[])

    return (
        <DefaultLayout>
            {   specie &&
                <ProcessogramDataEntry 
                    specie={specie}
                />
            }
        </DefaultLayout>
    )
}




export default withAuth(SpecieDataEntryPage)