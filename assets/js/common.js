function convertNumbersToFixed(data, cnt) {
    data = Number(data)
    if (!isNaN(data)) {
        // If the input is a number, check if it's a float with more than 3 decimal places
        const isFloatWithMoreThan3DecimalPlaces = data % 1 !== 0 && data.toString().split('.')[1].length > cnt;
    
        // If true, round it to 2 decimal places; otherwise, leave it unchanged
        return isFloatWithMoreThan3DecimalPlaces ? parseFloat(data.toFixed(cnt)) : data;
      } else {
        // If the input is not a number or array, leave it unchanged
        return 0;
      }
}