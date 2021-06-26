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

// import Layout from "@components/common/Layout"

// import "focus-visible/dist/focus-visible"
// import { Global, css } from "@emotion/react"

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

// const GlobalStyles = css`
//   .js-focus-visible :focus:not([data-focus-visible-added]) {
//     outline: none;
//     box-shadow: none;
//   }
// `

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Estellars - Cuadros decorativos y estelares</title>
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
        <meta content="Estellars" name="author" />
        <meta content="Estellars" name="copyright" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <ChakraProvider theme={MyTheme}>
        {/* <Global styles={GlobalStyles} /> */}
        {/* <Layout pageProps={pageProps}> */}
        <Component {...pageProps} />
        {/* </Layout> */}
      </ChakraProvider>
    </>
  )
}

export default MyApp
