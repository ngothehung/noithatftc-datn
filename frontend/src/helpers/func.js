import * as moment from 'moment';
export const customNumber = (number, valueCustom) => {
	// return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + valueCustom;
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ₫';

}

export const checkTimeNow = (time) => {
	// return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + valueCustom;
	if(!time) return true;
	return moment().endOf('days').isAfter(moment(time).endOf('days'));
}

export function extractIdBySlug(string) {
    let arrSlug = string.split('-');
    return arrSlug.slice(-1).pop();
}