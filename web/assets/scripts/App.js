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
            'steamedMilk': 1,
            'espresso': 2
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
        var restockInventory = JSON.stringify(inventoryService.getInventory()); // save state for restocking outside of scope

        $scope.makeDrink = function(drinkName){
            var ingredientsToUse = recipeService.getDrinkDetails(drinkName, 'ingredients');
            var drinkDisplayName = recipeService.getDrinkDetails(drinkName, 'displayName');

            try {
                inventoryService.useIngredients(ingredientsToUse);
            }
            catch (err) {
                alert(err + ' ' + drinkDisplayName);
            }
        };
        $scope.restock = function() {
            inventoryService.resetInventory($scope.inventory, restockInventory);
        }
    });

// Services
angular.module('coffeeOMatic.services', [])
    .factory('inventoryService', function(){
        return {
            getInventory: function() {
                return coffeeOMatic.inventory;
            },
            getIngredient: function(name) {
                return coffeeOMatic.inventory[name];
            },
            getUnitsRemaining: function(ingredientName) {
                var _ingredient = coffeeOMatic.inventory[ingredientName]
                return _ingredient.units;
            },
            useIngredients: function(neededIngredients) {
                var originalInventory = JSON.stringify(coffeeOMatic.inventory); // save state in case of error

                for ( var _curIngredient in neededIngredients ) {
                    var ingredient = this.getIngredient.call(this, _curIngredient);
                    var unitsAvailable = this.getUnitsRemaining.call(this, _curIngredient);
                    var neededUnits = neededIngredients[_curIngredient];

                    if ( unitsAvailable < neededUnits ) {
                        this.resetInventory.call(this, neededIngredients, originalInventory);
                        throw 'Out of Stock';
                    } else {
                        ingredient.units = unitsAvailable - neededUnits;
                    }
                }
            },
            setUnits: function(ingredientToUpdate, newUnits) {
                var _ingredientToUpdate = coffeeOMatic.inventory[ingredientToUpdate];
                _ingredientToUpdate['units'] = newUnits;
            },
            resetInventory: function(usedIngredients, orgInventory) {
                var _orgInventory = JSON.parse(orgInventory);

                for ( var _usedIngredient in usedIngredients ) {
                    var orgIngredient = _orgInventory[_usedIngredient];
                    var orgUnits = orgIngredient.units;

                    this.setUnits.call(this, _usedIngredient, orgUnits);
                }
            }
        };
    })
    .factory('recipeService', function(){
        return {
            getRecipes: function() {
                return coffeeOMatic.recipes;
            },
            // letting recipes allow for growth/changes in data
            getDrinkDetails: function(drinkName, property) {
                var _drinkName = coffeeOMatic.recipes[drinkName];
                return _drinkName[property];
            }
        }
    });