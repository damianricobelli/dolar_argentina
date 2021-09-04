import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input
} from "@chakra-ui/react"

export const CustomDrawer = ({ isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Filtrar bancos</DrawerHeader>

        <DrawerBody>
          <Input placeholder="Type here..." />
        </DrawerBody>

        <DrawerFooter>
          <Button size="sm" variant="outline" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button size="sm" colorScheme="blue">
            Confirmar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
