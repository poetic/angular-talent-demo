angular.module('angular-talent-demo', ['angular-uuid'])
.controller('TalentFormController', ['$scope', 'TalentService', function($scope, TalentService) {

  $scope.talent = {};
  $scope.formData = {};
  $scope.formErrors = {};

  $scope.selected = function(obj) {
    const selected = [];

    for (k in obj) {
      if (obj[k])
        selected.push(k);
    }

    return selected.length;
  }

  $scope.isEmpty = function(value) {
    return !value || value === '';
  } 

  $scope.validate = function() {
    if ($scope.formData.contactInfo) {

      $scope.formErrors.contactInfo = {};

      if ( $scope.isEmpty($scope.formData.contactInfo.originalSource) )
        $scope.formErrors.contactInfo.originalSource = 'required';

      if ( $scope.isEmpty($scope.formData.contactInfo.firstName) )
        $scope.formErrors.contactInfo.firstName = 'required';

      if ( $scope.isEmpty($scope.formData.contactInfo.lastName) )
        $scope.formErrors.contactInfo.lastName = 'required';

      if ( $scope.isEmpty($scope.formData.contactInfo.preferredEmail) )
        $scope.formErrors.contactInfo.preferredEmail ='required';

    } else {

      $scope.formErrors.contactInfo = {
        originalSource: 'required',
        firstName: 'required',
        lastName: 'required',
        preferredEmail: 'required',
      };
    }

    return Object.keys($scope.formErrors.contactInfo).length === 0;
  }

  $scope.reset = function() {
    $scope.formData = $scope.talent;
  }

  $scope.submit = function() {
    if ( !$scope.validate() )
      return;
    else if ($scope.talent.id)
      $scope.talent = TalentService.update($scope.talent.id, $scope.formData);
    else
      $scope.talent = TalentService.create($scope.formData);
  }
}])

.factory('TalentService', ['uuid', function(uuid) {
  return {
    update: function(id, talent) {
      console.log('TalentService', 'update', id, talent);
      talent.id = id;
      return talent;
    },
    create: function(talent) {
      talent.id = uuid.v4();
      console.log('TalentService', 'create', talent.id, talent); 
      return talent;
    }
  };
}]);
