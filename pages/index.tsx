import Link from 'next/link'
import onlyGuest from '../components/HOC/onlyGuest'

const Home = () => {
  return (
    <div>
      <Link href='/login'>Login</Link>
    </div>
  )
}

export default onlyGuest(Home)
