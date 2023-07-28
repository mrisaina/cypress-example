import { signup } from '../constants/selectors'

type BirthDay = {
  month: string
  day: number
  year: number
}

export const selectBirthDate = ({ month, day, year }: BirthDay) => {
  signup.dropdown('Month').select(month)
  signup.dropdown('Day').select(String(day))
  signup.dropdown('Year').select(String(year))
}
