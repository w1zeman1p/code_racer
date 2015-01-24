CodeRacer.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'index',
    '_=_': 'index',
    'track/new': 'new',
    'track/:id': 'track',
    'track/:id/edit': 'edit',
    'staging': 'staging'
  },

  staging: function () {
    var view = new CodeRacer.Views.WaitingArea();

    this._swapView(view);
  },

  edit: function (id) {
    var track = new CodeRacer.Models.Track({
      id: id
    });
    track.fetch();

    var view = new CodeRacer.Views.TrackForm({
      model: track
    });

    this._swapView(view);
  },

  new: function () {
    var view = new CodeRacer.Views.TrackForm({
      model: new CodeRacer.Models.Track()
    });

    this._swapView(view);
  },

  index: function () {
    CodeRacer.tracks.fetch();

    var view = new CodeRacer.Views.TracksIndex({
      collection: CodeRacer.tracks
    });

    this._swapView(view);
  },

  track: function (id) {
    var track = new CodeRacer.Models.Track({
      id: id
    });
    track.fetch();

    var view = new CodeRacer.Views.TrackDetail({
      model: track
    });

    this._swapView(view);
  },

  _swapView: function (view) {
    this._current && this._current.remove();
    this._current = view;
    this.$rootEl.html(view.render().$el);
  },
});
