/**
 * Maps language code from embedded captions to a new label.
 *
 * @param {Object} player An instance of the videojs Player
 * @param {function} player.mapLangToNewLabel A plugin from the videojs Player that retrieves a new label.
 *
 * @param {Object} trackConfig Text track configuration that comes from attributes of the embedded captions.
 * @return {Object} trackConfigCopy A copy of trackConfig with a new label set (if it exists in our plugin).
 */
function textTrackWithNewLabel(player, trackConfig) {
  const pluginForNewLabel = player.mapLangToNewLabel;

  if (pluginForNewLabel) {
    // only text track should go in here, not dash track right...?
    console.log(trackConfig);
    // Lowercase language code to minimize key variations and adhere to videojs styling
    const languageCode = trackConfig.label || '';
    const newLabel = player.mapLangToNewLabel(languageCode.toLowerCase());

    if (newLabel) {
      const trackConfigCopy = Object.assign({}, trackConfig);
      trackConfigCopy.label = newLabel;
      return trackConfigCopy;
    }
  }

  return trackConfig;
}

export default textTrackWithNewLabel;
