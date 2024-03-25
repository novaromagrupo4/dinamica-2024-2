var a=1;
let b=2;
const c=3;

let nome = "Eduardo";
let sobrenome = "Tavares";
let nome_completo = nome + " " + sobrenome;

console.log("Soma=", a+b+c);
console.log("Log:", a,b,c);
console.log("Meu nome é:", nome);
console.log(nome_completo);

function soma(x, y) {
    let resultado = x+y;    
    console.log(resultado);
}


console.log("Valor de A:", a);
soma(45, 89);

// Funções de primeira classe
const multiplica = function (x, y) {
    let resultado = x * y;
    console.log(resultado);
}

multiplica(30, 5);

function mult(r, t, callback) {
    callback(r, t);
}

mult(2, 3, function(m,n) {
    let resultado = m + n + 1;
    console.log(resultado);
});

// Arrow Functions
const divisao = (a, b) => a/b;

console.log(divisao(10,2));