window.fbAsyncInit = function() {
    FB.init({
      appId      : '190441828426608',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.12'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.12&appId=190441828426608&autoLogAppEvents=1';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  // FB.getLoginStatus(function(response) {
  //     statusChangeCallback(response);
  // });

//   function checkLoginState() {
//     FB.getLoginStatus(function(response) {
      
//       // statusChangeCallback(response);
//       console.log("facebook login :", response);
//       if(response.status ==="connected"){
//         console.log("connected");
        
//       }else{
//           console.log("Please try again");
//       }

//     });
// }

