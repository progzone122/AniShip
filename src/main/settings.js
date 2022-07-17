import getAppDataPath from 'appdata-path'
import { getAllKeys, getOneEntry, setEntry } from './indexedDB.js'
const ncp = require("copy-paste");
export const getAppData = () => {
    return getAppDataPath().replaceAll('\\', '/') + '/AniShip';
}
export const getAnimeVostServer = () => {
    const servers = localStorage.getItem('animevost_server');
    if (servers !== null) {
        return servers;
    }else{
        localStorage.setItem('animevost_server', 'api.animetop.info');
        return "api.animetop.info";
    }
}
export const getDefaultVoicer = () => {
    const voicer = localStorage.getItem('voicer');
    if (voicer !== null) {
        return voicer;
    }else{
        localStorage.setItem('voicer', 'animevost');
        return "animevost";
    }
}
export const importDatabase = () => {
    const database = JSON.parse(ncp.paste());
    console.log(database);
    for(let i in database.favorites.animevost){
        setEntry('favorites', 'animevost', String(i), database.favorites.animevost[i]);
    }
    for(let i in database.favorites.anilibria){
        setEntry('favorites', 'anilibria', String(i), database.favorites.anilibria[i]);
    }
    return "Успешный импорт бэкапа базы данных";
}
export const exportDatabase = async () => {
    let database = {
        version: process.env.npm_package_version,
        favorites: {
            animevost: {},
            anilibria: {}
        }
    };
    let value;
    const animevost_keys = await getAllKeys('favorites', 'animevost');
    const anilibria_keys = await getAllKeys('favorites', 'anilibria');
    for(let i in animevost_keys){
        database.favorites.animevost[String(animevost_keys[i])] = await getOneEntry('favorites', 'animevost', String(animevost_keys[i]));
    }
    for(let i in anilibria_keys){
        database.favorites.anilibria[String(anilibria_keys[i])] = await getOneEntry('favorites', 'anilibria', String(anilibria_keys[i]));
    }
    ncp.copy(JSON.stringify(database));
    return "Бэкап успешно скопирован в буфер обмена";
}