import { Box, Container, Heading, VStack } from '@chakra-ui/react'
import { Easter } from 'pascua'

import DateString from './Date'
import Event from './Event'

interface SundaysProps {
  choosenYear: number
  easter: Easter
}

const weekDaysToFR = [
  'Dimanche',
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
]

const addDays = (date: Date, days: number) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

const nextSundayAfterChristmas = (christmasDate: Date) => {
  return new Date(
    christmasDate.getFullYear(),
    christmasDate.getMonth(),
    christmasDate.getDate() + (7 - christmasDate.getDay())
  )
}

const getAventSundays = (choosenYear: number) => {
  const christmas = new Date(choosenYear, 11, 25)
  const diff = christmas.getDay() === 0 ? 7 : christmas.getDay()
  const sunday4th = new Date(choosenYear, 11, 25 - diff)
  return [
    addDays(sunday4th, -21),
    addDays(sunday4th, -14),
    addDays(sunday4th, -7),
    sunday4th,
  ]
}

const getHolyNameDate = (christmas: Date): Date => {
  // Si l'octave de la nativité est le Samedi, Dimanche, Lundi ou mardi :
  // Le SaintNom est le lendemain de l'Octave de la Nativité
  // Sinon c'est le dimanche suivant :
  if (
    christmas.getDay() === 6 ||
    christmas.getDay() === 0 ||
    christmas.getDay() === 1 ||
    christmas.getDay() === 2
  ) {
    return addDays(christmas, 8)
  } else {
    return nextSundayAfterChristmas(addDays(christmas, 7))
  }
}

// La fete de la sainte famille est le dimanche suivant l'épiphanie
const getHolyFamily = (epiphany: Date) => {
  let result = addDays(epiphany, 0)

  if (result.getDay() === 0) {
    return addDays(result, 7)
  }

  while (result.getDay() !== 0) {
    result = addDays(result, 1)
  }
  return result
}

const isEpiphanyBeforeHolyName = (epiphany: Date, holyName: Date) => {
  return epiphany.getDate() > holyName.getDate()
}

// Compare 2 dates
const areDatesTheSame = (first: Date, second: Date) => {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  )
}

// Les dimanche de l'Epiphanie se déplacent à partir du 3ème :
const get1stEpiphanyPart = (epiphany2nd: Date, septuagesime: Date) => {
  let results: Date[] = []
  let currentSunday = addDays(epiphany2nd, 7)

  while (areDatesTheSame(currentSunday, septuagesime) === false) {
    results.push(currentSunday)
    currentSunday = addDays(currentSunday, 7)
  }
  return results
}

const get2ndEpiphanyPart = (pentecost23th: Date, pentecost24th: Date) => {
  if (areDatesTheSame(pentecost23th, addDays(pentecost24th, -7)) === true) {
    return []
  } else {
    let results: Date[] = []
    let nextSunday = addDays(pentecost23th, 7)

    while (areDatesTheSame(nextSunday, pentecost24th) === false) {
      results.push(nextSunday)
      nextSunday = addDays(nextSunday, 7)
    }
    return results
  }
}

const nthFR = (i: number) => (i === 1 ? i + 'er' : i + 'ème')

/// COMPONENT

export default function Sundays(props: SundaysProps) {
  const { choosenYear, easter } = props
  const easterDate = new Date(easter.year, easter.month - 1, easter.day)
  const christmasDate = new Date(choosenYear - 1, 11, 25)

  const epiphanyDate = new Date(choosenYear, 0, 6)
  const holyNameOfJesus = getHolyNameDate(christmasDate)
  const holyFamily = getHolyFamily(epiphanyDate)

  // Epiphanie qui ne bouge pas :
  const epiphanyImmutableDate: Date[] = [
    isEpiphanyBeforeHolyName(epiphanyDate, holyNameOfJesus)
      ? holyNameOfJesus
      : epiphanyDate,
    isEpiphanyBeforeHolyName(epiphanyDate, holyNameOfJesus)
      ? epiphanyDate
      : holyNameOfJesus,
    holyFamily,
    addDays(holyFamily, 7),
  ]

  const epiphanyImmutableDescription = [
    isEpiphanyBeforeHolyName(epiphanyDate, holyNameOfJesus)
      ? 'Fête du Très Saint Nom de Jésus'
      : 'Epiphanie de Notre Seigneur Jésus Christ',
    isEpiphanyBeforeHolyName(epiphanyDate, holyNameOfJesus)
      ? 'Epiphanie de Notre Seigneur Jésus Christ'
      : 'Fête du Très Saint Nom de Jésus',
    'Fête de la Sainte Famille',
    "2ème dimanche après l'Epiphanie",
  ]

  // Les dimanche de l'Epiphanie se déplacent à partir du 3ème :
  const epiphany1stPart = get1stEpiphanyPart(
    addDays(holyFamily, 7),
    addDays(easterDate, -63)
  )

  // const get2ndEpiphanyPart = (): Date[] => {}

  const beforeFast: Date[] = [
    addDays(easterDate, -63),
    addDays(easterDate, -56),
    addDays(easterDate, -49),
  ]

  const beforeFastEvent = ['Septuagésime', 'Sexagésime', 'Quiquagésime']

  const fastBeforeEaster: Date[] = [
    addDays(easterDate, -42),
    addDays(easterDate, -35),
    addDays(easterDate, -28),
    addDays(easterDate, -21),
  ]

  const beforeEaster: Date[] = [
    addDays(easterDate, -14),
    addDays(easterDate, -7),
  ]

  const afterEaster: Date[] = [
    addDays(easterDate, 14),
    addDays(easterDate, 21),
    addDays(easterDate, 28),
    addDays(easterDate, 35),
  ]

  return (
    <Container w="100%" marginBottom={3} maxW="container.md">
      <VStack>
        <Heading as="h2" size="md" marginTop={3}>
          <b>Début de l'année liturgique</b>
        </Heading>

        <Heading as="h3" size="sm" paddingTop={3}>
          <b>Temps de l'Avent</b>
        </Heading>

        {getAventSundays(choosenYear - 1).map((avent, i) => (
          <Event color="purple.200">
            {i === 3 && christmasDate.getDay() === 1 ? (
              <strong>Vigile de la Nativité</strong>
            ) : (
              <strong>
                {nthFR(i + 1)} {weekDaysToFR[avent.getDay()]} de l'Avent
              </strong>
            )}
            <DateString date={avent} />
          </Event>
        ))}

        <Event color="gold">
          <strong>Noël</strong>
          <DateString date={christmasDate} />
        </Event>

        {christmasDate.getDay() !== 0 && (
          <Event color="yellow.100">
            <strong>Dimanche dans l'octave de la nativité</strong>
            <DateString date={nextSundayAfterChristmas(christmasDate)} />
          </Event>
        )}

        <Event color="yellow.100">
          <strong>Octave de la nativité</strong>
          <DateString date={addDays(christmasDate, 7)} />
        </Event>

        <Heading as="h3" size="sm" paddingTop={3}>
          <b>Temps de l'Epiphanie</b>
        </Heading>

        {epiphanyImmutableDate.map((event, i) => (
          <Event color="green.200">
            <strong>{epiphanyImmutableDescription[i]}</strong>
            <DateString date={event} />
          </Event>
        ))}

        {epiphany1stPart.map((event, i) => (
          <Event color="green.400">
            <strong>{nthFR(i + 3)} dimanche après l'Epiphanie</strong>
            <DateString date={event} />
          </Event>
        ))}

        <Heading as="h3" size="sm" paddingTop={3}>
          <b>Temps du Carême</b>
        </Heading>

        {beforeFast.map((event, i) => (
          <Event color="purple.100">
            <strong>
              {weekDaysToFR[event.getDay()]} de la {beforeFastEvent[i]}
            </strong>
            <DateString date={event} />
          </Event>
        ))}

        <Event color="purple.300">
          <strong>Mercredi des Cendres</strong>
          <DateString date={addDays(easterDate, -46)} />
        </Event>

        {fastBeforeEaster.map((event, i) => (
          <Event color="purple.200">
            <strong>
              {nthFR(i + 1)} {weekDaysToFR[event.getDay()]} de carème
            </strong>
            <DateString date={event} />
          </Event>
        ))}

        {beforeEaster.map((event, i) => (
          <Event color="purple.300">
            <strong>
              {nthFR(i + 1)} {weekDaysToFR[event.getDay()]} de la passion
            </strong>
            <DateString date={event} />
          </Event>
        ))}

        <Heading as="h3" size="sm" paddingTop={3}>
          <b>Temps Pascal</b>
        </Heading>

        <Event color="gold">
          <strong>Pâques</strong>
          <DateString date={easterDate} />
        </Event>

        <Event color="yellow.100">
          <strong>Dimanche In Albis</strong>
          <DateString date={addDays(easterDate, 7)} />
        </Event>

        {afterEaster.map((event, i) => (
          <Event color="yellow.100">
            <strong>
              {nthFR(i + 2)} {weekDaysToFR[event.getDay()]} après Pâques
            </strong>
            <DateString date={event} />
          </Event>
        ))}

        <Event color="white">
          <strong>Ascension de Notre Seigneur Jésus Christ</strong>
          <DateString date={addDays(easterDate, 39)} />
        </Event>

        <Event color="white">
          <strong>Dimanche après l'Ascension</strong>
          <DateString date={addDays(easterDate, 42)} />
        </Event>

        <Heading as="h3" size="sm" paddingTop={3}>
          <b>Temps de la Pentecôte</b>
        </Heading>

        <Event color="red.300">
          <strong>Dimanche de la Pentecôte</strong>
          <DateString date={addDays(easterDate, 49)} />
        </Event>

        <Event color="red.300">
          <strong>Lundi de Pentecôte</strong>
          <DateString date={addDays(easterDate, 50)} />
        </Event>

        <Event color="white">
          <strong>Fête de la Très Sainte Trinité</strong>
          <DateString date={addDays(easterDate, 56)} />
        </Event>

        {Array(22)
          .fill(0)
          .map((useless, i) => (
            <Event color="green.200">
              {areDatesTheSame(
                addDays(easterDate, 63 + 7 * i),
                new Date(choosenYear, 7, 15)
              ) ? (
                <strong>Assomption de Notre Dame</strong>
              ) : (
                <strong>{nthFR(i + 2)} dimanche après la Pentecôte</strong>
              )}
              <DateString date={addDays(easterDate, 63 + 7 * i)} />
            </Event>
          ))}

        {get2ndEpiphanyPart(
          addDays(easterDate, 63 + 7 * 21),
          addDays(getAventSundays(choosenYear)[0], -7)
        ).map((event, i, array) => (
          <Event color="green.400">
            <div>
              <strong>
                {nthFR(7 - array.length + i)} dimanche de l'Epiphanie
              </strong>
              <em> - transféré</em>
            </div>
            <DateString date={event} />
          </Event>
        ))}

        <Event color="green.200">
          <strong>24ème et dernier dimanche après la Pentecôte</strong>
          <DateString date={addDays(getAventSundays(choosenYear)[0], -7)} />
        </Event>

        <Heading as="h2" size="md" paddingTop={3}>
          <b>Fin de l'année liturgique</b>
        </Heading>
      </VStack>
    </Container>
  )
}
