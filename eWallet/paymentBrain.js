        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
        import { getDatabase,ref,update,get,child,set } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";
        import { getAuth,signInWithEmailAndPassword,onAuthStateChanged ,signOut  } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
      
        // Your web app's Firebase configuration
        const firebaseConfig = {
          apiKey: "AIzaSyB5xmG6SoP5fzGNkkjm3SABZ2vgMG0R-pc",
          authDomain: "ewalletauth.firebaseapp.com",
          databaseURL: "https://ewalletauth-default-rtdb.firebaseio.com",
          projectId: "ewalletauth",
          storageBucket: "ewalletauth.appspot.com",
          messagingSenderId: "885575894639",
          appId: "1:885575894639:web:6e29d1e95d7e96c0c3af9a"
        };
      
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const database = getDatabase(app);
        const  auth = getAuth();
        var showUserName = document.querySelector('#holder');
        var cvv = document.querySelector('#cvv');
        var userBalance = '';
        var access,email,last_login,nid,password,phoneNumber,referralCode,username;

            

              const user = auth.currentUser;
              onAuthStateChanged(auth, (user) => {
                console.log(user)
                if (user) {
                  // User is signed in, see docs for a list of available properties
                  // https://firebase.google.com/docs/reference/js/firebase.User
                  const name = user.email;
                  alert(name)
                  // ...
                  const dbRef = ref(getDatabase());
                  get(child(dbRef, `users/${auth.currentUser.uid}`)).then((snapshot) => {
                    if (snapshot.exists()) {
                      console.log(snapshot.val().username);
                      showUserName.innerHTML = snapshot.val().username;
                      cvv.innerHTML = auth.currentUser.uid;
                      userBalance = snapshot.val().balance;
                      access = snapshot.val().access;
                      email = snapshot.val().email;
                      last_login = snapshot.val().last_login;
                      nid = snapshot.val().nid;
                      password = snapshot.val().password;
                      phoneNumber = snapshot.val().phoneNumber;
                      referralCode = snapshot.val().referralCode;
                      username = snapshot.val().username;
                      console.log(password);
                    } else {
                      console.log("No data available");
                    }
                  }).catch((error) => {
                    console.error(error);
                  });


                  //
                } else {
                  // User is signed out
                  // ...
                }
              });

              
              //payment
              const submit = document.querySelector('#sub');
              submit.addEventListener('click',(e)=>{
                var pass = document.querySelector('#password').value;
                var amount = document.querySelector('#amount').value;
                console.log(pass)
                console.log(amount)
                if(password == pass && userBalance>= amount){
                    userBalance = parseInt(userBalance) - parseInt(amount);
                    console.log(amount);
                    console.log(userBalance);
                    //writeUserData(auth.currentUser.uid, userBalance);
                    alert("payment Done")
                    writeUserData(auth.currentUser.uid, access,userBalance,email,last_login,nid,password,phoneNumber,referralCode,username);
                }
                else{
                    console.log("payment error occured");
                }
                
               
              })

              const goback = document.querySelector('#back');
              goback.addEventListener('click',(e)=>{
                window.open("Work/adminPanel/userPanel.html","_self");
               
              })

              function writeUserData(userId,access,balance,email,lastLogin,nid,password,phoneNumber,referralCode,username) {
                set(ref(database, 'users/' + userId), {
                  access: access,
                  balance: balance,
                  email: email,
                  last_login:lastLogin,
                  nid: nid,
                  password: password,
                  phoneNumber: phoneNumber,
                  referralCode: referralCode,
                  username: username
                });
              }
  
              
