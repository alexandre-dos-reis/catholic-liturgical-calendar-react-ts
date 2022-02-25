const weekDaysToFR = [
  'Dimanche',
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
]

const MonthToFR = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
]

interface DateProps {
  date: Date
}

export default function DateString({ date }: DateProps) {
  return (
    <>
      {weekDaysToFR[date.getDay()]} {date.getDate()}{' '}
      {MonthToFR[date.getMonth()]} {date.getFullYear()}
    </>
  )
}
