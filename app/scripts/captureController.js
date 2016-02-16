angular.module('starter.controllers', [])

  .controller('FormCtrl', function($scope, $state, $rootScope, imgURI, colorSelected, $http) {

      $scope.details = false;
      $rootScope.imgURI = imgURI;
      var rgb = colorSelected.replace(/[()]/g, "").replace(/rgb/, "").split(",")
      $scope.red = rgb[0]
      $scope.green = rgb[1]
      $scope.blue = rgb[2]
      $scope.hex = chroma(rgb).hex();
      document.getElementById('form-color-selected').style.backgroundColor = colorSelected


      $scope.sendEmail = function(form){

          var modImg = imgURI.replace("data:image/jpeg;base64,", "");

          var emailData = {
            'key': 'ZrkOtJ2ahIz4gOgsp8FsvQ',
            'message': {
              'from_email': 'help@opticolorinc.com',
              'to': [
                {
                  'email': 'help@opticolorinc.com',
                  'name': '',
                  'type': 'to'
                }
              ],
              'subject': 'iOS App Customer Data ' + $scope.user.companyName + '/' + $scope.user.contactName,
              'html': '<body><h3 style="text-decoration:underline"><em>Contact Details</em></h3><' + 
              '<h5>Company Name: ' + $scope.user.companyName + '</h5>' + 
              '<h5>Contact Name: ' + $scope.user.contactName + '</h5>' + 
              '<h5>Email: ' + $scope.user.email + '</h5>' + 
              '<h5>Phone: ' + $scope.user.phone +  ' ' + $scope.user.ext + '</h5>' + 
              '<h3 style="text-decoration:underline"><em>Color Match Specifications & Requirements</em></h3>' + 
              '<h5>Application/Project: ' + $scope.user.projectApp + '</h5>' + 
              '<h5>Opacity: ' + $scope.user.opacity + '</h5>' + 
              '<h5>Base Carrier Resin: ' + $scope.user.base + '</h5>' + 
              '<h5>Resin Grade: ' + $scope.user.resin + '</h5>' + 
              '<h5>Process: ' + $scope.user.process + '</h5>' + 
              '<h5>Compounding: ' + $scope.user.compounding + '</h5>' + 
              '<h5>Requested Letdown: ' + $scope.user.letdown + '</h5>' + 
              '<h5>Finished Part Thickness: ' + $scope.user.thickness + '</h5>' + 
              '<h5>Light Transmission Needed: ' + $scope.user.transmission + '</h5>' + 
              '<h5>Light Source: ' + $scope.user.source + '</h5>' + 
              '<h5>Compounding: ' + $scope.user.compounding + '</h5>' + 
              '<h5>Requested Letdown: ' + $scope.user.letdown + '</h5>' + 
              '<h5>HEX: ' + $scope.hex + '</h5>' +  
              '<h5>R: ' + $scope.red + ' G: ' + $scope.green + ' B: ' + $scope.blue + '</h5>' + 
              '<h3 style="text-decoration:underline"><em>Comments</em></h3>' + 
              '<h5>Pantone Value Desired: ' + $scope.user.pantoneValue + '</h5>' + 
              '<h5>Comments: ' + $scope.user.comments + '</h5>' + 
              '<div style="width:200px;height:200px;background-color:' + colorSelected + '"></div>' +
              '<br><img style="width:200px" src="cid:main"/></body>',
              'inline_css': 'true',
              "images": [
                            {
                                "name": "main",
                                "type": "image/png", 
                                "content": modImg
                            }
                        ]
            }
        }

        $scope.submitted = true;

         if(form.$valid){
            $http.post('https://mandrillapp.com/api/1.0/messages/send.json', emailData)
                .success(function(data){
                  $state.go('confirmation')
                })
                .error(function(err){
                    console.log(err)
                    console.log("error")
                })
            }
      
      }

      $scope.user = {companyName: null,  contactName: null, 
                     email: null, phone: null, projectApp: null,
                     opacity: "", base: null, resin: null,
                     process: "", compounding: "", letdown: "",
                     thickness: null, transmission: null, source: ""}

      $scope.$watchCollection('[user.companyName, user.contactName, user.email, user.phone]'
        , function(newValues, oldValues){
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

  })



  .controller('RequestCtrl', function($scope, $state, $rootScope, imgURI, colorSelected, $ionicHistory) {

      $scope.goBack = function() {
       $ionicHistory.goBack();
      };
  
  })



  .controller('ZoomCtrl', function($scope, $stateParams, $state, $rootScope, imgURI, $jrCrop) {
      $rootScope.imgURI = imgURI;
      var colorThief = new ColorThief();
      var photo = document.getElementById("photo-zoom");
      $scope.showCheck = false;

      $scope.selectColor = function(color){
         $scope.showCheck = color
         var colorSelected = document.getElementById(color).style.backgroundColor 
         document.getElementById('main-color-zoom').style.backgroundColor = colorSelected
      }

      $scope.sendDetails = function(){
        var colorSelected = document.getElementById('main-color-zoom').style.backgroundColor 
        if(colorSelected){
          $rootScope.colorSelected = colorSelected
          $state.go('detail')
        }
      }

      $scope.getZoom = function(img){
          console.log($jrCrop.defaultOptions.template)
          $jrCrop.crop({
              url: img, 
              width: 150,
              height: 150,
          }).then(function(canvas) {
              var image = canvas.toDataURL();
              $rootScope.imgURI = image;
              $state.go('zoom')
          }, function() {
              // User canceled or couldn't load image.
          });
      }

      $scope.sendForm = function(){
        var colorSelected = document.getElementById('main-color-zoom').style.backgroundColor 
         if(colorSelected){
          $rootScope.colorSelected = colorSelected
          $rootScope.imgURI = imgURI;
          $state.go('request')
        }
      }

      $scope.$on('$ionicView.afterEnter', function(){
          var palette = colorThief.getPalette(photo, 12);

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

          document.getElementById('one-zoom').style.backgroundColor = one
          document.getElementById('two-zoom').style.backgroundColor = two
          document.getElementById('three-zoom').style.backgroundColor = three
          document.getElementById('four-zoom').style.backgroundColor = four
          document.getElementById('five-zoom').style.backgroundColor = five
          document.getElementById('six-zoom').style.backgroundColor = six
          document.getElementById('seven-zoom').style.backgroundColor = seven
          document.getElementById('eight-zoom').style.backgroundColor = eight
          document.getElementById('nine-zoom').style.backgroundColor = nine
          document.getElementById('ten-zoom').style.backgroundColor = ten
      });
  
  })



  .controller('WheelCtrl', function($scope, $state, $rootScope) {

      $scope.color = {hex: ""};

      $scope.sendWheelDetails = function(){
        var colorSelected = document.getElementById('wheel-main').style.backgroundColor 
        if(colorSelected){
          $rootScope.colorSelected = colorSelected
          $state.go('detail')
        }
      }

      $scope.sendForm = function(){
        var colorSelected = document.getElementById('wheel-main').style.backgroundColor 
         if(colorSelected){
          $rootScope.colorSelected = colorSelected
          $rootScope.imgURI = ""
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

        var rgb = colorSelected.replace(/[()]/g, "").replace(/rgb/, "").split(",")
        $scope.red = rgb[0]
        $scope.green = rgb[1]
        $scope.blue = rgb[2]
        $scope.alpha = "100"
        $scope.hex = chroma(rgb).hex();

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
 


  .controller('PhotoCtrl', function($scope, $stateParams, $state, $rootScope, imgURI, $jrCrop) {

      $rootScope.imgURI = imgURI;
      var colorThief = new ColorThief();
      var photo = document.getElementById("photo");
      $scope.showCheck = false;

      $scope.selectColor = function(color){
         $scope.showCheck = color
         var colorSelected = document.getElementById(color).style.backgroundColor 
         document.getElementById('main-color').style.backgroundColor = colorSelected
      }

      $scope.sendDetails = function(){
        var colorSelected = document.getElementById('main-color').style.backgroundColor 
        if(colorSelected){
          $rootScope.colorSelected = colorSelected
          $state.go('detail')
        }
      }

      $scope.getZoom = function(img){
          console.log($jrCrop.defaultOptions.template)
          // $rootScope.imgURI = imgURI;
          // $state.go('zoom')
          $jrCrop.crop({
              url: img, //"images/test.jpg",
              width: 150,
              height: 150,
          }).then(function(canvas) {
              // success!
              var image = canvas.toDataURL();
              console.log("image")
              console.log(image)
              $rootScope.imgURI = image;
              $state.go('zoom')
          }, function() {
              // User canceled or couldn't load image.
          });
      }

      $scope.sendForm = function(){
        var colorSelected = document.getElementById('main-color').style.backgroundColor 
         if(colorSelected){
          $rootScope.colorSelected = colorSelected
          $rootScope.imgURI = imgURI;
          $state.go('request')
        }
      }

      $scope.$on('$ionicView.afterEnter', function(){
          var palette = colorThief.getPalette(photo, 12);

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
          quality: 100, 
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
          quality: 100, 
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 300,
          targetHeight: 300,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: true
        };

      $cordovaCamera.getPicture(options).then(function (imageData) {
            $rootScope.imgURI = "data:image/jpeg;base64," + imageData;
            $state.go('photo')        
        }, function (err) {
            // An error occured. Show a message to the user
        });
    }
})



.controller('IntroCtrl', function($scope, $ionicSlideBoxDelegate, $state) {

  $scope.next = function () {
    $ionicSlideBoxDelegate.next();
  };

  // $scope.previous = function () {
  //   $ionicSlideBoxDelegate.previous();
  // };

})