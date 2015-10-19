import { roomInputChange } from '../../../actions';
import { EMOJI_URL, EMOJI_IMAGES } from '../../../../common/emoji';
import jQuery from 'jquery';
import 'jquery-textcomplete';
import './index.css';

export default (el, dispatch) => (($) => {
  $(el).textcomplete([{
    match: /\B:([\-+\w]*)$/,
    search: (term, cb) => {
      cb(EMOJI_IMAGES.filter(emoji => emoji.indexOf(term) === 0 ? emoji : null));
    },
    template: (value) => `<img src="${ EMOJI_URL }/${ value }.png" /> ${ value }`,
    replace: (value) => `:${ value }: `,
    index: 1,
  }]).on( 'textComplete:select', () => dispatch(roomInputChange(el.value) ));
})(jQuery);

export const destroySuggestion = (el) => (($) => {
  $(el).textcomplete('destroy');
})(jQuery);
