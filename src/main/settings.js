import getAppDataPath from 'appdata-path'
export function getAppData(){
    return getAppDataPath().replaceAll('\\', '/') + '/AniShip';
}
export function getAnimeVostServer(){
    const servers = localStorage.getItem('animevost_server');
    if (servers !== null) {
        return servers;
    }else{
        localStorage.setItem('animevost_server', 'api.animetop.info');
        return "api.animetop.info";
    }
}
export function getDefaultVoicer(){
    const voicer = localStorage.getItem('voicer');
    if (voicer !== null) {
        return voicer;
    }else{
        localStorage.setItem('voicer', 'animevost');
        return "animevost";
    }
}
