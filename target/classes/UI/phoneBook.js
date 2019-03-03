var myApp = angular.module("PhoneBook",['ngMaterial']);
var GroupMap = {}
myApp.controller('ContactController',function EventController($scope,$http,$compile,$window){
    $scope.AddNewContacts = false;
    $scope.ListGroups = false;
    $scope.DisplayAll=true;
    $scope.gender = ['F','M'];
    $scope.SingleContacts = false;
    $http.get('http://localhost:4567/group').then(function (data){
        $scope.groups = [];
        angular.forEach(data.data, function (value, index) {
            $scope.groups.push({ id: value.group_id, label: value.group_name });
        });
        for(let group of $scope.groups){
                GroupMap[group.label]=group.id;
        }
    })

    $http({
            method: 'GET',
            url: 'http://localhost:4567/contact'
            }).then(function(response) {
            $scope.contactdata = response.data;
            }, function(response) {
            
            });
    $scope.Add_Contacts = function(){
        $scope.AddNewContacts = true;
        $scope.ListGroups = false;
        $scope.DisplayAll = false;
    }
    $scope.List_Group=function(){
        $scope.ListGroups = true;
        $scope.AddNewContacts = false;
        $scope.DisplayAll = false;
        $http.get('http://localhost:4567/group').then(function (data){
        $scope.groups = [];
        angular.forEach(data.data, function (value, index) {
            $scope.groups.push({ id: value.group_id, label: value.group_name });
        });
        })
        $scope.groupList = $scope.groups;
        console.log($scope.groupList)
    }
    $scope.save_Contacts=function(Details){
        var GroupFinalMap = {};
        for(let group of Details.groups){
           GroupFinalMap[GroupMap[group]] =parseInt(GroupMap[group]);
        }
        if(Details.gender == 'F'){
            Details.gender = '1'
        }
        else{
             Details.gender = '0'
        }
        Details.groups = GroupFinalMap;
        console.log(JSON.stringify(Details));
       $http({
        url: 'http://localhost:4567/contact',
        method: "POST",
        data:JSON.stringify(Details),
        })
        .then(function(response) {
            $http({
            method: 'GET',
            url: 'http://localhost:4567/contact'
            }).then(function(response) {  
            $scope.contactdata = response.data;
            }, function(response) {
               //No data Function
            });
        $scope.AddNewContacts = false;
        $scope.ListGroups = false;
        $scope.DisplayAll = true;
        }, 
        function(response) { // optional
             console.log("not insuccess");
        });
     
    }
    $scope.Cancel_Contacts=function(){
        $scope.AddNewContacts = false;
        $scope.ListGroups = false;
        $scope.DisplayAll = true;
    }
    $scope.Details_contacts=function(event){
          $scope.SingleContacts = true;
          var id = $(event.target).attr('id')
          console.log(id);
          $http.get('http://localhost:4567/contact/'+id).then(function (data){
                console.log("detailed data");
                $scope.PersoneName=data.data.fname;
          })
        
          $scope.DisplayAll=false;
     }
     $scope.Details_GroupContacts=function(event){
         console.log("in the group")
     }
      $scope.Delete_contacts=function(event){
         var r = confirm("Are you sure to delete????");
         var id = $(event.target).attr('id');
         if(r==true){
             
             $http({
             method: 'DELETE',
             url: 'http://localhost:4567/contact/'+id,
             })
             .then(function(response) {
              console.log(response.data);
                $window.location.reload();
            }, function(rejection) {
                console.log(rejection.data);
             });
             
         }
         
     }
         
});
