import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useColorModeValue,
  Box
} from "@chakra-ui/react"
import { GridDataObject } from "../Grid"

export const CustomModal = ({ isOpen, onClose, data }) => {
  console.log(data)
  return (
    <Modal
      isCentered
      scrollBehavior="inside"
      size="4xl"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent bg={useColorModeValue("white", "gray.600")}>
        <ModalHeader>Bancos y exchanges de {data.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <GridDataObject data={data.data} isBank />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
