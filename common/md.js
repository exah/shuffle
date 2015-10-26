import marked from 'marked';
import highlight from 'highlight.js';
import 'highlight.js/styles/tomorrow.css';

const renderer = new marked.Renderer();
renderer.link = ( href, title, text ) => {
  return `<a target="_blank" href="${ href }" title="${ title }">${ text }</a>`;
};

renderer.image = ( href, title, text ) => {
  let out = `<img src="${ href }" alt="${ text }"`;
  if (title) {
    out += ` title="${ title }"`;
  }
  if (text === 'emoji') {
    out += ` class="article-emoji"`;
  }
  out += '/>';
  return out;
};

const options = {
  sanitize: true,
  breaks: true,
  renderer,
  highlight: (code) => highlight.highlightAuto(code).value,
};

export default text => marked(text, options);
