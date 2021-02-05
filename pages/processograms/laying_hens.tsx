import withAuth from "@/components/HOC/with-auth"
import DefaultLayout from "@/components/layouts"

const LayingHensPage = () => {
    return (
        <DefaultLayout>
            Laying Hens
        </DefaultLayout>
    )
}

export default withAuth(LayingHensPage)