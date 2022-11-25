
var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteURL");
var addBtn = document.getElementById("addSite");
var inputs = document.getElementsByClassName("form-control");
var searchSite = document.getElementById("searchInput"); 
var deleteAll = document.getElementById("deleteAll");
var recordDiv = document.getElementById("bookMakerRecord");

var nameAlert = document.getElementById('nameAlert');
var urlAlert = document.getElementById('urlAlert');       //validation Alerts
var bothAlert = document.getElementById('bothAlert');
var currentIndex= 0;
var sites = [];

if (JSON.parse(localStorage.getItem('siteList'))!=null){

    sites = JSON.parse(localStorage.getItem('siteList'));
    displaySites()
}


addBtn.onclick = function(){

    if (addBtn.innerHTML == "Add Bookmark") {


        if (siteName.value === "" || siteUrl.value === ""){

            bothAlert.classList.remove(' none');
        }
        else{

            addSite()
            bothAlert.classList.add('d-none');
            location.reload();
        }
    }

    else {

        updateSite()
        siteName.classList.remove('is-valid');
        siteUrl.classList.remove('is-valid');
        
    }

displaySites()
resetForm()

}


if (JSON.parse(localStorage.getItem('siteList')) == 0) {

    recordDiv.classList.add('d-none');
   
}
else{

    recordDiv.classList.remove("d-none");
   
}

function addSite(){

    var site = {
        name: siteName.value,
        url: siteUrl.value,
    }

sites.push(site);
localStorage.setItem( 'siteList', JSON.stringify(sites));

}

function displaySites(){


var cartona="";
for(var i=0 ; i< sites.length;i++){

    cartona += `<tr> 
                     <td> ${sites[i].name} </td>  
                      <td> <button class="btn visit-color white-text" onclick="visitSite(${i})"> Visit </button> </td>
                      <td> <button class="btn btn-danger" onclick="deleteSite(${i})"> Delete </button> </td> 
                      <td> <button class="btn btn-warning" onclick="getSiteInfo(${i})"> Update </button> </td> 
    </tr>`

}
    document.getElementById("tableBody").innerHTML = cartona;

}


function getSiteInfo(index){
    currentIndex= index;
    var currentInfo= sites[index];
    siteName.value = currentInfo.name;
    siteUrl.value = currentInfo.url;
     addBtn.innerHTML= "Update Bookmark";
    addBtn.classList.remove('main-color');
    addBtn.classList.add("btn-warning");

}

function updateSite(){
currentIndex
    var site = {
        name: siteName.value,
        url: siteUrl.value,
    }

    sites[currentIndex]=site;
    localStorage.setItem('siteList', JSON.stringify(sites));
    addBtn.innerHTML = "Add Bookmark";
    addBtn.classList.remove("btn-warning");
    addBtn.classList.add('main-color');
    

}


function visitSite(index){

     window.open(sites[index].url);
 
}

function deleteSite(index){

sites.splice(index,1);
displaySites();
localStorage.setItem('siteList', JSON.stringify(sites));
    location.reload();
}


searchSite.onkeyup = function(){

    var cartona = "";
    
    for (var i = 0; i < sites.length; i++) {
        if (sites[i].name.toLowerCase().includes(searchSite.value.toLowerCase())) {

            cartona += `<tr> 
                     <td> ${sites[i].name} </td>  
                      <td> <button class="btn btn-primary" onclick="visitSite(${i})" >Visit</button> </td>
                      <td> <button class="btn btn-danger" onclick="deleteSite(${i})" >Delete</button> </td> 
                      <td> <button  class="btn btn-warning onclick="getSiteinfo(${i}) " >Update</button> </td>
                     </tr>`


        }
        document.getElementById("tableBody").innerHTML = cartona;
    }
   


}


deleteAll.onclick = function(){
sites.length = 0;
 displaySites();
localStorage.setItem('siteList', JSON.stringify(sites));
    location.reload();

}

function resetForm(){

for(var i=0; i<inputs.length ; i++){

inputs[i].value="";

}

}

                                               //// validation functions ////

siteName.onkeyup = function () {

    var nameRejex = /^[a-zA-Z- ]{3,25}$/
    if (nameRejex.test(siteName.value)) {


         addBtn.removeAttribute("disabled");
        siteName.classList.add('is-valid');
        siteName.classList.remove('is-invalid');
        nameAlert.classList.add('d-none');
    }

    else {

        addBtn.disabled = "true";
        siteName.classList.add('is-invalid');
        nameAlert.classList.remove('d-none');

    }
}


siteUrl.onkeyup = function () {

    var urlRejex = /^( ?https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+\.[^\s]{2,}|http|https?:(?:www\.|(?!www))+\.[^\s]|www\.+\.)$/
    if (urlRejex.test(siteUrl.value)) {

        addBtn.removeAttribute("disabled");
        siteUrl.classList.add('is-valid');
        siteUrl.classList.remove('is-invalid');
        urlAlert.classList.add('d-none');

    }

    else {

        addBtn.disabled = "true";
        siteUrl.classList.add('is-invalid');
        urlAlert.classList.remove('d-none');
    }
}

