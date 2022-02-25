import { Flex } from '@chakra-ui/react'

interface SundayProps {
  children: React.ReactNode
  color: string
}

export default function (props: SundayProps) {
  const { color, children } = props
  return (
    <Flex
      w="100%"
      borderWidth="1px"
      borderRadius="lg"
      p="10px"
      borderColor="blackAlpha.500"
      backgroundColor={color}
      justifyContent="space-between"
    >
      {children}
    </Flex>
  )
}
