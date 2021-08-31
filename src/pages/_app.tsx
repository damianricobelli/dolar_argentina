import "@fontsource/poppins/100.css"
import "@fontsource/poppins/200.css"
import "@fontsource/poppins/300.css"
import "@fontsource/poppins/400.css"
import "@fontsource/poppins/500.css"
import "@fontsource/poppins/600.css"
import "@fontsource/poppins/700.css"
import "@fontsource/poppins/800.css"
import "@fontsource/poppins/900.css"

import type { AppProps } from "next/app"
import Head from "next/head"
import { ChakraProvider } from "@chakra-ui/react"
import MyTheme from "@styles/theme"

import Layout from "@components/common/Layout"

import { Router } from "next/dist/client/router"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

NProgress.configure({ showSpinner: false, trickleRate: 0.1, trickleSpeed: 200 })

Router.events.on("routeChangeStart", () => {
  NProgress.start()
})

Router.events.on("routeChangeComplete", () => {
  NProgress.done()
})

Router.events.on("routeChangeError", () => {
  NProgress.done()
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Dolarista</title>
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
        <meta content="Dolarista" name="author" />
        <meta content="Dolarista" name="copyright" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <ChakraProvider theme={MyTheme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  )
}

export default MyApp
