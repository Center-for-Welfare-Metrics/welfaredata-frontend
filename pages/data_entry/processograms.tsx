import Dialog from "@/components/common/dialog/dialog"
import SpecieSelector from "@/components/processograms/specie-selector"
import DefaultLayout from "@/components/layouts"
import withAuth from "@/components/HOC/with-auth"

const ProcessogramDataEntryPage = () => {
    return (
        <DefaultLayout>              
            <SpecieSelector />                            
        </DefaultLayout>
    )

}

export default withAuth(ProcessogramDataEntryPage)