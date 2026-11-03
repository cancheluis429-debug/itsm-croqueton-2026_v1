const animalTopicPattern =
  /\b(mascot[a-z]*|perr[a-z]*|gat[a-z]*|animal[a-z]*|cachorr[a-z]*|veterin[a-z]*|adop[a-z]*|rescat[a-z]*|refugi[a-z]*|croquet[a-z]*|aliment[a-z]*|nutric[a-z]*|vacun[a-z]*|desparasit[a-z]*|esteriliz[a-z]*|entren[a-z]*|paseos?|pasear|correas?|collares?|pulgas?|garrapatas?|bienestar animal|peluqueria canina|lomit[a-z]*|huellitas?|patitas?|cuatro patas|pet(?:s)?|dogs?|cats?|pupp(?:y|ies)|kittens?|veterinar[a-z]*|adopt[a-z]*|rescu[a-z]*|shelters?|kibble|pet care|animal health)\b/i

const clearlyUnrelatedPattern =
  /\b(criptomonedas?|bitcoin|nft|venta de (?:iphone|celular|auto|coche)|partido de futbol|futbol|politica|elecciones?|horoscopo|receta de (?:pasta|pastel|cocina)|streaming|videojuego|gaming)\b/i

function normalizePostText(body: string) {
  return body
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function assessPostRelevance(body: string, hasImage: boolean): 'approved' | 'blocked' | 'review' {
  const normalizedBody = normalizePostText(body)
  if (animalTopicPattern.test(normalizedBody)) return 'approved'
  if (clearlyUnrelatedPattern.test(normalizedBody)) return 'blocked'
  return hasImage || body.trim() ? 'review' : 'blocked'
}

export { normalizePostText, assessPostRelevance }
