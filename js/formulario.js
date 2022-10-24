(function () {
    'use strict'

    const vTitulo = document.getElementById("txtTitulo");
    const vDescricao = document.getElementById("txtDescricao");
    const vBtn = document.getElementById("btn");
    const vFormulario = document.querySelector(".formCadastro");

    const vDescricaoTextArea = document.getElementById("txtDescricao");
    const vContadorContainer = document.getElementById("contador");
    const vCaracterRestante = vContadorContainer.getElementsByTagName("span")[0];
    const vMaximoCaracteres = vDescricaoTextArea.maxLength; //Busca o valor do atributo maxlength do html

    const vStatusCheckBox = document.querySelector("[type=checkbox]"); //document.getElementById("chkAceito");

    const vMensagemError = document.getElementById("feedbackMessage");
    const vBtnError = vMensagemError.getElementsByTagName("button")[0];

    const vMessageErrorSetaTitulo = document.querySelector(".errormsg_txtTitulo");
    const vMessageErrorSetaDescricao = document.querySelector(".errormsg_txtDescricao");
    

    function showErrorMessage(vMsg, cb){        
        //vMensagemError.setAttribute("class","show"); ** Se eu tiver mais classes, com este comendo eu sobreponho.
        vMensagemError.classList.add("show");
        vMensagemError.getElementsByTagName("p")[0].textContent = vMsg;

        vBtnError.focus(); // Para ficar semantico e boter fechar usando o "Enter do teclado"

        function hideErrorMessage(){
            console.log("Fechou a mensagem de error!");
            vMensagemError.classList.remove("show");
            vBtnError.removeEventListener("click", hideErrorMessage); // Só posso remover um evento com Funções nomeadas.
            vBtnError.removeEventListener("keyup", hideErrorMessageWhiteButtonEsc); // Só posso remover um evento com Funções nomeadas.

            vMessageErrorSetaTitulo.setAttribute("style","display: none;");
            vMessageErrorSetaDescricao.setAttribute("style","display: none;");

            if(typeof cb === "function"){
                cb(); // Funcção de CallBack
                console.log("função de CallBack")
            }
        }

        function hideErrorMessageWhiteButtonEsc(e){
            //console.log(e.keyCode); Codigo do ESC no teclado
            //console.log(e.key);
            //console.log(e);
            if(e.keyCode === 27){
                hideErrorMessage();
            }
        }
    
        vBtnError.addEventListener("click", hideErrorMessage);
        vBtnError.addEventListener("keyup", hideErrorMessageWhiteButtonEsc);        
    }

    /*vBtn.addEventListener("click", function(e){});*/

    vFormulario.addEventListener("submit", function (e) { // Mais Semantico colocar o evento no formulario do que no Botão
        
        if (!vTitulo.value && !vDescricao.value) {
            showErrorMessage("Preencha todos os campos obrigatorios!", function () {
                vTitulo.focus();   
            });
            e.preventDefault(); // Isso faz com que o formulario deixa de enviar informações para o servidor. 
                               //(Desabilita o comportamento Padrão)
            vMessageErrorSetaTitulo.removeAttribute("style");   
            vMessageErrorSetaDescricao.removeAttribute("style");                               
        }else if(!vTitulo.value && vDescricao.value != ""){
            showErrorMessage("Preencha todos os campos obrigatorios!", function () {
                vTitulo.focus();
            });
            e.preventDefault(); // Isso faz com que o formulario deixa de enviar informações para o servidor. 
                               //(Desabilita o comportamento Padrão)
            vMessageErrorSetaTitulo.removeAttribute("style");                                
        }else if(vTitulo.value != "" && !vDescricao.value){
            showErrorMessage("Preencha todos os campos obrigatorios!", function () {
                vDescricao.focus();
            });
            e.preventDefault(); // Isso faz com que o formulario deixa de enviar informações para o servidor. 
                               //(Desabilita o comportamento Padrão)
            vMessageErrorSetaDescricao.removeAttribute("style"); 
        }
    });

    vContadorContainer.removeAttribute("style"); // vContadorContainer.style.display = "block"

    function totalCarateresTextArea(vNumero){
        vCaracterRestante.textContent = parseInt(vNumero);
        return vCaracterRestante;
    }

    totalCarateresTextArea(vMaximoCaracteres);
    

    // keyup é apresentando somente uma vez
    /*vDescricaoTextArea.addEventListener("keyup",function(){
        console.log("keyup");
    })*/
    //Se eu colocar um texto com o botão direito do mouse keydown não é apresentado
    /*vDescricaoTextArea.addEventListener("keydown",function(){
        console.log("keydown");
    })
    */
    // Não é apresentando
    /*vDescricaoTextArea.addEventListener("change",function(){ 
        console.log("change");
    })
    */
   //Se eu colocar um texto com o botão direito do mouse keypress não é apresentado
    /*vDescricaoTextArea.addEventListener("keypress",function(){
        console.log("keypress");
    })
    */
    vDescricaoTextArea.addEventListener("input",function(){
        let vNumeroDigitados = this.value.length; // vDescricaoTextArea.value.length; 
        let vQtd = parseInt(vMaximoCaracteres) - parseInt(vNumeroDigitados);
        totalCarateresTextArea(vQtd);
    })

    vBtn.disabled = true;
    
    vStatusCheckBox.addEventListener("change", function(){
       // Este codigo abaixo funcionar
        /* if(vStatusCheckBox.checked){ 
            vBtn.removeAttribute("disabled");
        }else{
            vBtn.setAttribute("disabled","");
        }*/

        //Este codigo funciona também, porem menos linhas de codigo
        vBtn.disabled = !this.checked; // <<======================================

        //console.log("this: " + !this.checked);
        //console.log(vBtn.disabled);
    })

})()