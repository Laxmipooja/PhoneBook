var myApp = angular.module("PhoneBook",['ngMaterial']);
myApp.controller('ContactController',function EventController($scope,$http,$compile){
    $scope.AddNewContacts = false;
    $scope.ListGroups = false;
    $http.get('http://localhost:4567/group').then(function (data) {
        $scope.groups = [];
        console.log(data.data);
        angular.forEach(data.data, function (value, index) {
            $scope.groups.push({ id: value.group_id, label: value.group_name });
        });
    })
    
    
    
//    $http({
//            method: 'GET',
//            url: 'http://localhost:4567/contact'
//            }).then(function successCallback(response) {
//            angular.forEach(data.data, function (value) {
//            $scope.groups.push({ id: value.group_id, label: value.group_name });
//            });
//            }, function errorCallback(response) {
//            alert(response.data);
//            });
    $scope.Add_Contacts = function(){
    $scope.AddNewContacts = true;
    $scope.ListGroups = false;
}
    $scope.List_Group=function(){
        $scope.ListGroups = true;
        $scope.AddNewContacts = false;
    }
    
    
    
    
    
    
    
    
    
    
});