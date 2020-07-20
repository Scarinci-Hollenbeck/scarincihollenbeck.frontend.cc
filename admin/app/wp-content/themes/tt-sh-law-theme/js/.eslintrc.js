module.exports = {
  "extends": "airbnb",
  "rules": {
      "linebreak-style": 0,
      "global-require": 0,
      "eslint linebreak-style": [0, "error", "windows"],
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
  },
  "env": {
    "browser": true,
    "node": true
  },
};