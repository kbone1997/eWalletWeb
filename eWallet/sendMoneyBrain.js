        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
        import { getDatabase,ref,get,child,set } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";
        import { getAuth,signInWithEmailAndPassword,onAuthStateChanged ,signOut  } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
        import{
          getFirestore,doc,onSnapshot,getDocs,query,where,setDoc,collection,addDoc,updateDoc,deleteDoc,deleteField
        } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
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
        const fireStore = getFirestore();
        var showUserName = document.getElementById('showUserName');
        var points = document.getElementById('points');
        var userBalance;
        var access,email,last_login,nid,password,phoneNumber,referralCode,username;
        var laterBalance;
        var showUserName = document.querySelector('#holder');
        var cvv = document.querySelector('#cvv');
            

              const user = auth.currentUser;
              onAuthStateChanged(auth, (user) => {
                //console.log(user)
                if (user) {
                  // User is signed in, see docs for a list of available properties
                  // https://firebase.google.com/docs/reference/js/firebase.User
                  const name = auth.currentUser.email;
                  console.log(name.toString())

                  const dbRef = ref(getDatabase());
                  get(child(dbRef, `users/${auth.currentUser.uid}`)).then((snapshot) => {
                    if (snapshot.exists()) {
                      console.log(snapshot.val())
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



              //check for userAnd send code
              const refCode = document.querySelector('#sub');
              refCode.addEventListener('click',(e)=>{
                var emailRe = document.querySelector('#Email').value;
                var amount = document.querySelector('#amount').value;
                console.log(emailRe)
                console.log(amount)
                  
                const firebase = doc(fireStore,'user',emailRe.toString());
                        onSnapshot(firebase,(doc)=>{
                        console.log("Firebasebalance: "+doc.data().balance);
                        if(parseInt(userBalance)<parseInt(amount)){
                          alert("insufficient Amount")
                          userBalance = parseInt(userBalance);
                        }
                        else{
                          userBalance = parseInt(userBalance)-parseInt(amount);
                          writeUserData(auth.currentUser.uid,access,userBalance,email,last_login,nid,password,phoneNumber,referralCode,username,amount);
                          addInfo(doc.data().username,parseInt(amount),doc.data().email,doc.data().nid,doc.data().phoneNumber,doc.data().referralCode,doc.data().uid)
                        }
                      })
              })

              //save new data 
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
                console.log("real time database updated") 

              }

              //update Receiver Fire
              async function addInfo(username,balance,email,nid,phoneNumber,referralCode,uid){
                var ref = doc(fireStore,"user",email);
      
               await setDoc(
                  ref,{
                    username:username,
                    balance: balance,
                    email: email,
                    nid: nid,
                    phoneNumber: phoneNumber,
                    referralCode: referralCode,
                    uid: uid
                  }
                ).then(()=>{
                  console.log("Check if receiver received")
                }).catch((e)=>{
                  alert(e.message)
                })
              } 

              const goback = document.querySelector('#back');
              goback.addEventListener('click',(e)=>{
                window.open("Work/adminPanel/userPanel.html","_self");
               
              })