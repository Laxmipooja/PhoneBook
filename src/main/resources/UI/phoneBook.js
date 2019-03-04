var myApp = angular.module("PhoneBook",['ngMaterial']);
var GroupMap = {}
myApp.controller('ContactController',function EventController($scope,$http,$compile,$window){
    $scope.AddNewContacts = false;
    $scope.ListGroups = false;
    $scope.DisplayAll=true;
    $scope.gender = ['F','M'];
    $scope.SingleContacts = false;
    $scope.ContactList_group=false;
    $scope.AddGroups = false;
    $scope.groupName="";
   
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
        $scope.AddGroups = false;
        $scope.ContactList_group = false;
    }
    $scope.List_Group=function(){
        $scope.ListGroups = true;
        $scope.AddNewContacts = false;
        $scope.DisplayAll = false;
        $scope.AddGroups=false;
        $scope.ContactList_group = false;
        $http.get('http://localhost:4567/group').then(function (data){
        $scope.groups = [];
         
        angular.forEach(data.data, function (value, index) {
            $scope.groups.push({ id: value.group_id, label: value.group_name });
        });
        $scope.groupList = $scope.groups;
    
             for(let group of $scope.groups){
                GroupMap[group.label]=group.id;
        }
        })
    }
    $scope.save_Contacts=function(Details){
        Details.mname = "";
        Details.lname = "";
        Details.extension="1";
        Details.countryCode="+1";
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
        console.log(Details.groups);
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
              alert("Network Error,Want to try Again");
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
          $http.get('http://localhost:4567/contact/'+id).then(function (data){
                $scope.PersoneName=data.data.fname;
          })
          $scope.DisplayAll=false;
     }
     $scope.Details_GroupContacts=function(event){
         $scope.ListGroups =false;
         $scope.ContactList_group=true;
         var id = $(event.target).attr('id')
         $http.get('http://localhost:4567/contact/group/'+id).then(function (data){
              
                $scope.Contact_GroupList=data.data;
          })
         
     }
     $scope.Delete_Group=function(event){
         var r = confirm("Are you sure to delete????");
         var id = $(event.target).attr('id');
         if(r==true){
             $http({
             method: 'DELETE',
             url: 'http://localhost:4567/group/'+id,
             })
             .then(function(response) {
                  $scope.List_Group();
            }, function(rejection) {
                 alert("Try Again,Not deleted");
             });
             
         } 
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
                $window.location.reload();
            }, function(rejection) {
                 alert("Try Again,Not deleted");
             });
             
         }
         
     }
    $scope.add_Groups=function(){
          $scope.AddGroups = true;
          $scope.ListGroups=false;
          $scope.DisplayAll = false;
          $scope.AddNewContacts=false;
      }
    $scope.Cancel_Groups=function(){
          $scope.AddGroups = false;
          $scope.ListGroups=true;
          $scope.DisplayAll = false;
          $scope.AddNewContacts=false;
      }
    $scope.save_Groups=function(user){
            $http({
            url: 'http://localhost:4567/group',
            method: "POST",
            data:JSON.stringify(user),
            })
           .then(function(response) {
            $scope.List_Group();
           console.log("bbb insuccess");

        }, 
        function(response) { 
             console.log("not insuccess");
        });
          $scope.AddGroups = false;
           $scope.ListGroups=true;
    }
    $scope.closeGroup=function(){
        $scope.ListGroups=false;
         $scope.DisplayAll = true;
    }
    
         
});
