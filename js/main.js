(function(){
    'use strict';

    var timeLine = angular
            .module('tlApp', [])
            .factory('Badge', badgeFactory)
            .directive('timeLine', timeLineDirective);
    
    
    /**
     * TimeLine Controller
     */
    timeLine.controller('TimeLineController', ['Badge', function(Badge){
        var badgeItems = [];
        var settings = {
                startDate: '2015-09-01',
                endDate: '2015-09-30',
                lineID: '#timeLine',
                progressID: '#progression'
        };

        var _linePoints = function(){
            return Math.round(((new Date(settings.endDate))-(new Date(settings.startDate)))/86400000 + 1);
        }; 

        settings = angular.extend({linePoints: _linePoints()}, settings);

        angular.forEach(defaultBadges, function(item){
            let badge = new Badge(item);
            badge.setActive();
            badge.setPosition(settings);
            badgeItems.push(badge);
        });

        this.badges = badgeItems;
        
        this.setProgression = function(){
            let point = new Date().getDate();
            let pos = _setPosition(point, settings);
            $(settings.progressID).css('width', pos + 'px');
        };
    }]);
    
    
    /**
     * timeLine Directory
     * 
     * @returns {_L1.timeLineDirective.Anonym$0}
     */
    function timeLineDirective(){
        return{
            restrict: 'E',
            templateUrl: 'parts/time-line.html',
            transclude: true,
            controller: "TimeLineController",
            controllerAs: 'timeLine'
        };
    };
    
    
    /**
     * Badge Factory
     * 
     * @returns {_L1.badgeFactory.Badge}
     */
     function badgeFactory(){
        var Badge = function(data){
                this.id = gen.next().value;
                this.name = data.name || '';
                this.date = data.date || new Date();
                this.icon = data.icon || 'circle';
                this.isActive = data.isActive || false;
                this.position = data.position || 0;
        };

        Badge.prototype.setActive = function(){
                let itemDate = new Date(this.date);
                this.isActive = new Date() >= itemDate ? true : false;
                return;
        };

        Badge.prototype.setPosition = function(settings){
                let startPoint = new Date(this.date).getDate();
                this.position = _setPosition(startPoint, settings) -23;
                return;
        };

        return Badge;
    };
    
    
    /**
     * Set badge position in timeLine
     * 
     * @param int point
     * @param Object settings
     * @returns {_L1._setPosition.position}
     */
    function _setPosition(point, settings){
        let lineLenght = $(settings.lineID).width();
        let position = (lineLenght * point)/settings.linePoints;
        return position;
    };
    
    /**
     * Generator ID object
     */
    function* idMaker(){
        var index = 0;
        while(true)
            yield index++;
    }
    var gen = idMaker();
    
    
    /**
     * Default data
     */
    var defaultBadges = [
        {
            date: '2015-09-02',
            name: 'First Item',
            icon: 'heart'
        },
        {
            date: '2015-09-11',
            name: 'Second Item',
            icon: 'flask'
        },
        {
            date: '2015-09-15',
            name: 'Third Item',
            icon: 'gavel'
        },
        {
            date: '2015-09-22',
            name: 'Fourth Item',
            icon: 'graduation-cap'
        },
        {
            date: '2015-09-30',
            name: 'Fifth Item',
            icon: 'trophy'
        }
    ];    
})();
