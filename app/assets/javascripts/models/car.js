/*globals CodeRacer, Backbone */
CodeRacer.Models.Car = Backbone.Model.extend({
  urlRoot: '/api/race_entries',

  parse: function (data) {
    if (data.other_cars && this.collection) {
      this.collection.set(data.other_cars);
      delete data.other_cars;
    }
    return data;
  },
});
