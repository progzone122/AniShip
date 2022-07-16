import { getDefaultVoicer } from '../../main/settings.js'
import { loadTitlesAnimevost, getTitleInfoAnimevost, searchInNameAnimevost, searchInGenreAnimevost } from './animevost.js'
import { loadTitlesAnilibria, getTitleInfoAnilibria, searchInNameAnilibria, searchInGenreAnilibria } from './anilibria.js'
const voicer = getDefaultVoicer();
export function loadTitles (sort, page) {
  switch (voicer) {
  case 'animevost':
    return loadTitlesAnimevost(sort, page)
  case 'anilibria':
    return loadTitlesAnilibria(sort, page)
  default:
    console.log('[ERROR] Значение voicer не найдено!')
    break
  }
}
export function getTitleInfo (id, v = 'auto') {
  switch (v) {
  case 'animevost':
    return getTitleInfoAnimevost(id)
  case 'anilibria':
    return getTitleInfoAnilibria(id)
  default:
    switch (voicer) {
    case 'animevost':
      return getTitleInfoAnimevost(id)
    case 'anilibria':
      return getTitleInfoAnilibria(id)
    default:
      console.log('[ERROR] Значение voicer не найдено!')
      break
    }
    break
  }
}
export async function searchInName (name) {
  return {
    animevost: searchInNameAnimevost(name).data,
    anilibria: searchInNameAnilibria(name).data
  }
}
export async function searchInGenre (gen, page) {
  let anilibria_titles = await searchInGenreAnilibria(gen, page);
  anilibria_titles = anilibria_titles.data;
  return {
    animevost: await searchInGenreAnimevost(gen, page),
    anilibria: anilibria_titles
  }
}
