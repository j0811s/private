// https://github.com/kangax/html-minifier#options-quick-reference
const htmlmin = {
  collapseWhitespace: true,
  // preserveLineBreaks: true,
  removeComments : true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  sortAttributes: true,
  removeEmptyAttributes: true,
  removeEmptyElements: false,
  quoteCharacter: "\""
}

module.exports = htmlmin;