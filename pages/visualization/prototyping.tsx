import withAuth from "@/components/HOC/withAuth"
import DefaultLayout from "@/components/layouts/Default"

const PrototypingPage = () => {
    return (
        <DefaultLayout>
            Prototyping
        </DefaultLayout>
    )
}

export default withAuth(PrototypingPage)