import _ from 'lodash';
import ntc from 'ntc';
import randomcolor from 'randomcolor';
import { readdir } from 'fs';

const FIRST = [
  'Limited', 'Endless', 'Orange', 'Blue', 'Swollen', 'Horrible',
  'Great', 'Awesome', 'Terrible', 'Idiotic', 'Massive', 'Cheesy',
];
const LAST = [
  'Peppermints', 'Oil', 'Dragon', 'Cafeteria', 'Junkie', 'Vegetables', 'Twinkies',
  'Turtle', 'Fox', 'Calculator', 'Bandwidth', 'Crust', 'Cake', 'Derp',
];
const GENDER = ['male', 'female'];

function _generateUrl(uid) {
  const gender = _.sample(GENDER);
  return `http://eightbitavatar.herokuapp.com/?id=${uid}&s=${gender}&size=64`;
}

/**
 * Генерирует имя пользователя
 * @return {string}
 */
export function generateName() {
  return (_.sample(FIRST) + '_' + _.sample(LAST)).toLowerCase();
}

/**
 * Генерирует ссылку на аватар пользователя
 * @return {string}
 */
export function generateAvatar(uid) {
  return _generateUrl(uid);
}

export function generateColor() {
  const color = randomcolor({ luminosity: 'dark' });
  return {
    hex: color,
    name: ntc.name(color)[1],
  };
}

export function randomAvatar() {
  return new Promise((resolve, reject) => {
    readdir('./server/userGenerator/images', (err, files) => {
      if (err) {
        return reject(err);
      }

      if (files.length < 1) {
        return reject(new Error('No icons'));
      }

      const svgRegex = new RegExp(/\.(svg)/, 'gi');
      const icons = files.filter( icon => svgRegex.test(icon) );
      const iconUrl = encodeURI(`/server/userGenerator/images/${ _.sample(icons) }`);

      resolve(iconUrl);
    });
  });
}
