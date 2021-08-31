import useSWR from "swr"

const fetcher = async () => {
  const generalData = await fetch(
    `https://api-dolar-argentina.herokuapp.com/api/all`
  )
  const {
    valores: { valores_principales: general, Capital_Federal: banks }
  } = await generalData.json()

  const resBlueDollarEvolution = await fetch(
    `https://api-dolar-argentina.herokuapp.com/api/evolucion/dolarblue`
  )
  const blueDollarEvolutionData = await resBlueDollarEvolution.json()

  const resOfficialDollarEvolution = await fetch(
    `https://api-dolar-argentina.herokuapp.com/api/evolucion/dolaroficial`
  )
  const officialDollarEvolutionData = await resOfficialDollarEvolution.json()

  return {
    general,
    banks,
    blueDollarEvolutionData,
    officialDollarEvolutionData
  }
}

export const useDolarSWR = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error } = useSWR("dolar", fetcher)

  return {
    data,
    error
  }
}
