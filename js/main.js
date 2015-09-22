(function(){
    var app = angular
            .module('tlApp', [])
            .factory('Badge', badgeFactory)
            .directive('timeLine', timeLineDirective);
    
    
    /**
     * TimeLine Controller
     */
    app.controller('TimeLineController', ['Badge', function(Badge){
        var badgeItems = [];
        var settings = {
                startDate: '2015-09-01',
                endDate: '2015-09-30',
                lineID: '#timeLine',
                progressID: '#progression'
        };

        _linePoints = function(){
            return Math.round(((new Date(settings.endDate))-(new Date(settings.startDate)))/86400000 + 1);
        }; 

        settings = angular.extend({linePoints: _linePoints()}, settings);

        angular.forEach(defaultBadges, function(item){
            item.isActive = Badge.setActive(item);
            item.position = Badge.setPosition(item, settings);
            badgeItems.push(item);
        });

        this.badges = badgeItems;
        
        this.setProgression = function(){
            var point = new Date().getDate();
            var pos = _setPosition(point, settings);
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
     * @returns {_L1.badgeFactory.Badge}
     */
     function badgeFactory(){
        return {        
            setActive: function(item){
                var itemDate = new Date(item.date);
                return new Date() >= itemDate ? true : false;
            },
            setPosition: function(item, settings){
                var startPoint = new Date(item.date).getDate();
                return _setPosition(startPoint, settings) -23;
            }
        };
    };
    
    
    /**
     * Set badge posiion in timeLine
     * 
     * @param int point
     * @param Object settings
     * @returns {_L1._setPosition.lineLenght}
     */
    function _setPosition(point, settings){
        var lineLenght = $(settings.lineID).width();
        var position = (lineLenght * point)/settings.linePoints;
        return position;
    };
    
    
    /**
     * Default data
     */
    defaultBadges = [
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