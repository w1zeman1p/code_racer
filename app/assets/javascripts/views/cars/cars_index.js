CodeRacer.Views.CarsIndex = Backbone.View.extend({
  initialize: function () {
    this._carViews = [];
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addCar);
    this.collection.each(this.addCar, this);
  },

  addCar: function (car) {
    var view = new CodeRacer.Views.CarsIndexItem({
      model: car
    });
    this._carViews.push(view);
    this.$('ul').append(view.render().$el);
    console.log('adding car');
  },

  renderCars: function () {
    this.$('ul').empty();
    _(this._carViews).each(function (v) {
      this.$('ul').append(v.$el);
      v.delegateEvents();
    }, this);
  },

  template: JST['cars/index'],

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.renderCars();
    return this;
  },
});