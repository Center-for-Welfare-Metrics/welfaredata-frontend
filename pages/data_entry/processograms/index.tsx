import SpecieSelector from "@/components/processograms/specie-selector"
import DefaultLayout from "@/components/layouts"
import withAuth from "@/components/HOC/with-auth"

const DataEntryPage = () => {
    return (
        <DefaultLayout>
            {
                <SpecieSelector />
            }
        </DefaultLayout>
    )

}

export default withAuth(DataEntryPage)