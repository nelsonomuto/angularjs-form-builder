'use strict';

angular.module('fieldDirective', [])
.directive('fieldDirective', function ($http, $compile) {

        var getTemplateUrl = function(field) {
            var type = field.field_type;
            var templateUrl = '';

            switch(type) {
                case 'textfield':
                    templateUrl = './views/directive-templates/field/textfield.html';
                    break;
                case 'email':
                    templateUrl = './views/directive-templates/field/email.html';
                    break;
                case 'textarea':
                    templateUrl = './views/directive-templates/field/textarea.html';
                    break;
                case 'checkbox':
                    templateUrl = './views/directive-templates/field/checkbox.html';
                    break;
                case 'date':
                    templateUrl = './views/directive-templates/field/date.html';
                    break;
                case 'dropdown':
                    templateUrl = './views/directive-templates/field/dropdown.html';
                    break;
                case 'hidden':
                    templateUrl = './views/directive-templates/field/hidden.html';
                    break;
                case 'password':
                    templateUrl = './views/directive-templates/field/password.html';
                    break;
                case 'radio':
                    templateUrl = './views/directive-templates/field/radio.html';
                    break;
            }
            return templateUrl;
        }

        var linker = function(scope, element) {
            // GET template content from path
            var templateUrl = getTemplateUrl(scope.field);
            $http.get(templateUrl).success(function(data) {
                var loopScope, template;

                template = data;
                loopScope = {
                    template: template
                };

                //begin extract custom validation attribute so that directives for custom validation can run
                angular.forEach(template.match(/\bvalidation.+/g), function(customValidationAttribute){
                    var extract, fieldIndex, validationProperty;
                    if((fieldIndex = customValidationAttribute.indexOf('field')) > -1){
                        extract = customValidationAttribute.substring(0, customValidationAttribute.indexOf('{'));
                        validationProperty = customValidationAttribute.substring(fieldIndex + 6, customValidationAttribute.indexOf('}') );
                        extract += scope.field[validationProperty] + '"';
                        this.template = this.template.replace(customValidationAttribute.trim(), extract);
                    }
                }, loopScope);
                template = loopScope.template;
                //end extract custom validation attribute so that directives for custom validation can run

                element.html(template);                                
                $compile(element.contents())(scope);
            });
        }

        return {
            template: '<div>{{field}}</div>',
            restrict: 'E',
            scope: {
                field:'=',
            },
            link: linker
        };
  });

'use strict';

angular.module('formDirective', [])
.directive('formDirective', function () {
    return {
        controller: function($scope){
            $scope.submit = function(){
                alert('Form submitted..');
                $scope.form.submitted = true;
            }

            $scope.cancel = function(){
                alert('Form canceled..');
            }
        },
        templateUrl: './views/directive-templates/form/form.html',
        restrict: 'E',
        scope: {
            form:'='
        }
    };
  });
