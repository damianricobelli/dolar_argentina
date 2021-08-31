import React from "react"
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
  Collapse
} from "@chakra-ui/react"

import { GridDataObject, GridDataArray } from "@components/ui/Grid"
import { SWRConfig } from "swr"
import { useDolarSWR } from "src/services/dolar.swr"
import { useState } from "react"
interface dolarProps {
  fallback: any
}

function Content() {
  const { height } = useWindowSize()
  const toggleBank = useDisclosure()
  const toggleExchange = useDisclosure()
  const {
    data: {
      general,
      banks,
      blueDollarEvolutionData,
      officialDollarEvolutionData
    }
  } = useDolarSWR()

  const [selectedBanks, setSelectedBanks] = useState([])
  const [selectedExchanges, setSelectedExchanges] = useState([])

  const handleSelectBank = (bank: string) => {
    const currentSelectedBanks = [...selectedBanks]
    const index = currentSelectedBanks.findIndex(
      (currentBank: any) => currentBank.nombre._text === bank
    )
    if (index === -1) {
      const selectedBankData = Object.keys(banks).find(
        (key: string) => banks[key].nombre._text === bank
      )
      const updatedSelectedBanks = [...selectedBanks, banks[selectedBankData]]
      setSelectedBanks(updatedSelectedBanks)
    } else {
      currentSelectedBanks.splice(index, 1)
      setSelectedBanks(currentSelectedBanks)
    }
  }

  const inSelectedBankList = (bank: string) => {
    const currentSelectedBanks = [...selectedBanks]
    const index = currentSelectedBanks.findIndex(
      (currentBank: any) => currentBank.nombre._text === bank
    )
    if (index === -1) {
      return "outline"
    } else {
      return "solid"
    }
  }

  const handleSelectExchange = (exchange: string) => {
    const currentSelectedExchanges = [...selectedExchanges]
    const index = currentSelectedExchanges.findIndex(
      (currentBank: any) => currentBank.nombre._text === exchange
    )
    if (index === -1) {
      const selectedExchangeData = Object.keys(banks).find(
        (key: string) => banks[key].nombre._text === exchange
      )
      const updatedSelectedExchanges = [
        ...selectedExchanges,
        banks[selectedExchangeData]
      ]
      setSelectedExchanges(updatedSelectedExchanges)
    } else {
      currentSelectedExchanges.splice(index, 1)
      setSelectedExchanges(currentSelectedExchanges)
    }
  }

  const inSelectedExchangeList = (exchange: string) => {
    const currentSelectedExchanges = [...selectedExchanges]
    const index = currentSelectedExchanges.findIndex(
      (currentExchange: any) => currentExchange.nombre._text === exchange
    )
    if (index === -1) {
      return "outline"
    } else {
      return "solid"
    }
  }

  return (
    <Box p={{ base: 0, md: 4 }} overflowY="scroll" height={height - 110}>
      <Tabs isLazy defaultIndex={0}>
        <TabList>
          <Tab>
            <Heading fontSize={{ base: "md", md: "lg" }}>General</Heading>
          </Tab>
          <Tab>
            <Heading fontSize={{ base: "md", md: "lg" }}>Bancos</Heading>
          </Tab>
          <Tab>
            <Heading fontSize={{ base: "md", md: "lg" }}>
              Casas de cambio
            </Heading>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel padding={0}>
            <GridDataObject
              data={general}
              isGeneral
              blueDollarEvolutionData={blueDollarEvolutionData}
              officialDollarEvolutionData={officialDollarEvolutionData}
            />
          </TabPanel>
          <TabPanel padding={0}>
            <Button
              marginTop={6}
              colorScheme="purple"
              size="sm"
              onClick={toggleBank.onToggle}
            >
              Filtrar bancos
            </Button>
            <Collapse in={toggleBank.isOpen} animateOpacity>
              <SimpleGrid
                marginTop={4}
                columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
                spacingX={10}
              >
                {Object.keys(banks).map((key: string, index: number) => {
                  if (
                    !banks[key].nombre._text.includes("Banco") &&
                    !banks[key].nombre._text.includes("Rebanking") &&
                    !banks[key].nombre._text.includes("Wilobank") &&
                    !banks[key].nombre._text.includes("BruBank")
                  ) {
                    return null
                  } else {
                    return (
                      <Box
                        key={banks[key].nombre._text}
                        onClick={() =>
                          handleSelectBank(banks[key].nombre._text)
                        }
                        paddingY={1}
                      >
                        <Button
                          size="xs"
                          rounded="none"
                          colorScheme="green"
                          variant={inSelectedBankList(banks[key].nombre._text)}
                        >
                          {banks[key].nombre._text}
                        </Button>
                      </Box>
                    )
                  }
                })}
              </SimpleGrid>
            </Collapse>
            {selectedBanks.length === 0 ? (
              <GridDataObject data={banks} isBank />
            ) : (
              <GridDataArray data={selectedBanks} isBank />
            )}
          </TabPanel>
          <TabPanel padding={0}>
            <Button
              marginTop={6}
              colorScheme="purple"
              size="sm"
              onClick={toggleExchange.onToggle}
            >
              Filtrar casas de cambio
            </Button>
            <Collapse in={toggleExchange.isOpen} animateOpacity>
              <SimpleGrid
                marginTop={4}
                columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
                spacingX={10}
              >
                {Object.keys(banks).map((key: string, index: number) => {
                  if (
                    banks[key].nombre._text.includes("Banco") ||
                    banks[key].nombre._text.includes("Rebanking") ||
                    banks[key].nombre._text.includes("Wilobank") ||
                    banks[key].nombre._text.includes("BruBank")
                  ) {
                    return null
                  } else {
                    return (
                      <Box
                        key={index}
                        paddingY={1}
                        onClick={() =>
                          handleSelectExchange(banks[key].nombre._text)
                        }
                      >
                        <Button
                          size="xs"
                          rounded="none"
                          colorScheme="green"
                          variant={inSelectedExchangeList(
                            banks[key].nombre._text
                          )}
                        >
                          {banks[key].nombre._text}
                        </Button>
                      </Box>
                    )
                  }
                })}
              </SimpleGrid>
            </Collapse>
            {selectedExchanges.length === 0 ? (
              <GridDataObject data={banks} isExchange />
            ) : (
              <GridDataArray data={selectedExchanges} isExchange />
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

const DolarPage: React.FC<dolarProps> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Content />
    </SWRConfig>
  )
}

export default DolarPage

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const generalData = await fetch(`${process.env.API_URL}/api/all`)
    const {
      valores: { valores_principales: general, Capital_Federal: banks }
    } = await generalData.json()

    const resBlueDollarEvolution = await fetch(
      `${process.env.API_URL}/api/evolucion/dolarblue`
    )
    const blueDollarEvolutionData = await resBlueDollarEvolution.json()

    const resOfficialDollarEvolution = await fetch(
      `${process.env.API_URL}/api/evolucion/dolaroficial`
    )
    const officialDollarEvolutionData = await resOfficialDollarEvolution.json()

    return {
      props: {
        fallback: {
          dolar: {
            general,
            banks,
            blueDollarEvolutionData,
            officialDollarEvolutionData
          }
        }
      },
      revalidate: 60
    }
  } catch (error) {
    return { notFound: true }
  }
}
