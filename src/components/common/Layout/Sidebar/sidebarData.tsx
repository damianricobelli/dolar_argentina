import { FaExchangeAlt } from "react-icons/fa"
import { HiCurrencyDollar } from "react-icons/hi"
import { AiFillBank, AiFillDatabase } from "react-icons/ai"
import { BsGraphUp } from "react-icons/bs"

export const data = [
  {
    title: "Dólar",
    items: [
      {
        label: "Dólar hoy",
        icon: <HiCurrencyDollar />
      },
      {
        label: "Conversión",
        icon: <FaExchangeAlt />
      },
      {
        label: "Bancos",
        icon: <AiFillBank />
      },
      {
        label: "Evolución Dólar",
        icon: <BsGraphUp />
      },
      {
        label: "Reservas BCRA",
        icon: <AiFillDatabase />
      }
    ]
  },
  {
    title: "Euro",
    items: [
      {
        label: "Euro hoy",
        icon: <HiCurrencyDollar />
      },
      {
        label: "Conversión",
        icon: <FaExchangeAlt />
      },
      {
        label: "Evolución Euro",
        icon: <BsGraphUp />
      }
    ]
  },
  {
    title: "Real",
    items: [
      {
        label: "Real hoy",
        icon: <HiCurrencyDollar />
      },
      {
        label: "Conversión",
        icon: <FaExchangeAlt />
      },
      {
        label: "Evolución Real",
        icon: <BsGraphUp />
      }
    ]
  },
  {
    title: "Pesos",
    items: [
      {
        label: "Pesos en circulación",
        icon: <HiCurrencyDollar />
      }
    ]
  }
]
