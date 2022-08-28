import { Provider } from 'react-redux'
import MainLayout from '../components/Common/MainLayout'
import '../styles/globals.css'
import store from '../redux/store'

function MyApp({ Component, pageProps }) {
  return(
    <Provider store={store}>
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
    </Provider>
  )
}

export default MyApp
