import _ from 'lodash';
import ntc from 'ntc';
import Chance from 'chance';
import randomcolor from 'randomcolor';
import { readdir } from 'fs';

const chance = new Chance();

function _generateColor() {
  const color = randomcolor({ luminosity: 'dark' });
  return {
    hex: color,
    name: ntc.name(color)[1],
  };
}

/**
 * Генерирует имя и цвет пользователя
 * @return {object}
 */

export function generateUser() {
  const randomColor = _generateColor();
  const randomWord = chance.word();

  return {
    name: `${randomColor.name} ${randomWord}`.replace(/\s+/g, '_').toLowerCase(),
    color: randomColor.hex,
  };
}

export function randomAvatar() {
  return new Promise((resolve, reject) => {
    const dir = '/server/userGenerator/images';
    readdir(`.${ dir }`, (err, files) => {
      if (err) {
        return reject(err);
      }

      if (files.length < 1) {
        return reject(new Error('No icons'));
      }

      const svgRegex = new RegExp(/\.(svg)/, 'gi');
      const icons = files.filter( icon => svgRegex.test(icon) );
      const iconUrl = encodeURI(`${ dir }/${ _.sample(icons) }`);

      resolve(iconUrl);
    });
  });
}
