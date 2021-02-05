import onlyGuest from '@/components/HOC/only-guest'
import Router from 'next/router'
import { useEffect } from 'react'

const Home = () => {

  useEffect(()=>{
    Router.push('/login')
  },[])

  return <></>
}

export default onlyGuest(Home)
