export function areEqual(obj1, obj2) {
	return Object.keys(obj1).every((ke) => obj2.hasOwnProperty(ke) && (obj1[ke] === obj2[ke]));
};