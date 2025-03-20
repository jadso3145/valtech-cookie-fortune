import { defineMessages } from 'react-intl'

const storePrefix = 'store/cookie-fortune.'
const adminPrefix = 'admin/cookie-fortune.'

export const textVariables = defineMessages({
  getYourFortune: {
    id: `${storePrefix}get-fortune`,
  },
  loading: {
    id: `${storePrefix}loading`,
  },
})

export const adminTexts = defineMessages({
  typesPhrase: {
    id: `${adminPrefix}type-phrase`,
  },
  addPhrase: {
    id: `${adminPrefix}add-phrase`,
  },
  add: {
    id: `${adminPrefix}add`,
  },
  cancel: {
    id: `${adminPrefix}cancel`,
  },
  labelPhrase: {
    id: `${adminPrefix}label-phrase`,
  },
  getYourFortuneTitle: {
    id: `${adminPrefix}title`,
  },
  modalTitle: {
    id: `${adminPrefix}modal-title`,
  },
  showRows: {
    id: `${adminPrefix}show-rows`,
  },
})
