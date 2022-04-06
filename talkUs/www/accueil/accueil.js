//document.addEventListener('onload', getUser);
//console.log(sessionStorage.getItem("telephone"));

function getUser(){
	let xmlHttp = new XMLHttpRequest();

	let data = new FormData();
    
	data.append('telephone', "776994291");
	xmlHttp.open('POST', 'https://serverbousso.000webhostapp.com/handler.php?task=getUsers');

	xmlHttp.onload = function(){
		let users = JSON.parse.(this.responseText);
		let codeHTML = '';
        for (let i = 0; i < users.length; i++) 
        {
            codeHTML += `
            <li>
                <a href="#">
                    <img src="../img/avatardefault.png">
                    <h1>${users[i].prenom} ${users[i].nom}</h1>
                    <p>${users[i].telephone}</p>
                </a>
            </li>`;
        }
        usertList.innerHTML = codeHTML;
        $(usertList).listview('refresh');
	}

	xmlHttp.send(data);
    console.log('test');
}

getUser();

