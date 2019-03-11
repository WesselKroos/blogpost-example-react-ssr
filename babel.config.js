module.exports = {
  "sourceType": "unambiguous",
  "ignore": [/[\/\\]core-js/, /@babel[\/\\]runtime/],
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties"
  ]
}