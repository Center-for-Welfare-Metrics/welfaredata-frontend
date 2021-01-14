import Link from 'next/link'
import onlyGuest from '@/components/HOC/onlyGuest'
import Router from 'next/router'
import { useEffect } from 'react'

const Home = () => {

  useEffect(()=>{
    Router.push('/login')
  },[])

  return (
    <div>
      <Link href='/login'>Login</Link>
    </div>
  )
}

export default onlyGuest(Home)
