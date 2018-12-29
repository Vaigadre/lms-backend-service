var lzString = require('lz-string');

module.exports = function unscramble (cipher) {
    // var cipher = document.getElementById('scrambled-data').value;
    var uncompresseData = lzString.decompressFromEncodedURIComponent(cipher);
    var data = decodeURIComponent(uncompresseData);
    var regLen = data.length % 2;
    var regex;
    if (regLen === 0) {
        regex = new RegExp(".{1,2}");
    }
    else {
        regex = new RegExp(".{1," + regLen + "}");
    }
    
    var end = data.match(regex);
    var start = data.replace(regex, '');
    
  //  console.log('Inside descrambling logic: ' + start);

    if (start) {
        data = start.match(/.{1,2}/g).reverse().join('');
    }
    if (end) {
        data = data + end[0];
    }
    return data || "Error while scramblng!";
    // document.getElementById('unscrambled-data').value = data || "Found Error!";
}