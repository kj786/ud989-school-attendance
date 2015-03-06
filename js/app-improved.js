/*jshint quotmark: false */
/*global $, console:false*/
"use strict";
$(function() {
    function getRandom() {
        return (Math.random() >= 0.5);
    }

    if (!localStorage.attendance) {
        console.log("Creating attendance records...");


        var nameColumns = $("tbody .name-col"),
            attendance = {};

        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}());

$(function(){
    var _students = {
            index: 0,
            names: ["Slappy the Frog",
                    "Lilly the Lizard",
                    "Paulrus the Walrus",
                    "Gregory the Goat",
                    "Adam the Anaconda"],
            months: 12
        };

    function init(){

    }

    function getNextName(){
        if (_students.index > -1) {
            var name = _students.names[_students.index];
            _students.index++;

            if (_students.index === _students.names.length) {
                _students.index = -1;
            }

            return name;
        } else {
            return "";
        }
    }

    function getMonths(){
        return _students.months;
    }

    function reset(){
        _students.index = 0;
    }

    window.Model = {
        init: init,
        getNextName: getNextName,
        getMonths: getMonths,
        reset: reset
    };
});


$(function() {
    function init(){
        View.init();
    }

    function getNextName(){
        return Model.getNextName();
    }

    function getMonths() {
        return Model.getMonths();
    }

    function reset(){
        Model.reset();
    }

    window.Octopus = {
        init: init,
        getNextName: getNextName,
        getMonths: getMonths,
        reset: reset
    };

});

$(function() {
    var _table = {
        'head': {
            'start': '<tr><th class="name-col">Student Name</th>',
            'middle': '<th>%value%</th>',
            'end': '<th class="missed-col">Days Missed-col</th></tr>'
        },
        'body': {
            'start': '<tr class="student">',
            'heading': '<td class="name-col">%value%</td>',
            'middle': '<td class="attend-col"><input type="checkbox"></td>',
            'last': '<td class="missed-col">0</td>',
            'end': '</tr>'
        }
    };

    function _createHead(){
        var max = Octopus.getMonths(),
            element = _table.head.start;

        for (var i = 1; i < max + 1; i++) {
            var appender = _table.head.middle.replace("%value%", i.toString());
            element += appender;
        }
        element += _table.head.end;
        // console.log(element);
        $("thead").append(element);
    }

    function _createBody(){
        var max = Octopus.getMonths(),
            element = _table.body.start,
            name = Octopus.getNextName();

        while (name !== ""){
            var appender = _table.body.heading.replace("%value%", name);
            element += appender;
            for (var i = 0; i < max; i++) {
                element += _table.body.middle;
            }
            element += _table.body.last;
            element += _table.body.end;
            name = Octopus.getNextName();
        }
        // console.log(element);
        $("tbody").append(element);
    }

    function init(){
        _createHead();
        _createBody();
    }

    window.View = {
        init: init
    };

});

$(function() {
    Octopus.init();
});
