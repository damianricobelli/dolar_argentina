import React from "react"

import { Stack, Box, Button, Avatar, Text } from "@chakra-ui/react"

import { v4 as uuid } from "uuid"
import { data } from "./sidebarData"

interface indexProps {}

const GroupData = ({ title, items }) => (
  <Box marginY="2rem">
    <Text color="whiteAlpha.700" fontWeight="300" paddingX="4">
      {title}
    </Text>
    {items.map((el) => (
      <Stack
        key={uuid()}
        as={Button}
        width="100%"
        size="sm"
        direction="row"
        paddingX="4"
        justify="flex-start"
        variant="ghost"
        color="whiteAlpha.800"
        colorScheme="whiteAlpha"
        leftIcon={el.icon}
      >
        <Text>{el.label}</Text>
      </Stack>
    ))}
  </Box>
)

const index: React.FC<indexProps> = ({}) => {
  return (
    <Box
      bg="blue.800"
      overflowY="auto"
      width="280px"
      height="vh"
      maxHeight="full"
      rounded="lg"
      position="relative"
      right="15px"
      css={{
        "&::-webkit-scrollbar": {
          width: "4px"
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent"
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#2B6CB0",
          borderRadius: "20px"
        }
      }}
    >
      <Stack
        as={Button}
        colorScheme="whiteAlpha"
        variant="ghost"
        direction="row"
        paddingX="4"
        justify="flex-start"
        width="100%"
        paddingY="6"
      >
        <Avatar
          size="sm"
          name="Invitado Argentino"
          bg="teal.500"
          color="white"
        />
        <Stack direction="column" align="baseline">
          <Text color="whiteAlpha.800" fontWeight="500" fontSize="sm">
            Invitado argentino
          </Text>
          <Text
            color="gray.300"
            fontWeight="300"
            marginTop="2px !important"
            fontSize="11px"
          >
            *******@gmail.com
          </Text>
        </Stack>
      </Stack>
      {data.map((el) => (
        <GroupData key={uuid()} title={el.title} items={el.items} />
      ))}
    </Box>
  )
}

export default index
