import Head from "next/head"
import { Box } from "@chakra-ui/react"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Dolarista</title>
        <meta name="description" content="Dolarista" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box bg="red.500" height="500px" width="500px">
        <h1>Holis</h1>
      </Box>
    </div>
  )
}
