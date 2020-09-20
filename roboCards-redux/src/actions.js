import { CHANGE_SEARCHFIELD } from './constans'

export const setSearchField = (text) => ({
  type: CHANGE_SEARCHFIELD,
  payload: text
})