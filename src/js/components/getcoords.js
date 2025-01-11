function getCoords(value) {
  const regExp = /[ [\]]/gi;
  const coords = value
    .replaceAll(regExp, "")
    .split(",")
    .map(function (item, index, arr) {
      const number = parseFloat(item);
      // if(arr.length !== 2 || isNaN(number) || (index === 0 && !number.inRange(-90, 90) || (index === 1 && !number.inRange(-180, 180)))) {
      if (
        arr.length !== 2 ||
        isNaN(number) ||
        (index === 0 && !inRange(number, -90, 90)) ||
        (index === 1 && !inRange(number, -180, 180))
      ) {
        throw new Error("Неверный формат ввода координат");
      }
      return number;
    });
  return { latitude: coords[0], longitude: coords[1] };
}

// Number.prototype.inRange = function(a, b) {
//   return this >=a && this <= b;
// }

function inRange(number, a, b) {
  return number >= a && number <= b;
}

export { getCoords };
