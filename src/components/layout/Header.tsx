import { Center, Heading } from '@chakra-ui/react'

export default function Header() {
  return (
    <Center bg="blue.500" p={4} w="100%" color="white">
      <Heading as="h1">Calendrier liturgique catholique</Heading>
    </Center>
  )
}
