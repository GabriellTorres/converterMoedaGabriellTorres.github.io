
let btn = document.querySelector(".converter");

btn.addEventListener("click", async function(){
    let moedaInicial = document.querySelector(".moedaInc").value;
    let moedaFinal = document.querySelector(".moedaConv").value;
    let valor = document.querySelector(".valor").value;

    if(moedaInicial && moedaFinal && valor){
        try{
            let result = await converterMoeda(valor, moedaInicial, moedaFinal);
            console.log(result);

            let respostaHTML = document.createElement('p');
            respostaHTML.textContent = `${valor} ${moedaInicial} -- ${result} ${moedaFinal}`
            document.body.appendChild(respostaHTML);
        }
        catch(error){
            alert("Erro: " + error);
        }
    }
    else{
        alert("Preencha todos os campos");
    }
});

async function converterMoeda(valor, moedaInicial, moedaDestino){
    let url = `https://v6.exchangerate-api.com/v6/571ac2a366771a1aa1cd457c/latest/${moedaInicial}`
    let obj = await requisitar(url);
    let result = converter(obj, valor, moedaDestino);
    
    return result;
}

async function requisitar(url){
    let response = await fetch(url);
    if (!response.ok) {
        throw new Error("Erro na requisição");
    }
    let data = response.json();
    return data;
}

function converter(obj,valor,moedaDestino){
    let taxa = obj.conversion_rates[moedaDestino];
    if (!taxa) {
        throw new Error("Moeda de destino não encontrada");
    }
    let valorConvertido = (valor * taxa).toFixed(2);
    return valorConvertido;
}
