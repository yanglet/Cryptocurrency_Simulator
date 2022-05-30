import Head from 'next/head'
import AppLayout from '../components/AppLayout'
import LoginForm from '../components/User/LoginForm'
import UserProfile from '../components/User/UserProfile';
import {useState} from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='text-center my-12'>
        <p className='text-5xl mb-16'>모의투자 사이트</p>
        {isLoggedIn ? <UserProfile setIsLoggedIn={setIsLoggedIn} /> : <LoginForm setIsLoggedIn={setIsLoggedIn}/>}
       </div>
      </div>
  )
}
