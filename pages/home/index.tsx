import { useContext } from "react"
import withAuth from "@/components/HOC/withAuth"
import DefaultLayout from "@/components/layouts/default"
import PostIt from "@/components/post-it"
import PostItGrid from "@/components/post-it/grid"
import PostItButton from "@/components/post-it/it-button"
import UserContext from '@/context/user'

const Home = () => {
    const {logOut} = useContext(UserContext)

    return (
        <DefaultLayout>
            <PostItGrid>
                <PostIt icon='016-man-10.svg'>
                    <PostItButton name='Configurações' icon='settings.svg' />
                    <PostItButton onClick={logOut} name='Sair' icon='back.svg' />
                </PostIt>
                <PostIt folder_icon='education' icon='008-computer.svg'>
                    <PostItButton name='Sinalizar' icon='look.svg' />
                    <PostItButton name='Fixar' icon='push-pin.svg' />
                    <PostItButton name='Trancar' icon='block.svg' />
                </PostIt>
                <PostIt folder_icon='education' icon='015-knowledge.svg'>
                    <PostItButton name='Sinalizar' icon='look.svg' />
                    <PostItButton name='Fixar' icon='push-pin.svg' />
                    <PostItButton name='Trancar' icon='block.svg' />
                </PostIt>
                <PostIt folder_icon='education' icon='026-football.svg'>
                    <PostItButton name='Sinalizar' icon='look.svg' />
                    <PostItButton name='Fixar' icon='push-pin.svg' />
                    <PostItButton name='Trancar' icon='block.svg' />
                </PostIt>
            </PostItGrid>
        </DefaultLayout>
    )
}


export default withAuth(Home)