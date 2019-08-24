

const { TouchBar } = require('electron');
const { TouchBarColorPicker, TouchBarButton } = TouchBar;

module.exports = (dirname, eventEmitter) => {
  const colorpicker = new TouchBarColorPicker({
    change: color => eventEmitter.emit('changeColor', color),
  });
  const eyedropper = new TouchBarButton({
    icon: `${dirname}/resources/eyedropper-touchbar.png`,
    click: () => eventEmitter.emit('launchPicker'),
  });
  const colorsbook = new TouchBarButton({
    icon: `${dirname}/resources/colorsbook-touchbar.png`,
    click: () => eventEmitter.emit('launchColorsbook'),
  });
  const settings = new TouchBarButton({
    icon: `${dirname}/resources/settings-touchbar.png`,
    click: () => eventEmitter.emit('showPreferences'),
  });

  const touchbar = new TouchBar([colorpicker, eyedropper, colorsbook, settings]);


  return touchbar;
};
