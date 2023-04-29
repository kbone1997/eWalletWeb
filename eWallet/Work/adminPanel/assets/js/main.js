// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");
const manage = document.querySelector('#manage');
manage.addEventListener('click',()=>{
  window.open("https://console.firebase.google.com/project/ewalletauth/database/ewalletauth-default-rtdb/data","_self")
})
const edit = document.querySelector('#edit');
edit.addEventListener('click',()=>{
  window.open("https://console.firebase.google.com/project/ewalletauth/database/ewalletauth-default-rtdb/data","_self")
})

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};

function previous(){
  window.open("../../index.html");  
}

function logOut(){
  alert(auth.currentUser)
  alert("logged Out!");
  boom.addEventListener('click',(e)=>{
    alert("inside signOut");
    //const auth = getAuth();
    signOut(auth).then(() => {
      alert('user Signed Out');
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      const errorMessage = error.message;
      alert(errorMessage);
    });
  });
  window.open("../../index.html","_self")
}
