/**
 * Contains the blueprint (prototype) for a single test case.
 * Meant to be used with the Tests test-case library
 *
 * @author juanvallejo
 * @date 3/11/15
 */

var TestModules = require('../modules');

/**
 * Test interface for implementing a test case
 *
 * @param name is a String containing the name for this test
 */
function Test(name) {

	if(!name) {
		throw 'A name for each test case is required.';
	}

	this.name 			= name;
	this.expectedValue 	= undefined; 
	this.actualValue 	= null;
	this.category 		= null;

	// define functions to call
	// when returns method is called
	this.callbacks 		= {};

	// define test modules
	this.modules 		= TestModules;

	/**
	 * used to apply a category this test belongs to
	 */
	this.setCategory = function(category) {
		this.category = category;
	}

	/**
	 * Returns the category assigned to our test case
	 */
	this.getCategory = function() {
		return this.category;
	}

	/**
	 * Returns the test-case's assigned expected value
	 */
	this.getExpectedValue = function() {
		return this.expectedValue;
	}

	/**
	 * Returns the name assigned to this test case
	 */
	this.getName = function() {
		return this.name;
	}

	/**
	 * Defines the expected value our test will look for
	 */
	this.expects = function(value) {
		this.expectedValue = value;
	}

	/**
	 * assign a callback for a specific state of the test case
	 */
	this.on = function(state, callback) {

		// determine if a callback for this state
		// has been previously assigned
		if(!this.callbacks[state]) {
			this.callbacks[state] = [];
		}

		this.callbacks[state].push(callback);

	}

	/**
	 * call all pending callback functions for a state and pass a value
	 */
	this.emit = function(state, value) {

		var scope = this;

		this.callbacks[state].forEach(function(callback) {
			callback.call(scope, value);
		});

	}

	/**
	 * Run method for our test. Every test item must implement it.
	 *
	 * @return each test case MUST return an "actual" value, or the value obtained
	 * that should be compared to its expected value. This can be a String, Integer, Object, Boolean, Function, or a null value
	 */
	this.run = function() {

		// implement runnable steps here
		console.log('Test warning: Unimplemented test. Run method should be overriden.');

		this.end(null);

	}

	/**
	 * Since responses are sometimes asynchronous, we use
	 * the end method to indicate the exact value that our test case is supposed to return
	 * when our test has completely finished executing
	 */
	this.end = function(value) {
		this.emit('end', value);
	}

}

module.exports = Test;