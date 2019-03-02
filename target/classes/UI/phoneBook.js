var myApp = angular.module("PhoneBook",['ngMaterial']);
myApp.controller('ContactController',function EventController($scope,$http,$compile){
    $scope.AddNewContacts = false;
    $scope.ListGroups = false;
    $scope.DisplayAll=true;
    $http.get('http://localhost:4567/group').then(function (data){
        $scope.groups = [];
        console.log(data.data);
        angular.forEach(data.data, function (value, index) {
            $scope.groups.push({ id: value.group_id, label: value.group_name });
        });
    })
    $http({
            method: 'GET',
            url: 'http://localhost:4567/contact'
            }).then(function(response) {
            Table_AllContacts(response.data);
            }, function(response) {
            No_Data();
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
    }
    $scope.save_Contacts=function(){
        $scope.AddNewContacts = false;
        $scope.ListGroups = false;
        $scope.DisplayAll = true;
    }
     $scope.Cancel_Contacts=function(){
        $scope.AddNewContacts = false;
        $scope.ListGroups = false;
        $scope.DisplayAll = true;
    }
    
    
    
    
    
    
    
    
    
    
});

function Table_AllContacts(data){
    console.log(data[0])
}