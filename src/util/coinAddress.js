
/* public vars */
// coinjs.pub = 0x00;
// coinjs.priv = 0x80;


/* generate a new private key */
function generatePrivateKey() {
    
}

var random = function(length) {
    var r = "";
    var l = length || 25;
    var chars = "!$%^&*()_+{}:@~?><|\./;'#][=-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    for(x=0;x<l;x++) {
        r += chars.charAt(Math.floor(Math.random() * 62));
    }
    return r;
}

var newPrivkey = function(){
    var x = '';
    // var x = window.location;
    // x += (window.screen.height * window.screen.width * window.screen.colorDepth);
    x += random(64);
    // x += (window.screen.availHeight * window.screen.availWidth * window.screen.pixelDepth);
    // x += navigator.language;
    // x += window.history.length;
    x += random(64);
    // x += navigator.userAgent;
    x += 'coinb.in';
    // x += (Crypto.util.randomBytes(64)).join("");
    x += x.length;
    var dateObj = new Date();
    x += dateObj.getTimezoneOffset();
    x += random(64);
    // x += (document.getElementById("entropybucket")) ? document.getElementById("entropybucket").innerHTML : '';
    // x += x+''+x;
    var r = x;
    // for(i=0;i<(x).length/25;i++){
    //     r = Crypto.SHA256(r.concat(x));
    // }
    // var checkrBigInt = new BigInteger(r);
    // var orderBigInt = new BigInteger("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
    // while (checkrBigInt.compareTo(orderBigInt) >= 0 || checkrBigInt.equals(BigInteger.ZERO) || checkrBigInt.equals(BigInteger.ONE)) {
    //     r = Crypto.SHA256(r.concat(x));
    //     checkrBigInt = new BigInteger(r);
    // }
    return r;
}


console.log(newPrivkey())