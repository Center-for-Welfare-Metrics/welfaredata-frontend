import withAuth from "@/components/HOC/withAuth"
import DefaultLayout from "@/components/layouts/Default"

const LayingHensPage = () => {
    return (
        <DefaultLayout>
            Laying Hens
        </DefaultLayout>
    )
}

export default withAuth(LayingHensPage)