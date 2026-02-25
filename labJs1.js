// ejercicio 1 

const numeros=[1,2,3,4,5,6,7,8]

const paresImpares=numeros.reduce((num,n)=>{
    if(n%2===0)  num.pares.push(n)
    else  num.impares.push(n)

    return num
},{pares:[] , impares:[]})

console.log(paresImpares)

const frase="Hola buenos dias"
const palabraLarga=(fraseLarga)=>{
    const palabras=fraseLarga.split(" ")
    const lword=palabras.reduce((lp,p)=>{
        lp.push(p.length)
        return lp
    },[])
    const maximo=Math.max(...lword)
    return maximo
}
const masletras=palabraLarga(frase)

console.log(masletras)


const numInvertido=(n)=>{
    let numero=String(n)
    if(numero.length<2) return numero
    else{
        let inum=""
        for(let i=numero.length-1;i>=0;i--){
            inum+=numero[i]
        }
        return inum
    }
}
let ni=numInvertido(54321)
console.log(ni)


const np=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15];

const encontrarPrimos = (arrprimos) => {
    const primos = arrprimos.reduce((primo, n) => {
        let cont = 0

        for (let i = 1; i <= n; i++) {
            if (n % i === 0) cont++
        }

        if (cont === 2) {
            primo.push(n)
        }

        return primo
    }, [])

    return primos
}

let primos=encontrarPrimos(np)
console.log(primos)






const decimalABinario = (numero) => {
    let binario = ""
    let n = numero

    if (n === 0) return "0"

    while (n > 0) {
        let residuo = n % 2
        binario = residuo + binario
        n = Math.floor(n / 2)
    }

    return binario
}

const numeroMasRepetido = (array) => {
    let masRepetido = null
    let mayorCantidad = 0

    for (let i = 0; i < array.length; i++) {
        let contador = 0

        for (let j = 0; j < array.length; j++) {
            if (array[i] === array[j]) {
                contador++
            }
        }

        if (contador > mayorCantidad) {
            mayorCantidad = contador
            masRepetido = array[i]
        }
    }

    return masRepetido
}

console.log(decimalABinario(10))
console.log(numeroMasRepetido([1, 2, 3, 2, 4, 2, 5, 1]))





const sumarPropiedad = (array, propiedad) => {
    let suma = 0;

    for (let i = 0; i < array.length; i++) {
        suma = suma + array[i][propiedad];
    }

    return suma;
};

const objetos = [
    { nombre: "A", precio: 10 },
    { nombre: "B", precio: 20 },
    { nombre: "C", precio: 30 }
];

console.log(sumarPropiedad(objetos, "precio"));