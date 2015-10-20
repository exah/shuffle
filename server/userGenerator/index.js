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

function _getRandomIcon() {
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

      resolve(_.sample(icons));
    });
  });
}

_getRandomIcon().then(icon => console.log(icon));

/**
 * Генерирует имя пользователя
 * @return {string}
 */
export function generateName() {
  return _.sample(FIRST) + ' ' + _.sample(LAST);
}

/**
 * Генерирует ссылку на аватар пользователя
 * @return {string}
 */
export function generateAvatar(uid) {
  return _generateUrl(uid);
}

export function generateUser() {
  const color = randomcolor();
  return {
    color: color,
    colorName: ntc(color),
    icon: _getRandomIcon(),
  };
}
