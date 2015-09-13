import utils from './utils';

const FIRST = ['Limited', 'Endless', 'Orange', 'Blue', 'Swollen', 'Horrible', 'Great', 'Awesome', 'Terrible', 'Idiotic', 'Massive', 'Cheesy'];
const LAST = ['Peppermints', 'Oil', 'Dragon', 'Cafeteria', 'Junkie', 'Vegetables', 'Twinkies', 'Turtle', 'Fox', 'Calculator', 'Bandwidth', 'Crust', 'Cake', 'Derp'];
const COLORS =  ['#DE3404', '#E68210', '#BFBF0A', '#1D9608', '#24BD09', '#10DE81', '#10C2DE', '#07B0AD', '#0C56A6', '#C215BF', '#8B1AD6'];

module.exports = {
  generateName: function generateName() {
    return utils.getRandomFromArray(FIRST) + ' ' + utils.getRandomFromArray(LAST);
  },
  generateAvatar: function generateName() {
    return utils.getRandomFromArray(COLORS);
  },
};
