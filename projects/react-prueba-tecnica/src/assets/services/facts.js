import { CAT_ENDPOINT_RANDOM_FACT, CAT_ENDPOINT_RANDOM_IMAGE } from '../../const.js'

export const getRamdomFact = async () => {
    const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
    const data = await res.json()
    const { fact } = data
    const FirstWord = fact.split(' ')[0]
    const ramdomImage = CAT_ENDPOINT_RANDOM_IMAGE(FirstWord)
    return {fact, ramdomImage}
  }