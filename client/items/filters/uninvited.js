angular.module("angularbase").filter('uninvited', function () {
  return function (users, item) {
    if (!item)
      return false;

    return _.filter(users, function (user) {
      if (user._id == item.owner ||
          _.contains(item.invited, user._id))
        return false;
      else
        return true;
    });
  }
});