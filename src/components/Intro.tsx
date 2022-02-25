import { Container, Heading, Link, Text } from '@chakra-ui/react'

export default function Intro() {
  return (
    <Container w="100%" maxW="container.md">
      <Heading as="h4" fontSize="medium" marginBottom={3}>
        Pourquoi cette application ?
      </Heading>
      <Text>
        La liturgie catholique est centré autour de la fête de Pâques. La
        méthode utilisée pour calculer cette fête est tirée de{' '}
        <Link
          isExternal
          color="blue.600"
          href="https://fr.wikipedia.org/wiki/Calcul_de_la_date_de_P%C3%A2ques"
        >
          l'algorithme de Butcher-Meeus
        </Link>
        , inventé en 1877.
      </Text>
      <Text marginTop={3}>
        De là, on peut prévoir le reste de l'année liturgique notamment avec les
        <strong> dimanches mobiles de l'épiphanie</strong> qui s'articulent
        avant le <strong>dernier dimanche après la pentecôte</strong>.
      </Text>
    </Container>
  )
}
