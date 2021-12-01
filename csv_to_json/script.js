var jsonData = ""

async function loadFile(file) {
	document.getElementById("download_div").hidden = true;
	let pass = [];
	let other = {};
	let text = await file.text();
	let lines = text.split("\n");
	for(i in lines){
		data = {}
		if(lines[i].length<4) continue;
		tmp = lines[i].split(",");
		console.log(tmp);
		let id = Math.random().toString(16).substr(2, 12);
		data["id"] =  id; 
		let time = Date.now();
		let p = tmp[3];
		if(p[p.length-1]=='\r') p = p.substr(0, p.length-1);
		if(p.length<1) p = "tempPassword";
		data["name"] = tmp[0].length>0 ? tmp[0] : "tempName";
		data["uid"] = tmp[2].length>0 ? tmp[2] : "tempEmail";
		data["password"] = p;
		data["url"] = tmp[1];
		data["remarks"] = "";
		data["timestamp"] = time
		other[id] = [{
			"uid":tmp[2].length>0 ? tmp[2] : "tempEmail",
			"password":p,
			"timestamp":time
		}]
		pass.push(data);
	}
	console.log(pass);
	console.log(other);
	jsonData = "{\n\t\"pass\":[\n\t\t";
	for(i in pass){
		jsonData += JSON.stringify(pass[i]) + ",\n\t\t";
	}
	jsonData = jsonData.substr(0, jsonData.length-4);
	jsonData += "\n\t],\n\t";
	for(key in other){
		tmp = "\"" + key + "\":" + JSON.stringify(other[key]) + ",\n\t";
		jsonData += tmp;
	}
	jsonData = jsonData.substr(0, jsonData.length-3);
	jsonData += "\n}";
	document.getElementById("data").innerHTML = jsonData;
	document.getElementById("download_div").hidden = false;
}

function message(msg){
	Swal.fire({
		position: 'top-end',
		icon: 'success',
		title: msg,
		showConfirmButton: false,
		timer: 2000
	});
}

function download(){
	var jsonFile;  
	var downloadLink;   
	jsonFile = new Blob([jsonData], {type: 'text/json'});  
	downloadLink = document.createElement("a");  
	downloadLink.download = "passwords.json";  
	downloadLink.href = window.URL.createObjectURL(jsonFile);  
	downloadLink.style.display = "none";  
	document.body.appendChild(downloadLink);
	downloadLink.click();
	message('Downloading');
}

function copy(){
	navigator.clipboard.writeText(jsonData);
	message('Copied');
}

