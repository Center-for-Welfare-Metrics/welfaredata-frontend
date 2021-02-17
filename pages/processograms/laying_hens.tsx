import withAuth from "@/components/HOC/with-auth"
import DefaultLayout from "@/components/layouts"
import ProcessogramHomePage from "@/components/processograms/processograms-home-page"

const LayingHensPage = () => {
    return (
        <DefaultLayout>
            <ProcessogramHomePage folder='hens' file_names={['conventional cages.svg']} />
        </DefaultLayout>
    )
}

export default withAuth(LayingHensPage)