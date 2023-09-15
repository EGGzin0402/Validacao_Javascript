const inputCPF = document.getElementById("cpf");
const inputTel = document.getElementById("telefone");
const inputCel = document.getElementById("celular");
const inputRG = document.getElementById("rg");
const inputCEP = document.getElementById("cep");
const inputEstado = document.getElementById("estado");

inputCPF.addEventListener("keypress", FormatarCPF);
inputTel.addEventListener("keypress", FormatarTel);
inputCel.addEventListener("keypress", FormatarCel);
inputRG.addEventListener("keypress", FormatarRG);
inputCEP.addEventListener("keypress", FormatarCEP);

function FormatarCPF() {
    SomenteNumero(event);
    inputCPF.setAttribute("maxlength", "14");
    let inputlength = inputCPF.value.length;
    if (inputlength === 3 || inputlength == 7) {
        inputCPF.value += ".";
    }
    if (inputlength === 11) {
        inputCPF.value += "-";
    }
}

function FormatarTel() {
    SomenteNumero(event);
  inputTel.setAttribute("maxlength", "13");
  let inputlength = inputTel.value.length;
  if (inputlength == 1) {
    inputTel.value = "(" + inputTel.value;
  }
  if (inputlength == 3) {
    inputTel.value += ")";
  }
  if (inputlength == 8) {
    inputTel.value += "-";
  }
}

function FormatarCel() {
    SomenteNumero(event);
  inputCel.setAttribute("maxlength", "14");
  let inputlength = inputCel.value.length;
  if (inputlength == 1) {
    inputCel.value = "(" + inputCel.value;
  }
  if (inputlength == 3) {
    inputCel.value += ")";
  }
  if (inputlength == 9) {
    inputCel.value += "-";
  }
}

function FormatarRG() {
    inputRG.setAttribute("maxlength", "12");
    let inputlength = inputRG.value.length;
    if (inputlength == 2 || inputlength == 6) {
        inputRG.value += ".";
    }
    if (inputlength == 10) {
        inputRG.value += "-";
    }
}

function FormatarCEP() {
    SomenteNumero(event);
    inputCEP.setAttribute("maxlength", "9");
    let inputlength = inputCEP.value.length;
    if (inputlength == 5) {
        inputCEP.value += "-";
    }
}

function ValidarCPF() {
    let algarismos = inputCPF.value.split("");

    var y = 10;
    var soma = 0;

    for (x = 0; x < 11; x++) {
        if (algarismos[x] != ".") {
        let a = algarismos[x];
        soma += a * y;
        y--;
        }
    }

    var resto = soma % 11;

    var d1;

    if (resto < 2) {
        d1 = 0;
    } else {
        d1 = 11 - resto;
    }

    var n = 10;
    var soma2 = 0;

    for (x = 1; x < 11; x++) {
        if (algarismos[x] != ".") {
        let a = algarismos[x];
        soma2 += a * n;
        n--;
        }
    }
    soma2 += d1 * n;

    var resto2 = soma2 % 11;

    var d2;

    if (resto2 < 2) {
        d2 = 0;
    } else {
        d2 = 11 - resto2;
    }

    var valido = d1.toString() + d2.toString();   

    if (algarismos[12] + algarismos[13] == valido) {
        console.log("CPF Válido");
    } else {
        console.log("CPF inválido");
    }
}

function SomenteNumero(e) {
    var tecla;
    
    if (e.which) {
        tecla = e.which;
    } else {
        tecla = e.keyCode;
    }

    if ((tecla >= 48 && tecla <= 57) || (e.which == 8)) {
        return true;
    } else {
        e.preventDefault();
    }
}

function NotNull() {

    let inputs = document.querySelectorAll("input");
    if (inputs[0].value == "") {
        console.log("Preencha o campo "+inputs[0].id);
    }
    if (inputs[1].value == "") {
        console.log("Preencha o campo "+inputs[1].id);
    }
    if (inputs[2].value == "") {
        console.log("Preencha o campo "+inputs[2].id);
    }
    if (inputs[3].value == "") {
        console.log("Preencha o campo "+inputs[3].id);
    }
    if (inputs[4].value == "") {
        console.log("Preencha o campo "+inputs[4].id);
    }
    if (inputs[5].value == "") {
        console.log("Preencha o campo "+inputs[5].id);
    }
    if (inputEstado.value == ""){
        console.log("Preencha o campo "+inputEstado.id);
    }
    if (inputs[6].value == "") {
        console.log("Preencha o campo "+inputs[6].id);
    }
    if (inputs[7].value == "") {
        console.log("Preencha o campo "+inputs[7].id);
    }
    if (inputs[8].value == "") {
        console.log("Preencha o campo "+inputs[8].id);
    }
    
}

function ValidacaoGeral() {

    NotNull();
    
    ValidarCPF();
    
}


$(document).ready(function() {

    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $("#endereco").val("");
        $("#bairro").val("");
        $("#cidade").val("");
        $("#estado").val("");
    }
    
    //Quando o campo cep perde o foco.
    $("#cep").blur(
        function ConsultaCEP() {

        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("#endereco").val("...");
                $("#bairro").val("...");
                $("#cidade").val("...");
                $("#uf").val("...");
                $("#ibge").val("...");

                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#endereco").val(dados.logradouro);
                        $("#bairro").val(dados.bairro);
                        $("#cidade").val(dados.localidade);
                        $("#estado").val(dados.uf);
                        $("#ibge").val(dados.ibge);
                        console.log("CEP encontrado.");
                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep();
                        console.log("CEP não encontrado.");
                    }
                });
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    });
});