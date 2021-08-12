import ProcessogramDataEntry from "@/components/data_entry"
import withAuth from "@/components/HOC/with-auth"
import DefaultLayout from "@/components/layouts"
import { SpeciesTypes } from "@/utils/enum_types"
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"


const SpecieDataEntryPage = () => {

    const [specie,setSpecie] = useState(null)

    const router = useRouter()

    useEffect(()=>{        
        let { specie } = router.query
        
        setSpecie(specie)  
    },[router.query.specie])

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