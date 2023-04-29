
        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
        import { getDatabase,ref,update,get,onValue,child } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";
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
        const database = getDatabase();
        const  auth = getAuth();
        var userNameDisplay = document.getElementById('showUserName');
        var refer = document.getElementById('refer');
        var userId ='';
        var username = '';
        
            

              const user = auth.currentUser;
              onAuthStateChanged(auth, (user) => {
                console.log(user)
                // userId = auth.currentUser.uid;
                // console.log(userId);
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
                      userNameDisplay.innerHTML = snapshot.val().username;
                      refer.innerHTML = snapshot.val().referralCode;
                    } else {
                      console.log("No data available");
                    }
                  }).catch((error) => {
                    console.error(error);
                  });
                } else {
                  // User is signed out
                  // ...
                }
              });

              //var userNameDisplay = document.getElementById('showUserName');
              
                // const dbref = database.ref();

                // get(child(dbref,"users/"+user.uid)).then((snapshot)=>{
                //   if(snapshot.exist()){
                //     userNameDisplay.innerHTML = snapshot.value().username;
                //     alert(snapshot.value().username);
                //     alert("is it showing?");
                //   }
                //   else{
                //     alert("no data found");
                //   }
                // })
                // .catch((err)=>{
                //   alert(err.message);
                // })
                
                // var userId = auth.currentUser.uid;
                // console.log(userId);
                // onValue(ref(db, '/users/' + userId), (snapshot) => {
                //   const username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
                //   // ...
                // }, {
                //   onlyOnce: true
                // });
                


