import { Box, ChakraProvider } from '@chakra-ui/react'
import pascua from 'pascua'
import { useState } from 'react'
import Easter from 'src/components/Easter'
import Intro from 'src/components/Intro'
import Header from 'src/components/layout/Header'

import Calendar from './components/Calendar'

export function App() {
  const currentYear = new Date().getFullYear()
  const [choosenYear, setChoosenYear] = useState(currentYear)
  const easter = pascua(choosenYear)

  const handleChange = (e: any) => {
    setChoosenYear(e.target.value)
  }

  return (
    <ChakraProvider>
      <Header />
      <Box backgroundColor="gray.200" padding="10">
        <Intro />
        <Easter
          currentYear={currentYear}
          easter={easter}
          handleChange={handleChange}
          choosenYear={choosenYear}
        />
        <Calendar choosenYear={choosenYear} easter={easter} />
      </Box>
    </ChakraProvider>
  )
}

export default App
