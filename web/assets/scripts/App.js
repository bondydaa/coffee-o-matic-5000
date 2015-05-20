var coffeeOMatic = coffeeOMatic || {};

// declare inventory for the machine
coffeeOMatic.inventory = {
    'coffee': {
        'displayName': 'Coffee',
        'units': 10,
        'price': .75
    },
    'decafCoffee': {
        'displayName': 'Decaf Coffee',
        'units': 10,
        'price': .75
    },
    'sugar': {
        'displayName': 'Sugar',
        'units': 10,
        'price': .25
    },
    'cream': {
        'displayName': 'Cream',
        'units': 10,
        'price': .25
    },
    'steamedMilk': {
        'displayName': 'Steamed Milk',
        'units': 10,
        'price': .35
    },
    'foamedMilk': {
        'displayName': 'Foamed Milk',
        'units': 10,
        'price': .35
    },
    'espresso': {
        'displayName': 'Espresso',
        'units': 10,
        'price': 1.10
    },
    'cocoa': {
        'displayName': 'Cocoa',
        'units': 10,
        'price': .90
    },
    'whippedCream': {
        'displayName': 'Whipped Cream',
        'units': 10,
        'price': 1.00
    }
};

// declare how to make each drink
coffeeOMatic.recipes = {
    'coffee': {
        'displayName': 'Coffee',
        'coffee': 3,
        'sugar': 1,
        'cream': 1
    },
    'decafCoffee': {
        'displayName': 'Decaf Coffee',
        'decafCoffee': 3,
        'sugar': 1,
        'cream': 1
    },
    'caffeLatte': {
        'displayName': 'Caffe Latte',
        'espresso': 2,
        'steamedMilk': 1
    },
    'caffeAmericano': {
        'displayName': 'Caffe Americano',
        'espresso': 3
    },
    'caffeeMocha': {
        'displayName': 'Caffe Mocha',
        'espresso': 1,
        'cocoa': 1,
        'steamedMilk': 1,
        'whippedCream': 1
    },
    'cappuccino': {
        'displayName': 'Cappuccino',
        'espresso': 2,
        'steamedMilk': 1,
        'foamedMilk': 1
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

        // do things with data
        $scope.makeDrink = function(){

        };
    });

// Services
angular.module('coffeeOMatic.services', [])
    .factory('inventoryService', function(){
        return {
            getInventory: function() {
                return coffeeOMatic.inventory;
            },
            getIngredient: function(ingredientName) {
                return coffeeOMatic.inventory[ingredientName];
            }
        };
    })
    .factory('recipeService', function(){
        return {
            getRecipes: function() {
                return coffeeOMatic.recipes;
            },
            getDrink: function(drinkName) {
                return coffeeOMatic.recipes[drinkName];
            }
        }
    });


//Directives