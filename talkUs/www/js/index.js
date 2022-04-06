var errorsIns;
function auth(){
    console.log(login1.value+' '+password1.value);
    if(login1.value != '' && password1.value != ''){
        message.innerHTML = "valid";
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open('POST', 'https://serverbousso.000webhostapp.com/handler.php?task=logIn');
        const data = new FormData();
            data.append('login', login1.value);
            data.append('password', password1.value);
        xmlHttp.onload = function(){
            let resp = JSON.parse(this.responseText);
            console.log(resp.length);
            if(resp.length != 0){
                let user = resp[0];
                sessionStorage.setItem("prenom", user.prenom);
                console.log(sessionStorage.getItem("prenom"));
                window.location.replace("/accueil/accueil.html");
                //console.log(sessionStorage.getItem("user"));
            }else{
                message.innerHTML = "Vos identifiants sont incorrects !";
            }
        }

        xmlHttp.send(data);
    }else{
        message.innerHTML = "Vous devez saisir vos identifiants !";
    }
}

function reinitialiser(){
    taskList.innerHTML = '';
    task.focus();
}

function inscrire(event){
    event.preventDefault();
    errorsIns = new Map();
    champsValid('errLog', login);
    champsValid('errPas', password);  
    champsValid('errNom', nom);  
    champsValid('errPre', prenom); 
    champsValid('errPbis', passwordBis); 
    champsValid('errTel', telephone);
    validPassword();

    console.log(errorsIns);
    if(errorsIns.size == 0){
        status.innerHTML = "valider";
        const data = new FormData();
        data.append('nom', nom.value);
        data.append('prenom', prenom.value);
        data.append('login', login.value);
        data.append('password', password.value);
        data.append('telephone', telephone.value);

        let requeteAjax = new XMLHttpRequest();
        requeteAjax.open('POST', 'https://serverbousso.000webhostapp.com/handler.php?task=addUser');

        requeteAjax.onload = function(){
            nom.value = '';
            prenom.value = '';
            login.value = '';
            password.value = '';
            passwordBis.value = '';
            telephone.value = '';
        }

        requeteAjax.send(data);
    }else{
        status.innerHTML = "tous les champs sont obligatoires";
    }
 }

 formIns.addEventListener('submit', inscrire);

function champsValid(nom_champ, champ){
    if(champ.value != ''){
        document.getElementById(nom_champ).innerHTML =  '';
        return true;
    }else{
        errorsIns.set(nom_champ, '* Obligatoire');
        document.getElementById(nom_champ).innerHTML = "* Obligatoire";
        return false;
    }
}

function validPassword(){
    if(password.value != passwordBis.value){
        errorsIns.set('passwordBis', '* password non conforme');
        errPbis.innerHTML = "* password non conforme";
    }
}
