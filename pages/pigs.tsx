import ProcessogramHomePage from "@/components/processograms/processograms-home-page"

const PublicPigsPage = () => {
    return (
        <>
            <ProcessogramHomePage folder='pigs' file_names={['conventional intensive.svg','european intensive.svg','enhanced intensive.svg','outdoor semi-intensive.svg']} />
        </>
    )

}

export default PublicPigsPage