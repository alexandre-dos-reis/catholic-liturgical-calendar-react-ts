import { Container, Text } from '@chakra-ui/react'
import { Easter } from 'pascua'

interface EasterProps {
  currentYear: number
  easter: Easter
  handleChange: any
  choosenYear: number
}

export default function EasterComp(props: EasterProps) {
  const { currentYear, easter, handleChange, choosenYear } = props
  const range = 21
  const yearStart = currentYear - 10
  const yearsRange: number[] = new Array(range)
    .fill(0, 0, range)
    .map((y, i) => i + yearStart)

  return (
    <Container w="100%" marginBottom={3} maxW="container.md">
      <Text>
        Sélectionner une année dans la liste déroulante :{' '}
        <select
          style={{
            border: '1px solid black',
            borderRadius: '5px',
            padding: '0 5px',
          }}
          onChange={handleChange}
        >
          {yearsRange.map(y => (
            <option selected={y === currentYear} value={y}>
              {y}
            </option>
          ))}
        </select>
      </Text>
      <Text>
        Pour l'année {choosenYear}, la fête de Pâques aura lieu le{' '}
        <strong>
          dimanche {easter.day} {easter.month === 3 ? 'Mars' : 'Avril'}
        </strong>
        .
      </Text>
    </Container>
  )
}
