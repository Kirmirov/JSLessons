let arr = ['488447', '3987', '20398', '29300', '40988', '39876', '98764'];

arr.forEach(function(i){
    let check = i.charAt(0);
    if(check == '2' || check == '4') console.log(i);
});

begin:
for(i = 2; i <= 100; i++){
    for (n = 2; n < i; n++){
        if (i%n == 0) continue begin;
    }
    console.log(i);
}
