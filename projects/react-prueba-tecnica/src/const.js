export const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
export const CAT_ENDPOINT_RANDOM_IMAGE = (firstWord) =>{
  const PREFIX_URL = 'https://cataas.com/cat/says/'
  const SUFFIX_URL = '?size=50&color=red'
  return `${PREFIX_URL}${firstWord}${SUFFIX_URL}`
}     