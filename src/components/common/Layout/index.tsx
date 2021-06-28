import React from "react"

import { Container, Stack, Box, Grid } from "@chakra-ui/react"

import Sidebar from "./Sidebar"

interface ILayout {}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <Container maxW="full" padding={{ base: 0, md: 6 }}>
      <Stack as={Grid} direction="row" gap={2}>
        <Sidebar />
        <Box
          bg="white"
          width="100%"
          height="100%"
          rounded="lg"
          paddingX="10"
          paddingY="6"
        >
          {/* <Button></Button> */}
        </Box>
      </Stack>
      {children}
    </Container>
  )
}

export default Layout
