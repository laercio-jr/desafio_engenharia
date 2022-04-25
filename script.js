//Base de códigos
const codigos = [
    "288355555123888",
    "335333555584333",
    "223343555124001",
    "002111555874555",
    "111188555654777",
    "111333555123333",
    "432055555123888",
    "079333555584333",
    "155333555124001",
    "333188555584333",
    "555288555123001",
    "111388555123555",
    "288000555367333",
    "066311555874001",
    "110333555123555",
    "333488555584333",
    "455448555123001",
    "022388555123555",
    "432044555845333",
    "034311555874001"
];

//Funções reutilizáveis
function codOrigem(codigo){
    return codigo.substring(0,3); 
}

function codDestino(codigo){
    return codigo.substring(3,6); 
}

function codLoggi(codigo){
    return codigo.substring(6,9); 
}

function codVendedor(codigo){
    return codigo.substring(9,12); 
}

function codProduto(codigo){
    return codigo.substring(12,15); 
}

function getNomeRegiao(regiao){    
    switch (true) {
        case (regiao >= 1 && regiao <= 99):
            return "Sudeste";
        case (regiao >= 100 && regiao <= 199):
            return "Sul";
        case (regiao >= 201 && regiao <= 299):
            return "Centro-oeste";
        case (regiao >= 300 && regiao <= 399):
            return "Nordeste";
        case (regiao >= 400 && regiao <= 499):
            return "Norte";
        default:           
            return "Região inválida";
    }
}

function totalizadoRegiaoDestino(pacotes, nomeLocalizacao){
    let nomeDestino, 
    totalizado = 0;

    pacotes.forEach(
        (element) => {
            nomeDestino = getNomeRegiao(codDestino(element));
            if(nomeDestino.toLowerCase() == nomeLocalizacao.toLowerCase()){
                totalizado += 1;
            }
        } 
    )

    return totalizado;
}

function isInvalido (codigos){
    let invalidos = [];

    codigos.forEach(
        (codigo) => {            
            if(
                codigo.length != 15 ||  // Se a quantidade de digitos for diferente de 15
                codVendedor(codigo) == 367 || // Se o codigo do vendedor for igual a 367 (CNPJ inativo)
                (codProduto(codigo) != 001 && codProduto(codigo) != 111 && codProduto(codigo) != 333 && codProduto(codigo) != 555 && codProduto(codigo) != 888) || // Se o produto for diferente de Jóias (001), Livros (111), Eletrônicos (333), Bebidas (555) e Brinquedos (888)
                (codProduto(codigo) == 001 && getNomeRegiao(codDestino(codigo)) == "Centro-oeste") // Se o produto for Jóia (001) e tiver destino para Centro-Oeste (201 ~ 299) ao mesmo tempo.
            ){
                invalidos.push(codigo);
            }
        } 
    )
    return invalidos;
}

function isValido (codigos){
    let validos = [];

    codigos.forEach(
        (codigo) => {            
            if(
                codigo.length == 15 &&  // Se a quantidade de digitos for igual a 15
                codVendedor(codigo) != 367 && // Se o codigo do vendedor for diferente de 367 
                (codProduto(codigo) == 001 || codProduto(codigo) == 111 || codProduto(codigo) == 333 || codProduto(codigo) == 555 || codProduto(codigo) == 888) && // Se o produto for igual de Jóias (001), Livros (111), Eletrônicos (333), Bebidas (555) e Brinquedos (888)
                !(codProduto(codigo) == 001 && getNomeRegiao(codDestino(codigo)) == "Centro-oeste") // Se o produto não for Jóia (001) e ao mesmo tempo tiver destino para Centro-Oeste (201 ~ 299).
            ){
                validos.push(codigo);
            }
        } 
    )
    return validos;      
}


function getNomeProduto(produto){    
    switch (true) {
        case (produto == 001):
            return "Jóias";
        case (produto == 111):
            return "Livros";
        case (produto == 333):
            return "Eletrônicos";
        case (produto == 555):
            return "Bebidas";
        case (produto == 888):
            return "Brinquedos";
        default:           
            return "Produto inválido";
    }
}

function getProdutoEspecifico(pacotes,nomeProdutoProcurado){
    let temProdutoEspecifico = [], nomeProduto;

    pacotes.forEach(
        (element,index) => {
            nomeProduto = getNomeProduto(codProduto(element));
            if(nomeProduto.toLowerCase() == nomeProdutoProcurado.toLowerCase()){
                temProdutoEspecifico.push(element);
            }
        } 
    )
    
    return temProdutoEspecifico;
}

function getOrigemEspecifica(pacotes,nomeRegiaoProcurada){
    let regiaoEspecifica = [], nomeRegiao;

    pacotes.forEach(
        (element,index) => {
            nomeRegiao = getNomeRegiao(codOrigem(element));
            if(nomeRegiao.toLowerCase() == nomeRegiaoProcurada.toLowerCase()){
                regiaoEspecifica.push(element);
            }
        } 
    )    
    return regiaoEspecifica;
}

function getDestinoEspecifico(pacotes,nomeDestinoProcurado){
    let regiaoEspecifica = [], nomeRegiao;

    pacotes.forEach(
        (element,index) => {
            nomeRegiao = getNomeRegiao(codDestino(element));
            if(nomeRegiao.toLowerCase() == nomeDestinoProcurado.toLowerCase()){
                regiaoEspecifica.push(element);
            }
        } 
    )    
    return regiaoEspecifica;
}

function getListaVendedores(codigos){
    let listaDeVendedores = [], vendedorExiste;

    codigos.forEach(
        (codigo) => {            
            vendedorExiste = listaDeVendedores.find(element => element == codVendedor(codigo));
            if(vendedorExiste==undefined){
                listaDeVendedores.push(codVendedor(codigo));
            }
        }
    );

    return listaDeVendedores;
}

function getVendedorEspecifico(pacotes,codVendedorProcurado){
    let vendedorEspecifico = [];

    pacotes.forEach(
        (element) => {
            if(codVendedor(element) == codVendedorProcurado){
                vendedorEspecifico.push(element);
            }
        } 
    )    
    return vendedorEspecifico;
}

/*
---Testes de funções + expected---

-TestaCodOrigem:
    console.log(codOrigem(codigos[0]))
    Esperado: 288

-TestaCodDestino:
    console.log(codDestino(codigos[0]))
    Esperado: 355

-TestaCodLoggi:
    console.log(codLoggi(codigos[0]))
    Esperado: 555

-TestaCodVendedor:
    console.log(codVendedor(codigos[0]))
    Esperado: 123  
    
-TestaCodProduto:
    console.log(codProduto(codigos[0]))
    Esperado: 888

-TestagetNomeRegiao:
    destinoEmCod = codDestino(codigos[0])
    console.log(getNomeRegiao(destinoEmCod))
    Esperado: Nordeste

*/

// --RESOLUÇÃO DOS ITENS--
// Q1
const q1 = document.getElementById('q1');
const q1pt2 = document.getElementById('q1-pt2');
codigos.forEach(
    (element, index) => {
        q1.innerHTML += `<li> Pacote ${index+1} : ${getNomeRegiao(codDestino(element))} </li>`
    }
)


q1pt2.innerHTML += `<li> Sudeste: ${totalizadoRegiaoDestino(codigos, "Sudeste")} </li>`
q1pt2.innerHTML += `<li> Sul: ${totalizadoRegiaoDestino(codigos, "Sul")} </li>`
q1pt2.innerHTML += `<li> Centro-Oeste: ${totalizadoRegiaoDestino(codigos, "Centro-Oeste")} </li>`
q1pt2.innerHTML += `<li> Nordeste: ${totalizadoRegiaoDestino(codigos, "Nordeste")} </li>`
q1pt2.innerHTML += `<li> Norte: ${totalizadoRegiaoDestino(codigos, "Norte")} </li>`

    /* TESTE Q1
    console.log("Q1 - Região de destino de cada pacote + totalização/soma por região");
    codigos.forEach(
        (element, index) => {
            console.log(
                `Pacote ${index+1}:`,
                getNomeRegiao(codDestino(element))
            )
        }
    )

    console.log("")
    console.log("Totalização por região:")
    console.log(`Sudeste: ${totalizadoRegiaoDestino(codigos, "Sudeste")}`)
    console.log(`Sul: ${totalizadoRegiaoDestino(codigos, "Sul")}`)
    console.log(`Centro-Oeste: ${totalizadoRegiaoDestino(codigos, "Centro-Oeste")}`)
    console.log(`Nordeste: ${totalizadoRegiaoDestino(codigos, "Nordeste")}`)
    console.log(`Norte: ${totalizadoRegiaoDestino(codigos, "Norte")}`)

    console.log("");
    */

//Q2
const codigosValidos = isValido(codigos);
const codigosInvalidos = isInvalido(codigos);

const q2validos = document.getElementById('q2validos');
const q2invalidos = document.getElementById('q2invalidos');

codigosValidos.forEach(
    (element) => {
        q2validos.innerHTML += `<li> ${element} </li>`
    }
)

codigosInvalidos.forEach(
    (element) => {
        q2invalidos.innerHTML += `<li> ${element} </li>`
    }
)
    /* TESTE Q2
    console.log("Q2 - Pacotes com códigos válidos/inválidos");
    console.log("Códigos válidos:");
    codigosValidos.forEach(element => console.log(element))
    console.log("Códigos inválidos:");
    codigosInvalidos.forEach(element => console.log(element))

    console.log("");
    */


//Q3

const q3 = document.getElementById('q3');
const pacotesComBrinquedos = getProdutoEspecifico(codigos,"Brinquedos");
const pacotesComBrinquedosOrigemSul = getOrigemEspecifica(pacotesComBrinquedos,"Sul");
if(pacotesComBrinquedosOrigemSul.length != 0){
    pacotesComBrinquedosOrigemSul.forEach(
        (element) => {
            q3.innerHTML += `<li> ${element} </li>`;
        }
    )
} else {
    q3.innerHTML += "Não existem pacotes com Brinquedos e origem no Sul ao mesmo tempo";
}

    /* TESTE Q3
    console.log("Q3 - Pacotes com Brinquedos e destino Sul ao mesmo tempo");
    (pacotesComBrinquedosOrigemSul.length != 0) ? console.log(pacotesComBrinquedosOrigemSul) : console.log("Não existem pacotes com Brinquedos e origem no Sul ao mesmo tempo")

    console.log("");
    */

//Q4
let regiao, agrupadoSudeste = [], agrupadoSul = [], agrupadoCentroOeste = [], agrupadoNordeste = [], agrupadoNorte = [];

const q4 = document.getElementById('q4');

codigosValidos.forEach(
    (element) => {
        regiao = getNomeRegiao(codDestino(element));
        switch (true) {
            case (regiao == "Sudeste"):
                agrupadoSudeste.push(element);
                break;
            case (regiao == "Sul"):
                agrupadoSul.push(element);
                break;
            case (regiao == "Centro-Oeste"):
                agrupadoCentroOeste.push(element);
                break;
            case (regiao == "Nordeste"):
                agrupadoNordeste.push(element);
                break;
            case (regiao == "Norte"):
                agrupadoNorte.push(element);
                break;
        }        
    }
)

agrupadoSudeste.forEach(
    (element) => {
        q4sudeste.innerHTML += `<li> ${element} </li>`;
    }
)
agrupadoSul.forEach(
    (element) => {
        q4sul.innerHTML += `<li> ${element} </li>`;
    }
)
agrupadoCentroOeste.forEach(
    (element) => {
        q4centro.innerHTML += `<li> ${element} </li>`;
    }
)
agrupadoNordeste.forEach(
    (element) => {
        q4nordeste.innerHTML += `<li> ${element} </li>`;
    }
)
agrupadoNorte.forEach(
    (element) => {
        q4norte.innerHTML += `<li> ${element} </li>`;
    }
)
    /* TESTE Q4
    console.log("Q4 - Códigos validos agrupados por destino");
    console.log("Totais:")
    console.log(`Sudeste:`);
    agrupadoSudeste.forEach(element => console.log(element))
    console.log(`Sul:`);
    agrupadoSul.forEach(element => console.log(element))
    console.log(`Centro-Oeste:`);
    agrupadoCentroOeste.forEach(element => console.log(element))
    console.log(`Nordeste:`);
    agrupadoNordeste.forEach(element => console.log(element))
    console.log(`Norte:`);
    agrupadoNorte.forEach(element => console.log(element))

    console.log("");

    */

// Q5

const q5 = document.getElementById('q5');
const listaVendedores = getListaVendedores(codigosValidos);
listaVendedores.forEach( 
    (element) => {
        let listaVendedor = getVendedorEspecifico(codigosValidos,element);
        q5.innerHTML += `<div class="px-2">
            Vendedor ${element}:
                <ul id="q5v${element}" class="lista">
                </ul>
            </div>
        `; 
        let q5v = document.getElementById(`q5v${element}`);
        listaVendedor.forEach(element => q5v.innerHTML += `<li> ${element} </li>`)
    }
)

    /* TESTE Q5
    
    console.log("Q5 - Lista de vendedores e seus pacotes (somente com códigos válidos)");
    listaVendedores.forEach( 
        (element) => {
            let listaVendedor = getVendedorEspecifico(codigosValidos,element);
            console.log(`Vendedor ${element}:`);
            listaVendedor.forEach( element => console.log(element));
        }
    )

    console.log("");
    */

// Q6
q6 = document.getElementById('q6');
codigosValidos.forEach(
    (element) => {
        q6.innerHTML += `<tr> <td>${element}</td> <td>${getNomeRegiao(codDestino(element))}</td> <td>${getNomeProduto(codProduto(element))}</td> </tr>`;        
    }
)
    /* TESTE Q6
    console.log("Q6 - Lista de pacotes com códigos válidos, seu destino e o tipo de produto");
    codigosValidos.forEach(
        (element, index) => {
            console.log(
                `Código ${element}: ${getNomeRegiao(codDestino(element))} - ${getNomeProduto(codProduto(element))}`,            
            )
        }
    )
    console.log("");
    */

// Q7 

q7 = document.getElementById('q7');

const pacotesComDestinoNorte = getDestinoEspecifico(codigosValidos,"Norte");
const pacotesComDestinoCentroOeste = getDestinoEspecifico(codigosValidos,"Centro-Oeste");
pacotesComDestinoNorte.forEach(element => q7.innerHTML += `<li> ${element} </li>`)
pacotesComDestinoCentroOeste.forEach(element => q7.innerHTML += `<li> ${element} </li>`)

// Q8/Q9
// Não sei se o item quis dizer isso, mas interpretei como uma ordem de 
// carga (origem) no Norte , para descarregar (destino) no Centro-Oeste primeiro, depois o restante das regiões
// Basicamente, essa parte do código irá mover as rotas com destino desejado para primeiro na fila, no caso o Centro-Oeste

let pacotesComOrigemNorte = getOrigemEspecifica(codigosValidos,"Norte");
let pacotesComOrigemNorteEmFila = [];

q8 = document.getElementById('q8');

pacotesComOrigemNorte.forEach( //Passando os itens do Centro-Oeste para o inicio da fila
    (element,index) => {
        if(getNomeRegiao(codDestino(element)) == "Centro-Oeste"){
            pacotesComOrigemNorteEmFila.push(element)
            pacotesComOrigemNorte.splice(index,1)
        }
    }
)

pacotesComOrigemNorte.forEach(element => pacotesComOrigemNorteEmFila.push(element)) //Passando o restante do array na ordem que estava

pacotesComOrigemNorteEmFila.forEach(
    (element) => {
        q8.innerHTML += `<tr> <td>${element}</td> <td>${getNomeRegiao(codOrigem(element))}</td> <td>${getNomeRegiao(codDestino(element))}</td> </tr>`;        
    }
)

    /* TESTE Q8/Q9
    console.log("Q8/Q9 - Fila de pacotes serão descarregados, em ordem, partindo do Norte e indo para o Centro Oeste primeiro");
    pacotesComOrigemNorteEmFila.forEach(
        (element) => {
            console.log(
                `Pacote ${element}: ${getNomeRegiao(codOrigem(element))} -> ${getNomeRegiao(codDestino(element))}`            
            )
        }
    )


    console.log("");
    */

// Q10
const q10 = document.getElementById('q10');
codigosInvalidos.forEach((element) => {q10.innerHTML += "<li>" + element + "</li>"});

    /* TESTE Q10
    console.log("Q10 - Códigos inválidos:");
    codigosInvalidos.forEach(element => console.log(element));
    */
