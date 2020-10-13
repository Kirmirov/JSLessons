let shortString = '   А роза упала на лапу Азора',
    longString = 'На краю дороги стоял дуб. Он был, вероятно, в десять раз старше берез, составлявших лес, в десять раз толще и в два раза выше каждой березы. Это был огромный, в два обхвата дуб, с обломанными суками и корой, заросшей старыми болячками. С огромными, неуклюже, несимметрично растопыренными корявыми руками и пальцами, он старым, сердитым и презрительным уродом стоял между улыбающимися березами. Только он один не хотел подчиниться обаянию весны и не хотел видеть ни весны, ни солнца',
    notString = 4949494949494,
    limit = 30;



function editString(string){
    if(typeof string != 'string'){
        return alert ('Неверный формат данных');
    };
    let strTrim = string.trim();
    if(strTrim.length >= limit){
        let cutString = strTrim.slice(0, limit);
        return cutString + '...'; 
    };
    return strTrim;
}

console.log(editString(shortString));
console.log(editString(longString));
console.log(editString(notString));