// Math.cell()
// 올림한 정수를 리턴하는 함수 
console.log("1", Math.ceil(1)); //1
console.log("1.2222", Math.ceil(1.2222)); //2
console.log("1.5", Math.ceil(1.5)); //2
console.log("null", Math.ceil(null)); //0
console.log("0", Math.ceil(0)); //0
console.log("-1.8", Math.ceil(-1.8)); //-2


// Math.cell을 이용한 자릿수 지정
console.log("소수점이하 한자리", Math.ceil(1.222 * 10) / 10 ); //1.3
console.log("소수점이하 두자리", Math.ceil(1.222 * 100) / 100); //1.23
console.log("10단위", Math.ceil(153 / 10) * 10); //160
console.log("100단위", Math.ceil(1462 / 100) * 100); //1500

// Math.floor()
// 내림한 정수를 리턴하는 함수
console.log("1", Math.floor(1)); //1
console.log("1.2222", Math.floor(1.2222)); //1
console.log("1.5", Math.floor(1.8)); //1
console.log("null", Math.floor(null)); //0
console.log("0", Math.floor(0)); //0
console.log("-1.8", Math.floor(-1.8));

// Math.floor을 이용한 자릿수 지정
console.log("소수점이하 한자리", Math.floor(1.222 * 10) / 10); //1.2
console.log("소수점이하 두자리", Math.floor(1.222 * 100) / 100); //1.22
console.log("10단위", Math.floor(153 / 10) * 10); //150
console.log("100단위", Math.floor(1462 / 100 ) * 100) //1400

// Math.round()
// 반올림한 정수를 리턴하는 함수
console.log("1", Math.round(1)); //1
console.log("1.222", Math.round(1.222)); //1
console.log("1.5", Math.round(1.8)) //2
console.log("0", Math.round(0)); //0
console.log("null", Math.round(null)); //0
console.log("-1.8", Math.round(-1.8)); //-2

// Math.round를 이용한 자릿수 지정

