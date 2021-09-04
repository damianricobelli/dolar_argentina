import { SimpleGrid } from "@chakra-ui/react"
import React from "react"
import Card from "../Card"

export const GridDataObject = ({
  data,
  isGeneral,
  isBank = false,
  blueDollarEvolutionData,
  officialDollarEvolutionData,
  principal
}: any) => {
  return (
    <SimpleGrid
      columns={
        isBank && !principal
          ? { base: 1, sm: 2 }
          : { base: 1, sm: 2, lg: 3, xl: 4 }
      }
      mt={8}
      spacing={10}
    >
      {Object.keys(data).map((key: string, index: number) => {
        if (isGeneral) {
          const nameCurrency = data[key].nombre._text
          if (nameCurrency === "Dolar Soja" || nameCurrency === "Bitcoin") {
            return null
          } else {
            return (
              <Card
                key={index}
                data={data[key]}
                chartData={
                  nameCurrency === "Dolar Oficial"
                    ? officialDollarEvolutionData
                    : nameCurrency === "Dolar Blue"
                    ? blueDollarEvolutionData
                    : null
                }
              />
            )
          }
        } else if (isBank) {
          if (!data[key].nombre._text.includes("Banco")) {
            return null
          } else {
            return <Card key={index} data={data[key]} isBank chartData={null} />
          }
        }
      })}
    </SimpleGrid>
  )
}

export const GridDataArray = ({
  data,
  isGeneral,
  isBank,
  blueDollarEvolutionData,
  officialDollarEvolutionData
}: any) => {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} mt={8} spacing={10}>
      {data.map((el: any, index: number) => {
        if (isGeneral) {
          const nameCurrency = el.nombre._text
          if (nameCurrency === "Dolar Soja" || nameCurrency === "Bitcoin") {
            return null
          } else {
            return (
              <Card
                key={index}
                data={el}
                chartData={
                  nameCurrency === "Dolar Oficial"
                    ? officialDollarEvolutionData
                    : nameCurrency === "Dolar Blue"
                    ? blueDollarEvolutionData
                    : null
                }
              />
            )
          }
        } else if (isBank) {
          if (
            !el.nombre._text.includes("Banco") &&
            !el.nombre._text.includes("Rebanking") &&
            !el.nombre._text.includes("Wilobank") &&
            !el.nombre._text.includes("BruBank")
          ) {
            return null
          } else {
            return <Card key={index} data={el} isBank chartData={null} />
          }
        } else {
          if (
            el.nombre._text.includes("Banco") ||
            el.nombre._text.includes("Rebanking") ||
            el.nombre._text.includes("Wilobank") ||
            el.nombre._text.includes("BruBank")
          ) {
            return null
          } else {
            return <Card key={index} data={el} isBank chartData={null} />
          }
        }
      })}
    </SimpleGrid>
  )
}
