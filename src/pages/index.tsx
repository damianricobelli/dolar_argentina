/* eslint-disable react-hooks/rules-of-hooks */
import { FC } from "react"
import { GetStaticProps } from "next"
import { useWindowSize } from "../hooks/useWindowSize"
import {
  Heading,
  Box,
  SimpleGrid,
  Button,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  useColorModeValue
} from "@chakra-ui/react"

import { GridDataObject } from "@components/ui/Grid"
import { useState } from "react"
import { CustomModal } from "@components/ui/Modal"

export const FETCH_GET_CONFIG: any = {
  method: "GET",
  mode: "no-cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "Access-Control-Allow-Origin": "*"
  },
  redirect: "follow",
  referrerPolicy: "no-referrer"
}

interface dolarProps {
  dollar: any
}

const DolarPage: FC<dolarProps> = ({ dollar }) => {
  const {
    general,
    blueDollarEvolutionData,
    officialDollarEvolutionData,
    banksAndExchangesByState
  } = dollar

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { height } = useWindowSize()

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handleClickElement = (index: number) => {
    setSelectedIndex(index)
    onOpen()
  }

  return (
    <Box p={{ base: 0, md: 4 }} overflowY="scroll" height={height - 110}>
      <Tabs isLazy defaultIndex={0}>
        <TabList>
          <Tab>
            <Heading fontSize={{ base: "md", md: "lg" }}>General</Heading>
          </Tab>
          <Tab>
            <Heading fontSize={{ base: "md", md: "lg" }}>
              Bancos y exchanges
            </Heading>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel padding={0} paddingTop={4}>
            <GridDataObject
              data={general}
              isGeneral
              blueDollarEvolutionData={blueDollarEvolutionData}
              officialDollarEvolutionData={officialDollarEvolutionData}
            />
          </TabPanel>
          <TabPanel padding={0} paddingTop={4}>
            <SimpleGrid
              marginTop={8}
              columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
              spacing={10}
            >
              {banksAndExchangesByState.map((element, index) => {
                return (
                  <Button
                    rounded="md"
                    key={index}
                    bg={useColorModeValue("white", "gray.700")}
                    colorScheme="blue"
                    p={20}
                    fontSize="lg"
                    shadow="md"
                    variant="outline"
                    border="2px solid"
                    onClick={() => handleClickElement(index)}
                  >
                    <Text color={useColorModeValue("gray.600", "gray.50")}>
                      {element.name}
                    </Text>
                  </Button>
                )
              })}
            </SimpleGrid>
            {isOpen && (
              <CustomModal
                isOpen={isOpen}
                onClose={onClose}
                data={banksAndExchangesByState[selectedIndex]}
              />
            )}
            <Box mt={12}>
              <Heading fontSize="xl">Principales bancos del país</Heading>
              <GridDataObject
                data={banksAndExchangesByState[0].data}
                isBank
                principal
              />
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default DolarPage

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const generalData = await fetch(
      `${process.env.API_URL}/api/all`,
      FETCH_GET_CONFIG
    )
    const { valores } = await generalData.json()

    const { valores_principales: general } = valores

    const {
      Capital_Federal: capitalFederal,
      Cordoba: cordoba,
      La_Plata: laPlata,
      Mar_del_Plata: mdq,
      Mendoza: mendoza,
      Rosario: rosario,
      Tucuman: tucuman
    } = valores

    const banksAndExchangesByState = [
      { name: "Capital Federal", data: capitalFederal },
      { name: "Córdoba", data: cordoba },
      { name: "La Plata", data: laPlata },
      { name: "Mar del Plata", data: mdq },
      { name: "Mendoza", data: mendoza },
      { name: "Rosario", data: rosario },
      { name: "Tucumán", data: tucuman }
    ]

    const resBlueDollarEvolution = await fetch(
      `${process.env.API_URL}/api/evolucion/dolarblue`,
      FETCH_GET_CONFIG
    )
    const blueDollarEvolutionData = await resBlueDollarEvolution.json()

    const resOfficialDollarEvolution = await fetch(
      `${process.env.API_URL}/api/evolucion/dolaroficial`,
      FETCH_GET_CONFIG
    )
    const officialDollarEvolutionData = await resOfficialDollarEvolution.json()

    return {
      props: {
        dollar: {
          general,
          valores,
          banksAndExchangesByState,
          blueDollarEvolutionData,
          officialDollarEvolutionData
        }
      },
      revalidate: 60
    }
  } catch (error) {
    return { notFound: true }
  }
}
