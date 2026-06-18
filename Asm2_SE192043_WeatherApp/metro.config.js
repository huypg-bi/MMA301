const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add SVG to asset extensions so expo-image can load them via require()
config.resolver.assetExts.push('svg');

module.exports = config;
