(function() {

	var GamesApp = Backbone.Marionette.Application.extend({
		regions: {
			main: '#main'
		},
		
		initialize: function(options) {
			var topicsView = new TopicsView({
				collection: options.topics
			});
					
			this.main.show(topicsView);
		}
	});

	// models & collections
	var GameModel = Backbone.Model.extend({
		defaults: {
			image_path: "",
			title:""
		}
	});

	var GamesCollection = Backbone.Collection.extend({
		model: GameModel
	});

	var TopicModel = Backbone.Model.extend({
		defaults: {
			heading: ""
		}
	});

	var TopicsCollection = Backbone.Collection.extend({
		model: TopicModel,
		url: "/data/data.json"

	});

	// views
	var GameView = Backbone.Marionette.ItemView.extend({
		template: '#game-template',
		className: 'game-img'
	});

	var GamesView = Backbone.Marionette.CollectionView.extend({
		className: 'games-container',
		childView: GameView,

		attachHtml: function(collectionView, itemView){
			collectionView.$el.append(itemView.el);
		}
	});

	var TopicView = Backbone.Marionette.ItemView.extend({
		template: '#topic-template',
		className: 'topic-template',

		initialize: function(options) {
			games_collection = new Backbone.Collection();
			games_collection.add(options.model.get('games'));
			this.games = new GamesView({ collection: games_collection });
		},

		onRender: function() {
			this.games.render();
			this.$el.append(this.games.$el);
		}
	});

	var TopicsView = Backbone.Marionette.CompositeView.extend({
		template: '#topics-template',
		childView: TopicView,
		itemViewOptions: {
			games: "test"
		}
	});

	$(function() {
		var topics = new TopicsCollection();
		topics.fetch();

		// start the app
		var MyApp = new GamesApp({topics:topics});
		MyApp.start();
				
	});

})();