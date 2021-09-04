import React from "react"

import {
  Stack,
  Text,
  useColorModeValue,
  Heading,
  StackDivider,
  Badge,
  Box,
  StatHelpText,
  StatArrow,
  Stat,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  useBreakpointValue
} from "@chakra-ui/react"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"

import { AiOutlineLineChart } from "react-icons/ai"

import { FaDirections, FaPhoneAlt } from "react-icons/fa"

interface CardProps {
  data: any
  isBank?: boolean
  chartData: any
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Stack direction="row" bg="white" p={3} shadow="md" rounded="md">
        <Text
          fontWeight="semibold"
          fontSize="1rem"
        >{`${payload[0].payload.mes}/${payload[0].payload.anio} - `}</Text>
        <Text color="teal.500" fontWeight="bold">{`$${payload[0].value}`}</Text>
      </Stack>
    )
  }

  return null
}

const Card = ({ data, isBank = false, chartData }: CardProps) => {
  let variation = null
  if (!isBank)
    variation = parseFloat(data.variacion._text.replace(",", ".")).toFixed(2)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const variant = useBreakpointValue({ base: 180, sm: 250, md: 300, lg: 350 })
  return (
    <Stack
      rounded="md"
      p={4}
      shadow="md"
      _hover={{ shadow: "lg" }}
      bg={useColorModeValue("white", "gray.700")}
      spacing="4"
      divider={<StackDivider borderColor="gray.200" />}
    >
      <Stack direction="row" justify="space-between" align="center">
        <Box>
          <Heading
            noOfLines={isBank ? 1 : null}
            fontSize="lg"
            fontWeight="semibold"
            color={useColorModeValue("gray.600", "gray.50")}
          >
            {data.nombre._text === "Dolar Contado con Liqui"
              ? "Dolar CCL"
              : data.nombre._text}
            {!isBank && (
              // eslint-disable-next-line react-hooks/rules-of-hooks
              <Stat color={useColorModeValue("gray.500", "gray.300")}>
                <StatHelpText pt="2.5">
                  {Number(variation) !== 0 && (
                    <StatArrow
                      type={Number(variation) > 0 ? "increase" : "decrease"}
                    />
                  )}
                  {variation}%
                </StatHelpText>
              </Stat>
            )}
          </Heading>
          {isBank && (
            <Stack
              mt={2}
              spacing="0.5"
              // eslint-disable-next-line react-hooks/rules-of-hooks
              color={useColorModeValue("gray.500", "gray.400")}
            >
              <Stack direction="row">
                <FaDirections size="14" />
                <Text fontSize="xs">{data.direccion._text}</Text>
              </Stack>
              <Stack direction="row">
                <FaPhoneAlt size="14" />
                <Text fontSize="xs">{data.telefono?._text ?? "-"}</Text>
              </Stack>
            </Stack>
          )}
        </Box>
        {chartData && (
          <Box direction="column">
            <Button
              onClick={onOpen}
              size="sm"
              // eslint-disable-next-line react-hooks/rules-of-hooks
              variant={useColorModeValue("solid", "outline")}
              rightIcon={<AiOutlineLineChart />}
            >
              Evolución
            </Button>
            <Modal isCentered size="xl" isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                  <Text
                    p={4}
                    fontWeight="medium"
                    fontSize={{ base: "md", lg: "lg" }}
                  >
                    Evolución mensual anualizada del dólar blue
                  </Text>
                  <Box position="relative" right="20px">
                    <ResponsiveContainer width="100%" height={variant}>
                      <LineChart data={chartData.meses}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mes" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                          type="monotone"
                          dataKey="valor"
                          stroke="#82ca9d"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </ModalBody>

                <ModalFooter>
                  <Button size="sm" colorScheme="blue" mr={3} onClick={onClose}>
                    Cerrar
                  </Button>{" "}
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        )}
      </Stack>
      <Stack
        direction="row"
        justify="space-between"
        wrap="wrap"
        alignItems="center"
        divider={<StackDivider borderColor="gray.200" />}
      >
        <Box direction="column">
          <Badge fontSize="sm" colorScheme={useColorModeValue("blue", "blue")}>
            Compra
          </Badge>
          <Text
            mt={2}
            fontWeight="500"
            fontSize="lg"
            color={useColorModeValue("gray.600", "gray.100")}
          >
            ${data.compra._text === "No Cotiza" ? " -" : data.compra._text}
          </Text>
        </Box>
        <Box direction="column">
          <Badge fontSize="sm" colorScheme={useColorModeValue("green", "teal")}>
            Venta
          </Badge>
          <Text
            mt={2}
            fontWeight="500"
            fontSize="lg"
            color={useColorModeValue("gray.600", "gray.100")}
          >
            ${data.venta._text === "No Cotiza" ? " -" : data.venta._text}
          </Text>
        </Box>
      </Stack>
    </Stack>
  )
}
export default Card
