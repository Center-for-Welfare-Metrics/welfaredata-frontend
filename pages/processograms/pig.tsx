import ContextMenu from "@/components/context-menu"
import withAuth from "@/components/HOC/with-auth"
import DefaultLayout from "@/components/layouts"
import Pigs from "@/components/processograms/piges"


const PigPage = () => {
    return (
        <DefaultLayout>
            <Pigs />
        </DefaultLayout>
    )
}

export default withAuth(PigPage)