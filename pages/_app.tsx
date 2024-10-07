import '../styles/app.css'

import { AppProps } from 'next/app'
import Header from '../components/header'
import Footer from '../components/footer'

export default function app({ Component, pageProps }: AppProps) {
    pageProps.appTitle = 'Datasintesa App'

    return (
        <div className='container max-w-screen-md min-h-screen flex flex-col mx-auto'>
            <Header appTitle={pageProps.appTitle} />
            <Component {...pageProps} />
            <Footer companyName='PT Datasintesa Teknologi Nusantara' />
        </div>
    )
}
