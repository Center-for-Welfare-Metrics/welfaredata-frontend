import withAuth from "@/components/HOC/withAuth"
import DefaultLayout from "@/components/layouts/Default"
import Pigs from "@/components/processograms/Pigs"

const PigPage = () => {
    return (
        <DefaultLayout>
            <Pigs />
        </DefaultLayout>
    )
}

export default withAuth(PigPage)