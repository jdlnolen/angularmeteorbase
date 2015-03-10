Items = new Mongo.Collection("items");

Items.allow({
  insert: function (userId, item) {
    return userId && item.owner === userId;
  },
  update: function (userId, item, fields, modifier) {
    if (userId !== item.owner)
      return false;

    return true;
  },
  remove: function (userId, item) {
    if (userId !== item.owner)
      return false;

    return true;
  }
});