import { type } from 'arktype' 

export const filmSchema = type({ 
  tmdbId : type('string.numeric.parse |> number > 0')
})

export const filmQuerySchema = type({
  query: "string >= 3" 
})