angular.module('starter.controllers', [])

  .controller('FormCtrl', function($scope, $state, $rootScope, imgURI, colorSelected, $http) {
      // $rootScope.imgURI = "images/test.jpg"
      console.log("FormCtrl")
      console.log(imgURI)
      console.log(colorSelected)

      $scope.details = false;
      console.log($scope.details)

      $rootScope.imgURI = imgURI;
      var rgb = colorSelected.replace(/[()]/g, "").replace(/rgb/, "").split(",")
      console.log(rgb)
      $scope.red = rgb[0]
      $scope.green = rgb[1]
      $scope.blue = rgb[2]
      // $scope.alpha = "100"
      $scope.hex = chroma(rgb).hex();
      document.getElementById('form-color-selected').style.backgroundColor = colorSelected


      $scope.user = {companyName: null, 
                     contactName: null, 
                     email: null, 
                     phone: null,
                     projectApp: null,
                     opacity: "",
                     base: null,
                     resin: null,
                     process: "",
                     compounding: "",
                     letdown: "",
                     thickness: null,
                     transmission: null,
                     source: ""}

      $scope.$watchCollection('[user.companyName, user.contactName, user.email, user.phone]', function(newValues, oldValues){
          if(newValues[0] && newValues[1] && newValues[2] && newValues[3]){
             $scope.details = true
          }
          else{
             $scope.details = false;
          }
      });

        $scope.$watchCollection('[user.projectApp, user.opacity, user.base, user.resin, user.process, user.compounding, user.letdown, user.thickness, user.transmission, user.source]'
          , function(newValues, oldValues){
          if(newValues[0] && newValues[1] && newValues[2] && newValues[3] && newValues[4] && newValues[5] && newValues[6] && newValues[7] && newValues[8] && newValues[9]){
             $scope.requirements = true
             $scope.match = true
          }
          else{
             $scope.requirements = false;
          }
      });


      var data = {
      'key': '',
      'message': {
        'from_email': 'grock006@gmail.com',
        'to': [
          {
            'email': 'grock006@gmail.com',
            'name': 'YOUR_RECEIVER_NAME',
            'type': 'to'
          }
        ],
        'subject': 'title',
        'html': 'html can be used'
      }
    }
   

            $scope.sendEmail = function(form){
              // console.log(form)
              $scope.submitted = true;


              // $http.post('https://mandrillapp.com/api/1.0/messages/send.json', data)
              //     .success(function(data){
              //       //on success send success message
              //       console.log(data)
              //       console.log("success")
              //     })
              //     .error(function(err){
              //         console.log(err)
              //         console.log("error")
              //     })
              
              if(form.$valid){
                 console.log("valid")
              }
              else{
                 console.log(document.body.scrollTop)
                 console.log(document.documentElement.scrollTop);
              }
            
            }



  })

  .controller('RequestCtrl', function($scope, $state, $rootScope, imgURI, colorSelected, $ionicHistory) {
      // $rootScope.imgURI = "images/test.jpg"
      console.log("RequestCtrl")
      console.log(imgURI)
      console.log(colorSelected)

      $scope.goBack = function() {
       $ionicHistory.goBack();
      };
  })

  .controller('ZoomCtrl', function($scope, $state, $rootScope) {
      // $rootScope.imgURI = "images/test.jpg"
      console.log("ZoomCtrl")
      console.log($rootScope.imgURI)
  })

  .controller('WheelCtrl', function($scope, $state, $rootScope) {
      console.log("WheelCtrl")
      console.log($scope.color)
      // do a watch on color
      $scope.color = {hex: ""};

      $scope.sendWheelDetails = function(){
        var colorSelected = document.getElementById('wheel-main').style.backgroundColor 
        console.log(colorSelected)
        // console.log(colorSelected)
        if(colorSelected){
          $rootScope.colorSelected = colorSelected
          $state.go('detail')
        }
      }

      $scope.sendForm = function(){
        var colorSelected = document.getElementById('wheel-main').style.backgroundColor 
        // console.log(colorSelected)
         if(colorSelected){
          $rootScope.colorSelected = colorSelected
          // $rootScope.imgURI = imgURI;
          $state.go('request')
        }
      }
      
      $scope.$watch('color.hex', function(newValue, oldValue) {
         rgb = newValue
         document.getElementById('wheel-main').style.backgroundColor = rgb;

        document.getElementById('wheel-bright-one').style.backgroundColor = chroma(rgb).brighten();
        document.getElementById('wheel-bright-two').style.backgroundColor = chroma(rgb).brighten(2);
        document.getElementById('wheel-bright-three').style.backgroundColor = chroma(rgb).brighten(3);


        document.getElementById('wheel-dark-one').style.backgroundColor = chroma(rgb).darken();
        document.getElementById('wheel-dark-two').style.backgroundColor = chroma(rgb).darken(2);
        document.getElementById('wheel-dark-three').style.backgroundColor = chroma(rgb).darken(3);
     
      }, true);
  })

  .controller('DetailCtrl', function($scope, $state, $rootScope, colorSelected, $ionicHistory) {
        // console.log("DetailCtrl")
        // console.log($rootScope.colorSelected)
        var rgb = colorSelected.replace(/[()]/g, "").replace(/rgb/, "").split(",")
        // test = "rgb(111, 112, 88)"
        // var rgb = test.replace(/[()]/g, "").replace(/rgb/, "").split(",")
        console.log(rgb)
        $scope.red = rgb[0]
        $scope.green = rgb[1]
        $scope.blue = rgb[2]
        $scope.alpha = "100"
        $scope.hex = chroma(rgb).hex();
        // break down rgb and assign to scope
        // console.log(colorSelected.slice(4,7))

        $scope.goBack = function() {
         $ionicHistory.goBack();
        };

        document.getElementById('detail-box').style.backgroundColor = colorSelected

        document.getElementById('main').style.backgroundColor = $scope.hex

        document.getElementById('bright-one').style.backgroundColor = chroma(rgb).brighten();
        document.getElementById('bright-two').style.backgroundColor = chroma(rgb).brighten(2);
        document.getElementById('bright-three').style.backgroundColor = chroma(rgb).brighten(3);


        document.getElementById('dark-one').style.backgroundColor = chroma(rgb).darken();
        document.getElementById('dark-two').style.backgroundColor = chroma(rgb).darken(2);
        document.getElementById('dark-three').style.backgroundColor = chroma(rgb).darken(3);
  })
  
  .controller('PhotoCtrl', function($scope, $stateParams, $state, $rootScope, imgURI) {

      $rootScope.imgURI = imgURI;
      // console.log($rootScope.colorSelected)
      var colorThief = new ColorThief();
      var photo = document.getElementById("photo");
      $scope.showCheck = false;
      // console.log(photo)
      $scope.thing = "images/test.jpg"

      $scope.selectColor = function(color){
         // console.log(color)
         //need to hide checkmark before loading
         $scope.showCheck = color
         var colorSelected = document.getElementById(color).style.backgroundColor 
       
         document.getElementById('main-color').style.backgroundColor = colorSelected
         // document.getElementById(color).style.border = "2px solid black"
      }

      $scope.sendDetails = function(){
        console.log("sendDetails")
        var colorSelected = document.getElementById('main-color').style.backgroundColor 
        console.log(colorSelected)
        // console.log(colorSelected)
        if(colorSelected){
          $rootScope.colorSelected = colorSelected
          $state.go('detail')
        }
      }

      $scope.getZoom = function(){
        // var colorSelected = document.getElementById('main-color').style.backgroundColor 
        // console.log(colorSelected)
        // $rootScope.imgURI = $rootScope.imgURI
        // console.log()
          $rootScope.imgURI = imgURI;
          $state.go('zoom')
      }

      $scope.sendForm = function(){
        var colorSelected = document.getElementById('main-color').style.backgroundColor 
        // console.log(colorSelected)
         if(colorSelected){
          $rootScope.colorSelected = colorSelected
          $rootScope.imgURI = imgURI;
          $state.go('request')
        }
      }



      // $scope.$on('$ionicView.beforeEnter', function(){
      //    $scope.showCheck = false;
      // })


      $scope.$on('$ionicView.afterEnter', function(){
          var palette = colorThief.getPalette(photo, 12);
          // console.log(palette)
          var one = "rgb(" + palette[1][0] + ", " + palette[1][1] + ", " + palette[1][2] + ")"
          var two = "rgb(" + palette[2][0] + ", " + palette[2][1] + ", " + palette[2][2] + ")"
          var three = "rgb(" + palette[3][0] + ", " + palette[3][1] + ", " + palette[3][2] + ")"
          var four = "rgb(" + palette[4][0] + ", " + palette[4][1] + ", " + palette[4][2] + ")"
          var five = "rgb(" + palette[5][0] + ", " + palette[5][1] + ", " + palette[5][2] + ")"

          var six = "rgb(" + palette[6][0] + ", " + palette[6][1] + ", " + palette[6][2] + ")"
          var seven = "rgb(" + palette[7][0] + ", " + palette[7][1] + ", " + palette[7][2] + ")"
          var eight = "rgb(" + palette[8][0] + ", " + palette[8][1] + ", " + palette[8][2] + ")"
          var nine = "rgb(" + palette[9][0] + ", " + palette[9][1] + ", " + palette[9][2] + ")"
          var ten = "rgb(" + palette[10][0] + ", " + palette[10][1] + ", " + palette[10][2] + ")"

          document.getElementById('one').style.backgroundColor = one
          document.getElementById('two').style.backgroundColor = two
          document.getElementById('three').style.backgroundColor = three
          document.getElementById('four').style.backgroundColor = four
          document.getElementById('five').style.backgroundColor = five

          document.getElementById('six').style.backgroundColor = six
          document.getElementById('seven').style.backgroundColor = seven
          document.getElementById('eight').style.backgroundColor = eight
          document.getElementById('nine').style.backgroundColor = nine
          document.getElementById('ten').style.backgroundColor = ten
      });
     
 
      
  })

  .controller('CaptureCtrl', function($scope, $stateParams, $cordovaCamera, $state, $rootScope) {



   $scope.takePhoto = function () {
      var options = {
        quality: 75, //100
        destinationType: Camera.DestinationType.DATA_URL, // FILE_URI
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true
      };
  
        $cordovaCamera.getPicture(options).then(function (imageData) {
            $rootScope.imgURI = "data:image/jpeg;base64," + imageData;
            $state.go('photo');
         
        }, function (err) {
            // An error occured. Show a message to the user
        });


    }
              
    $scope.choosePhoto = function () {
      var options = {
        quality: 75, //100
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true
      };

      $cordovaCamera.getPicture(options).then(function (imageData) {
            $rootScope.imgURI = imageData;
            $state.go('photo')        
        }, function (err) {
            // An error occured. Show a message to the user
        });
    }

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }


})


.controller('IntroCtrl', function($scope, $ionicSlideBoxDelegate, $state) {

  // $scope.startApp = function () {
  //   $state.go('app.search');
  //   // $localstorage.set('firstTime', 'true');
  // };

  $scope.next = function () {
    $ionicSlideBoxDelegate.next();
  };

  // $scope.previous = function () {
  //   $ionicSlideBoxDelegate.previous();
  // };

  // $scope.disableSwipe = function() {
  //   $ionicSlideBoxDelegate.enableSlide(false);
  // };

  // // Called each time the slide changes
  // $scope.slideChanged = function (index) {
  //   $scope.slideIndex = index;
  // };

  // $scope.currentSlide = IntroSlideService.index;


})