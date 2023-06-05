function amsco(str, key){
    const table = [[],[],[],[],[]];
    let portion;
    let r = 0;
    let newstr = '';
    let tkey = {};
    key = (Array.from(String(key), Number));
    for (let i = 0; i < key.length; i++){
        tkey[key[i]] = i;
    }
    
    while (str.length > 0){
        portion = str.substring(0, 2);
        table[r%5].push(portion);
        str = str.substring(2);
        r++;
        
        portion = str.substring(0, 1);
        table[r%5].push(portion);
        str = str.substring(1);
        r++;
    }
    for (let i = 0; i < table.length; i++){
        for (let k = 0; k < table[tkey[i+1]].length; k++){
            newstr += table[tkey[i+1]][k];
        }
    }
    return newstr;
}

function antiamsco(str, key){
    const table = [[],[],[],[],[]];
    let tkey = {};
    let r = 0;
    let portion;
    let newstr = '';
    key = (Array.from(String(key), Number));
    for (let i = 0; i < key.length; i++){
        tkey[key[i]] = i;
    }
    
    
    for (let i = 0; i < (Math.floor(str.length/3))+(str.length%3); i++){
        table[r%5].push(2);
        r++;
        table[r%5].push(1);
        r++;
    }
    
    for (let i = 0; i < table.length; i++){
        for (let k = 0; k < table[tkey[i+1]].length; k++){
            portion = str.substring(0,table[tkey[i+1]][k]);
            str = str.substring(table[tkey[i+1]][k]);
            table[tkey[i+1]][k] = portion;
        }
    }
    for (let i = 0; i < table.length; i++){
        for (let k = 0; k < table.length; k++){
            if(table[k][i]){
                newstr += table[k][i];
            }
        }
    }
    return newstr;
}

function caesar(str, shift){
    let chars = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let charsUp = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    let nums = '0123456789'.split('');
    let specialChars = "!@#$%^&*-=+:/?.,<>".split('');
    let newstr = '';
    let shifttable = [{},{},{},{}];
    let length = str.length;
    
    for (let i = 0; i < chars.length; i++){
        // table[chars[i]] = chars[(i+shift)%26];
        shifttable[0][chars[i]] = chars[(i+shift)%26];
        shifttable[1][charsUp[i]] = charsUp[(i+shift)%26];
    }
    for (let i = 0; i < nums.length; i++){
        shifttable[2][nums[i]] = nums[(i+shift)%10];
    }
    for (let i = 0; i < specialChars.length; i++){
        shifttable[3][specialChars[i]] = specialChars[(i+shift)%18];
    }
    
    for (let i = 0; i < length; i++){
        if(!isNaN(parseInt(str.substring(0,1)))){
            newstr += shifttable[2][str.substring(0,1)];
            str = str.substring(1);
        } else if(shifttable[3][str.substring(0,1)]){
            newstr += shifttable[3][str.substring(0,1)];
            str = str.substring(1);
        } else if(str.substring(0,1) == str.substring(0,1).toUpperCase()){
            newstr += shifttable[1][str.substring(0,1)];
            str = str.substring(1);
        } else if (str.substring(0,1) == str.substring(0,1).toLowerCase()){
            newstr += shifttable[0][str.substring(0,1)];
            str = str.substring(1);
        }
    }
    return newstr;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function create(){
    let input = document.getElementById("input");
    let output = document.getElementById("output");
    
    let keys = [(Array.from(String("12345"), Number)), (Array.from(String("12345"), Number))];
    shuffle(keys[0]); shuffle(keys[1]);
    let key = keys[0].join('');
    let key2 = keys[1].join('');
    let ccvalue = Math.floor(Math.random() * (15 - 1) ) + 1;
    
    let encrypted = amsco(amsco(caesar(input.value, ccvalue), key), key2);
    output.innerHTML = `{\n    'encrypted': ${encrypted}\n    'CCS': ${ccvalue}\n    'AK1': ${key}\n    'AK2': ${key2}\n}`;
}

function keyDown(e) { 
  e = window.event || e;
  let key = e.keyCode;
  //space pressed
   if (key == 32) { //space
    e.preventDefault();
   }
}
