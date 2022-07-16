import * as localForage from "localforage";
localForage.config({
    driver: localForage.WEBSQL, // Force WebSQL; same as using setDriver()
    name: 'AniShip',
    version: 1.0,
    size: 4980736, // Size of database, in bytes. WebSQL-only for now.
    storeName: 'keyvaluepairs', // Should be alphanumeric, with underscores.
    description: '...'
});
export const setEntry = (db, store, key, value) => {
	const table = localForage.createInstance({
		name: db,
		storeName: store,
		description: '...'
	});
	table.setItem(key, value);
}
export const getOneEntry = (db, store, key) => {
	const table = localForage.createInstance({
		name: db,
		storeName: store,
		description: '...'
	});
	return table.getItem(key).then(value => {
		return value;
	})
}
export const getAllKeys = (db, store) => {
	const table = localForage.createInstance({
		name: db,
		storeName: store,
		description: '...'
	});
	return table.keys().then(value => {
		return value;
	})
}
export const removeEntry = (db, store, key) => {
	const table = localForage.createInstance({
		name: db,
		storeName: store,
		description: '...'
	});
	table.removeItem(key);
}
export const clearStore = (db, store) => {
	const table = localForage.createInstance({
		name: db,
		storeName: store,
		description: '...'
	});
	table.clear();
}