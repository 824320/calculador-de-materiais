// Aguarde o carregamento do HTML
document.addEventListener('DOMContentLoaded', () => {
    // Selecione os elementos HTML
    const formulario = document.getElementById('formulario');
    const resultadoDiv = document.getElementById('resultado');
    const formulario2 = document.getElementById('formulario2');
    const resultadoDiv2 = document.getElementById('resultado2');
  
    // Adicione os eventos de envio dos formulários
    formulario.addEventListener('submit', (e) => {
      e.preventDefault();
  
      // Leia os valores dos campos de entrada
      const tipoMaterial = document.getElementById('tipoMaterial').value.trim();
      const valor = document.getElementById('comprimento').value.trim().replace(',', '.');
      const areaQuadrada = Number(valor);
  
      // Verifique se os valores são válidos
      if (tipoMaterial && !isNaN(areaQuadrada)) {
        try {
          // Chame a função calcularQuantidade
          const quantidade = calcularQuantidade(tipoMaterial, areaQuadrada);
          resultadoDiv.innerText = `A quantidade necessária é de ${quantidade} unidades.`;
        } catch (error) {
          resultadoDiv.innerText = error.message;
        }
      } else {
        resultadoDiv.innerText = 'Por favor, preencha todos os campos com valores válidos.';
      }
    });
  
    formulario2.addEventListener('submit', (e) => {
      e.preventDefault();
  
      // Leia os valores dos campos de entrada
      const tipoEstrutura = document.getElementById('tipotipoEstrutura').value.trim();
      const valorA = document.getElementById('ladoA').value.trim().replace(',', '.');
      const valorB = document.getElementById('ladoB').value.trim().replace(',', '.');
      const valorC = document.getElementById('ladoC').value.trim().replace(',', '.');
      let ladoA, ladoB, ladoC;
  
      // Verifique se a estrutura é laje ou broca 
      if (tipoEstrutura.toLowerCase() === 'viga baldrame') {
        ladoA = Number(valorA)/ 100; // Converter centímetros para metros
        ladoB = Number(valorB)/ 100; // Converter centímetros para metros
        ladoC = Number(valorC);
      } 
      else if(tipoEstrutura.toLowerCase() === 'broca'){
        ladoA = Number(valorA) / 100; // Converter centímetros para metros
        ladoB = Number(valorB)/100;  // Converter centímetros para metros
        ladoC = ""
      }
      else if (tipoEstrutura.toLowerCase() === 'laje'){
        ladoA = Number(valorA);
        ladoB = Number(valorB);
        ladoC = Number(valorC) / 100; // Converter centímetros para metros
        }
      
     else {
        ladoA = Number(valorA) / 100; // Converter centímetros para metros
        ladoB = Number(valorB) / 100; // Converter centímetros para metros
        ladoC = Number(valorC) / 100; // Converter centímetros para metros
      }
  
      // Verifique se os valores são válidos
      if (tipoEstrutura && !isNaN(ladoA) && !isNaN(ladoB) && !isNaN(ladoC)) {
        try {
          // Chame a função calcularVolumeConcreto
          const quantidade = calcularVolumeConcreto(tipoEstrutura, ladoA, ladoB, ladoC);
          resultadoDiv2.innerText = `A quantidade necessária é de ${quantidade} M³ de concreto.`;
        } catch (error) {
          resultadoDiv2.innerText = error.message;
        }
      } else {
        resultadoDiv2.innerText = 'Por favor, preencha todos os campos com valores válidos.';
      }
    });
  });
  
  // Função calcularQuantidade
  function calcularQuantidade(tipoMaterial, areaQuadrada) {
    let quantidade;
  
    switch (tipoMaterial.toLowerCase()) {
      case 'tijolo de 6 furos':
        quantidade = areaQuadrada * 40;
        break;
      case 'bloco de concreto':
        quantidade = areaQuadrada * 13;
        break;
      case 'tijolo de 8 furos':
        quantidade = areaQuadrada * 30;
        break;
      case 'tijolo maciço rústico':
        quantidade = areaQuadrada * 20;
        break;
  
      default:
        throw new Error('Tipo de material inválido');
    }
  
    return quantidade;
  }
  
  // Função calcularVolumeConcreto
function calcularVolumeConcreto(tipoEstrutura, ladoA, ladoB, ladoC) {
    let quantidade;
  
    switch (tipoEstrutura.toLowerCase()) {
      case 'viga':
      case 'viga baldrame':
        quantidade = ladoA * ladoB * ladoC;
        break;
      case 'coluna':
        quantidade = ladoA * ladoB * ladoC;
        break;
      case 'broca':
        quantidade = (3.14 * (ladoA*ladoA)) * ladoB;
        break;
      case 'laje':
        quantidade = ladoA * ladoB * ladoC;
        break; // Adicionei o break aqui
  
      default:
        throw new Error('Tipo de estrutura inválido');
    }
  
    return quantidade; // Agora a função retorna o valor de quantidade
  }