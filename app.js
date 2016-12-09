angular.module('angular-talent-demo', ['angular-uuid'])
.controller('TalentFormController', ['$scope', 'TalentService', function($scope, TalentService) {
  $scope.talent = {};

  $scope.submit = function() {
    $scope.talent.id = TalentService.save($scope.talent);
  }
}])

.factory('TalentService', ['uuid', function(uuid) {
  return {
    save: function(talent) {
      if( talent.id ) {
        console.log('TalentService', 'saving talent', talent);
      }
      else {
        talent.id = uuid.v4();
        console.log('TalentService', 'created talent', talent); 
      }

      return talent.id;
    }
  };
}]);
