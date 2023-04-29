
        // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
    import { getDatabase,set,ref,update,get,child } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";
    import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
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
    import{
      getFirestore,doc,getDocs,query,onSnapshot,where,setDoc,collection,addDoc,updateDoc,deleteDoc,deleteField
    } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const fireStore = getFirestore();
    const  auth = getAuth();
    let i=0;
    let arr = []
    var check = ''

    logSubButton.addEventListener('click',(e)=>{
    
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var nid = document.getElementById('nid').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var username = document.getElementById('fullName').value;
    var referUsed = document.getElementById('refer').value;
    var laterUid = '';
    var referralCode='';
    var laterBalance = '';

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        function generateString(length) {
            let result = ' ';
            const charactersLength = characters.length;
            for ( let i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
        referralCode = generateString(6);
        // Signed in 
        const user = userCredential.user;
        console.log("stating to upload");
        set(ref(database,'users/'+user.uid),{
            username: username,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            nid: nid,
            access: 'user',
            balance: 0,
            referralCode: referralCode,
            last_login: Date.now()
        })
        console.log("uploaded");
        alert('user created');
        searchBYrefer(referUsed,laterUid,laterBalance);
        addInfo(username,0,email,nid,phoneNumber,referralCode,user.uid);
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage+'here occured');
        // ..
    });
        window.open('Login.html');
        })



      //----------------------login-backUp-code------------------------
        // login.addEventListener('click',(e)=>{
    
        //   var email = document.getElementById('email').value;
        //   var password = document.getElementById('password').value;
        //   var phoneNumber = document.getElementById('phoneNumber').value;
          
        //     signInWithEmailAndPassword(auth, email, password)
        //    .then((userCredential) => {
        //    // Signed in 
        //     const user = userCredential.user;
        //     alert('logged In');
        //     const date = new Date();

        //    update(ref(database,'users/'+user.uid),{
        //      last_login: date
        //    })
          
        //     // ...
        //     })
        //     .catch((error) => {
        //      const errorCode = error.code;
        //      const errorMessage = error.message;
        //      alert(errorMessage+'here occured'+'here occured 2');
        //     });
        //   })

        //------------------add userDate to firestore---------------//
        async function addInfo(username,balance,email,nid,phoneNumber,referralCode,uid){
          var ref = doc(fireStore,"user",email);

          const docRef = await setDoc(
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
            alert("Data uploaded to fireBase")
          }).catch((e)=>{
            alert(e.message)
          })
        }

        function searchBYrefer(referUsed,laterUid,laterBalance){
           const ref = collection(fireStore,'user');
           getDocs(ref).then((snapshot)=>{
             snapshot.docs.forEach((doc)=>{
            check = doc.data().referralCode.toString();
            console.log("refer code used:"+referUsed.toString())
              if(check == referUsed.toString()){
                // console.log("true")
                laterUid = doc.data().email.toString()
                laterBalance = doc.data().balance.toString()

                console.log(laterUid)
                //found the uid whom uid was being used
                //have to implement a function that updates cloud balance of laterUID owner
                updateCash(laterUid,laterBalance)
              }
              else{
                console.log("no referred user found")
              }
            })
           }).catch((e)=>{
             console.log(e.message)
           })
           //console.log(check)
        }

        // function toString(doc) {
        //   let data = doc.data();
        //   return `${data.referralCode}`;
        // }

        // async function updateInfo(email){
        //   var ref = collection(fireStore,"user",email);
        //   await updateDoc(
        //     ref,{
        //       referralCodeUsed:(referralCodeUsed+1)
        //     }
        //   ).then(()=>{
        //     alert("Data uploaded to fireBase")
        //   }).catch((e)=>{
        //     alert(e.message)
        //   })
        // }
        function updateCash(email,laterBalance){
          const docRef = doc(fireStore,'user',email)
          onSnapshot(docRef,(doc)=>{
            console.log(doc.data())
          })
          laterBalance = parseInt(laterBalance)+10;
          updateDoc(docRef,{
            balance:laterBalance
          }).then(()=>{
            console.log("updated referralCodeUsed");
          })

        }

       


 