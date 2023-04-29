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
            

              const user = auth.currentUser;
              onAuthStateChanged(auth, (user) => {
                //console.log(user)
                if (user) {
                  // User is signed in, see docs for a list of available properties
                  // https://firebase.google.com/docs/reference/js/firebase.User
                  const name = auth.currentUser.email;
                  console.log(name.toString())
                  //update latest balance in realTime dataBase
                  // const firebase = doc(fireStore,'user',name.toString());
                  //     onSnapshot(firebase,(doc)=>{
                  //       console.log("balance: "+doc.data().balance);
                  //       laterBalance = doc.data().balance;
                  //       console.log("laterBalance: "+laterBalance)
                  //     })
                      // getDocs(fireStore).then((snapshot)=>{


                      // })
                  
                  // ...
                  const dbRef = ref(getDatabase());
                  get(child(dbRef, `users/${auth.currentUser.uid}`)).then((snapshot) => {
                    if (snapshot.exists()) {
                      console.log(snapshot.val().username);
                      showUserName.innerHTML = snapshot.val().username;
                      access = snapshot.val().access;
                      email = snapshot.val().email;
                      last_login = snapshot.val().last_login;
                     // console.log(snapshot.val().last_login)
                      nid = snapshot.val().nid;
                      password = snapshot.val().password;
                      phoneNumber = snapshot.val().phoneNumber;
                      referralCode = snapshot.val().referralCode;
                      username = snapshot.val().username;
                      console.log(snapshot.val().balance)
                      userBalance = parseInt(snapshot.val().balance);
                      points.innerHTML = userBalance;
                      //console.log(la)
                      // writeUserData(auth.currentUser.uid, access,userBalance,email,last_login,nid,password,phoneNumber,referralCode,username);
                      
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

              //loogOut 
              const logout = document.querySelector('#logout');
              logout.addEventListener('click',(e)=>{

                e.preventDefault();
                auth.signOut().then(()=>{
                    console.log("User signed out");
                });
                window.open("/index.html","_self");
              })
              //cashOut redirect
              const cashOut = document.querySelector('#cashOut');
              cashOut.addEventListener('click',(e)=>{
                window.open("../../topUpZoneLocator.html")
              })

              //recharge
              //var rechargeAmount = document.querySelector("rINPUT").value;
              const rechargeInput = document.querySelector('#button_rech');
              rechargeInput.addEventListener('click',(e)=>{
                let rechargeAmount = document.querySelector("#test").value;
                console.log("inside recharge")
                userBalance = parseInt(userBalance) + parseInt(rechargeAmount);
                console.log(rechargeAmount);
                console.log(userBalance);
                writeUserData(auth.currentUser.uid, access,userBalance,email,last_login,nid,password,phoneNumber,referralCode,username);
                
              })

              //check for referral code
              const refCode = document.querySelector('#refreshButton');
              refCode.addEventListener('click',(e)=>{
                const firebase = doc(fireStore,'user',auth.currentUser.email.toString());
                        onSnapshot(firebase,(doc)=>{
                        console.log("Firebasebalance: "+doc.data().balance);
                        userBalance = parseInt(userBalance)+parseInt(doc.data().balance);
                        console.log("updated balance:"+userBalance)
                        points.innerHTML = userBalance;
                        writeUserData(auth.currentUser.uid, access,userBalance,email,last_login,nid,password,phoneNumber,referralCode,username);
                      })
              })

              
              // //payment
              // var paymentAmount = document.querySelector('#payment').value
              // const inputPayment = document.querySelector('#button_pay');
              // inputPayment.addEventListener('click',(e)=>{
              //   userBalance = userBalance + paymentAmount;
              //   console.log(paymentAmount);
              //   console.log(userBalance);
              //   writeUserData(auth.currentUser.uid, access,balance,email,last_login,nid,password,phoneNumber,referralCode,username);
              // })


              //select balance from database
              // function topUp(){
              //   window.open("./topUpZoneLocator.html")
              // }

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
                //---------overWrite FireBase data ---------//
                addInfo(username,0,email,nid,phoneNumber,referralCode,userId)

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
                    console.log("Data uploaded to fireBase")
                  }).catch((e)=>{
                    alert(e.message)
                  })
                }
                
              }

              //test search
              // var fb = ref(getDatabase());
              // console.log(fb)

                
                // @param {string} emailAddress
                 //@return {Object} the object contains zero or more user records, the keys are the users' ids
              //   var emailAddress = "doha@gmail.com";
              //   findUsersMatchingEmail(emailAddress);
                 
              //  function findUsersMatchingEmail( emailAddress, callback ) {
              //       fb.child('user').orderByChild('email').equalTo(emailAddress).once('value', function(snap) {
              //           console.log(snap.val())
              //           callback( snap.val() );
              //       });
              //   }

              const toSendMoney = document.querySelector('#sendMoney');
              toSendMoney.addEventListener('click',()=>{
                window.open("../../sendMoney.html","_self")
              })


               