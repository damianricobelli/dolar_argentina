import React from "react"
import { GetStaticProps, GetStaticPaths } from "next"
import {
  Stack,
  Text,
  useColorModeValue,
  Heading,
  StackDivider,
  Badge,
  Grid,
  Box,
  SimpleGrid
} from "@chakra-ui/react"

interface dolarProps {
  data: any
}

const DolarPage: React.FC<dolarProps> = ({ data }) => {
  console.log(data)
  return (
    <SimpleGrid columns={3} p={8} spacing={10}>
      <Stack
        rounded="lg"
        p={4}
        shadow="md"
        _hover={{ shadow: "lg", cursor: "pointer" }}
        bg={useColorModeValue("white", "gray.500")}
        spacing="4"
        divider={<StackDivider borderColor="gray.200" />}
      >
        <Heading fontSize="2xl">Dólar oficial</Heading>
        <Grid templateColumns="1fr 1fr">
          <Box direction="column">
            <Badge fontSize="md" colorScheme="blue">
              Compra
            </Badge>
            <Text mt={2} fontWeight="500" fontSize="lg" color="gray.600">
              $172.69
            </Text>
          </Box>
          <Box direction="column">
            <Badge fontSize="md" colorScheme="green">
              Venta
            </Badge>
            <Text mt={2} fontWeight="500" fontSize="lg" color="gray.600">
              $172.69
            </Text>
          </Box>
        </Grid>
      </Stack>{" "}
      <Stack
        rounded="lg"
        p={4}
        shadow="md"
        _hover={{ shadow: "lg", cursor: "pointer" }}
        bg={useColorModeValue("white", "gray.500")}
        spacing="4"
        divider={<StackDivider borderColor="gray.200" />}
      >
        <Heading fontSize="2xl">Dólar blue</Heading>
        <Grid templateColumns="1fr 1fr">
          <Box direction="column">
            <Badge fontSize="md" colorScheme="blue">
              Compra
            </Badge>
            <Text mt={2} fontWeight="500" fontSize="lg" color="gray.600">
              $172.69
            </Text>
          </Box>
          <Box direction="column">
            <Badge fontSize="md" colorScheme="green">
              Venta
            </Badge>
            <Text mt={2} fontWeight="500" fontSize="lg" color="gray.600">
              $172.69
            </Text>
          </Box>
        </Grid>
      </Stack>
    </SimpleGrid>
  )
}

export default DolarPage

// export const getStaticProps: GetStaticProps = async (context) => {
//   //context.params.nameParam to get the params of path
//   const res = await fetch(
//     `https://api-dolar-argentina.herokuapp.com/api/dolaroficial`
//   )
//   const data = await res.json()

//   return {
//     props: {
//       data
//     }
//   }
// }
