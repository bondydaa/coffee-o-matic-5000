var coffeeOMatic = coffeeOMatic || {};

// declare inventory for the machine
coffeeOMatic.inventory = {
    'coffee': {
        'displayName': 'Coffee',
        'units': 10
    },
    'decafCoffee': {
        'displayName': 'Decaf Coffee',
        'units': 10
    },
    'sugar': {
        'displayName': 'Sugar',
        'units': 10
    },
    'cream': {
        'displayName': 'Cream',
        'units': 10
    },
    'steamedMilk': {
        'displayName': 'Steamed Milk',
        'units': 10
    },
    'foamedMilk': {
        'displayName': 'Foamed Milk',
        'units': 10
    },
    'espresso': {
        'displayName': 'Espresso',
        'units': 10
    },
    'cocoa': {
        'displayName': 'Cocoa',
        'units': 10
    },
    'whippedCream': {
        'displayName': 'Whipped Cream',
        'units': 10
    }
};

// declare how to make each drink
coffeeOMatic.recipes = {
    'coffee': {
        'name': 'coffee',
        'displayName': 'Coffee',
        'price': '2.75',
        'ingredients': {
            'coffee': 3,
            'sugar': 1,
            'cream': 1
        }
    },
    'decafCoffee': {
        'name': 'decafCoffee',
        'displayName': 'Decaf Coffee',
        'price': '2.75',
        'ingredients': {
            'decafCoffee': 3,
            'sugar': 1,
            'cream': 1
        }
    },
    'caffeLatte': {
        'name': 'caffeLatte',
        'displayName': 'Caffe Latte',
        'price': '2.55',
        'ingredients': {
            'espresso': 2,
            'steamedMilk': 1
        }
    },
    'caffeAmericano': {
        'name': 'caffeAmericano',
        'displayName': 'Caffe Americano',
        'price': '3.30',
        'ingredients': {
            'espresso': 3
        }
    },
    'caffeeMocha': {
        'name': 'caffeeMocha',
        'displayName': 'Caffe Mocha',
        'price': '3.35',
        'ingredients': {
            'espresso': 1,
            'cocoa': 1,
            'steamedMilk': 1,
            'whippedCream': 1
        }
    },
    'cappuccino': {
        'name': 'cappuccino',
        'displayName': 'Cappuccino',
        'price': '2.90',
        'ingredients': {
            'espresso': 2,
            'steamedMilk': 1,
            'foamedMilk': 1
        }
    }
};

// declare app level module and dependencies
angular.module('coffeeOMatic', ['coffeeOMatic.controllers', 'coffeeOMatic.services']);

// Controllers
angular.module('coffeeOMatic.controllers', [])
    .controller('mainController', function($scope, inventoryService, recipeService){
        // grab our data
        $scope.inventory = inventoryService.getInventory();
        $scope.recipes = recipeService.getRecipes();

        $scope.makeDrink = function(drinkName){
            var drinkObject = $scope.recipes[drinkName];
            var ingredientsToUse = drinkObject.ingredients;
            var ingredientsCheck = true;

            for ( var curIngredient in ingredientsToUse ) {
                if ( inventoryService.getUnitsRemaining(curIngredient) < ingredientsToUse[curIngredient] ) {
                    ingredientsCheck = false;
                }
            }

            if ( ingredientsCheck ) {
                inventoryService.useIngredients(ingredientsToUse);
            } else {
                alert('Out of Stock: '+drinkObject.displayName);
            }
        };
    });

// Services
angular.module('coffeeOMatic.services', [])
    .factory('inventoryService', function(){
        return {
            getInventory: function() {
                return coffeeOMatic.inventory;
            },
            getUnitsRemaining: function(ingredientName) {
                var _ingredient = coffeeOMatic.inventory[ingredientName]
                return _ingredient.units;
            },
            useIngredients: function(neededIngredients) {
                for ( var _curIngredient in neededIngredients ) {
                    var ingredient = coffeeOMatic.inventory[_curIngredient];
                    var unitsAvailable = ingredient.units;
                    var neededUnits = neededIngredients[_curIngredient];

                    ingredient.units = unitsAvailable - neededUnits;
                }
            }
        };
    })
    .factory('recipeService', function(){
        return {
            getRecipes: function() {
                return coffeeOMatic.recipes;
            }
        }
    });