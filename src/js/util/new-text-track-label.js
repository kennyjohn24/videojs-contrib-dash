/**
 * Maps language code from embedded captions to a new label.
 *
 * @param {Object} player An instance of the videojs Player
 * @param {function} player.getNewLanguageCodeLabels A plugin from the videojs Player that retrieves a new label.
 *
 * @param {Object} trackConfig Text track configuration that comes from attributes of the embedded captions.
 * @return {Object} trackConfigCopy A copy of trackConfig with a new label set (if it exists in our plugin).
 */
function textTrackWithNewLabel(player, trackConfig) {
  const trackConfigCopy = Object.assign({ originalLabel: trackConfig.label }, trackConfig);
  // Lowercase language code to minimize key variations and adhere to videojs styling
  const languageCode = trackConfig.label.toLowerCase();
  const pluginForNewLabels = player.getNewLanguageCodeLabels;

  let newLabel;
  if (pluginForNewLabels) {
    newLabel = player.getNewLanguageCodeLabels()[languageCode];
  }

  if (newLabel) {
    trackConfigCopy.label = newLabel;
  } else {
    console.warn(`New label for '${languageCode}' was not found`);
  }
  return trackConfigCopy;
}

export default textTrackWithNewLabel;
