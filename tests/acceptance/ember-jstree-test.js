import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
var App;

module('Acceptance - ember-cli-jstree', {
    beforeEach: function() {
        App = startApp();
        
        // PhantomJS doesn't support bind yet
        Function.prototype.bind = Function.prototype.bind || function (thisp) {
            var fn = this;
            return function () {
                return fn.apply(thisp, arguments);
            };
        }; 
    },

    afterEach: function() {
        Ember.run(App, App.destroy);
    }
});

test('Has static demo', function(assert) {
    assert.expect(1);
    visit('/static').then(function() {
        assert.equal(find('.sample-tree').length, 1, 'Static page contains a sample tree');
    });
});

test('Destroy button destroys jstreeObject', function(assert) {
    assert.expect(1);

    visit('/static');
    click('.ember-test-destroy-button');
    andThen(function() {
        assert.equal(find('.sample-tree:first-child').length, 0, 'Tree should be destroyed');
    });
});

test('Get Node button gets correct node', function(assert) {
    assert.expect(2);

    visit('/static');
    click('.ember-test-getnode-button');
    andThen(function() {
        var object = {"id":"rn2","text":"Root node 2","icon":true,"parent":"#","parents":["#"],"children":["j1_5","j1_6"], 
            "children_d":["j1_5","j1_6"],"data":null,"state":{"loaded":true,"opened":true,"selected":true,"disabled":false},
            "li_attr":{"id":"rn2"},"a_attr": {"href":"#","id":"rn2_anchor"},"original":{"id":"rn2","text":"Root node 2","state":{"opened":true,"selected":true}}};
        var compare = JSON.parse(find('.ember-test-buffer').text());

        assert.equal(compare.text, object.text, 'getNode should return the correct node title');
        assert.equal(compare.parent, object.parent, 'getNode should return the correct node parent ID (#)');
    });
});

test('Has dynamic demo', function(assert) {
    assert.expect(1);
    visit('/dynamic').then(function() {
        assert.equal(find('.sample-tree').length, 1, 'Dynamic page contains a sample tree');
    });
});
