  
  document.addEventListener("DOMContentLoaded", function () {
    var buttonCalcularEqDio = document.getElementById("buttonCalcularEqDio");

    buttonCalcularEqDio.addEventListener("click", function (event) {
      var a = parseInt(document.querySelector("#cofA").value);
      var b = parseInt(document.querySelector("#cofB").value);
      var c = parseInt(document.querySelector("#cofC").value);

      var matriz = teoremaEuclides(a, b); 
      var mdc = encontraMDC(matriz[1]);
      temSolocao = equacaoPossuiSolucao(c, mdc); 
      if(temSolocao){
        var soluPartiM = calcularSolucaoParticular(matriz[0], 1, 0);
        var soluPartiN =  calcularSolucaoParticular(matriz[0], 0, 1);
        var solX = calcularUmaSolucao(soluPartiM[soluPartiM.length - 2], c, mdc);
        var solY = calcularUmaSolucao(soluPartiN[soluPartiN.length - 2], c, mdc);
        var solucaoFinalX = "x = " + solX + " + (" + b + "k)";
        var solucaoFinalY = "y = " + solY + " - (" + a + "k)";
        document.querySelector('#resultado').innerHTML = '<h2> Soluções inteiras </h2> <p>' + solucaoFinalX + '</p> <p>' + solucaoFinalY + '</p>'
        var solPositivaX = calcularSolucoesPositivas(solX, (b * 1));
        var solPositivaY = calcularSolucoesPositivas(solX, (a * -1));
        document.querySelector('#resultadoPositivo').innerHTML = '<h2> Soluções inteiras positivas </h2> <p>' + solPositivaX + '</p> <p>' + solPositivaY + '</p>'
      } else{
        document.querySelector('#resultado').innerHTML = '<h2> Resultado </h2> <p> Não há solução para a equação digitada.</p>'
      }
    });

  });

  function teoremaEuclides(a, b, c){
    var matriz = [[],[],[]];
    matriz[1][0] = a;
    matriz[1][1] = b;

    var posQuoAtual = 1;
    var posDivAtual = 0;
    var posRestoAtual = 1;

    matriz[0][0] = "X";
    matriz[2][0] = "X";

    var quociente = 0;  
    var resto = 1;

    while(resto != 0) {
      quociente = Math.floor(matriz[1][posDivAtual]/matriz[1][posDivAtual + 1]);
      resto = matriz[1][posDivAtual]%matriz[1][posDivAtual + 1];
      matriz[0][posQuoAtual] = quociente;
      matriz[1][posDivAtual + 2 ] = resto;
      matriz[2][posRestoAtual] = resto;

      posQuoAtual++;
      posDivAtual++;
      posRestoAtual++;
    }
    console.log(matriz);
    return matriz;
  }

  // MDC = número que torna o resto da divisão igual à zero
  function encontraMDC(linhaDividendo){
    length = linhaDividendo.length;
    return linhaDividendo[length - 2];s
  }

  // Se c | mdc, então possui solução
  function equacaoPossuiSolucao(c, mdc){
    temSolucao = false;
    if (c%mdc == 0){
      temSolucao = true;
    }
    return temSolucao;
  }

  // Teorema de euclides estendido - Solução particular é quando a equação é igualada ao MDC dos coeficientes
  function calcularSolucaoParticular(quocientes, m1, m2){
    var solucaoParticular = [m1, m2];
    var posQuo = 1;

    for(var i = 2; i <=  quocientes.length; i++){
      solucaoParticular[i] = solucaoParticular[i - 2] - (solucaoParticular[i -1] * quocientes[posQuo]);
      posQuo++;
    }
    return solucaoParticular;
  }

  // Encontrar uma solução x0 = m * c/MDC e y0 = n * c/MDC
  function calcularUmaSolucao(solucaoParticular, c, mdc){
    return solucaoParticular * c/mdc;
  }

  // Encontrar todas as soluções positivas
  function calcularSolucoesPositivas(sol, k){
    var sinal = ">";
   
    // Dividir o termo que não possui a variavel K pelo termo que a possui 
    // As exceções são a troca de sinal
    
    // Equação até aqui: x + ou - yk > 0
    console.log("" + sol + " " + k + "k" + sinal +  "0");
    
    k = k * -1;

    // Equação até aqui: x > yk
    console.log("" + sol + " " + sinal + " " + k + "k");

    if(k < 0){
      sol = sol * -1;
      k = k * -1;
      sinal = "<";
      // Equação até aqui: x < yk
      console.log("" + sol + " " + sinal + " " + k + "k");
    }

    var result = sol/k;
    result = "" + result + " " + sinal + " k";
    console.log("" + result + " " + sinal + " k");

    return result;
  }

