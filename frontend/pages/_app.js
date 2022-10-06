import MainLayout from '../components/Common/MainLayout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return(
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  )
}

export default MyApp
