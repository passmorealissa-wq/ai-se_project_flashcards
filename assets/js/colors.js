    const colorMap = {
    green: "#64d583",
    blue: "#91a8f9",
    orange: "#ee955e",
    pink: "#ee92d7",
    purple: "#aa8ef0",
    yellow: "#f5d770",
    default: "#64d583",
    };

/**
 * Returns the hex value for a named color, or the default hex value if the
 * name is not in the color map.
 *
 * @param {string} colorName - The color-map key to look up.
 * @returns {string} The corresponding hexadecimal color.
 */
function stringToHex(colorName) {
  const color = colorMap[colorName];

  return color || colorMap.default;
}

/**
 * Finds the color-map key whose value matches a hexadecimal color.
 *
 * @param {string} hexValue - The hexadecimal color to look up.
 * @returns {string|null} The matching color name, or null if none matches.
 */
function hexToString(hexValue) {
  const colorString = Object.keys(colorMap).find(
    /**
     * Checks whether a color-map entry matches the supplied hex value.
     *
     * @param {string} key - The color-map key to inspect.
     * @returns {boolean} Whether the entry has the supplied hex value.
     */
    (key) => colorMap[key] === hexValue,
  );

  return colorString || null;
}

/**
 * Removes all BEM "_color_" modifier classes from an element.
 *
 * @param {HTMLElement} element - The element whose color classes are removed.
 * @returns {void}
 */
function removeColorClasses(element) {
  [...element.classList].forEach(
    /**
     * Removes a class when it is a color modifier.
     *
     * @param {string} cls - The class name to inspect.
     * @returns {void}
     */
    (cls) => {
      if (cls.includes("_color_")) {
        element.classList.remove(cls);
      }
    },
  );
}

export { stringToHex, hexToString, removeColorClasses };