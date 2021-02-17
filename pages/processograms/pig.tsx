import withAuth from "@/components/HOC/with-auth"
import DefaultLayout from "@/components/layouts"
import ProcessogramHomePage from "@/components/processograms/processograms-home-page"

const PigPage = () => {

    return (        
        <DefaultLayout>
            <ProcessogramHomePage folder='pigs' file_names={['conventional intensive.svg','european intensive.svg','enhanced intensive.svg','outdoor semi-intensive.svg']} />
        </DefaultLayout>
    )
}

export default withAuth(PigPage)