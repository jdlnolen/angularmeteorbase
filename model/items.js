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

Meteor.methods({
    invite: function (itemId, userId) {
      check(itemId, String);
      check(itemId, String);
      var item = Items.findOne(itemId);
        if (!item)
          throw new Meteor.Error(404, "No such item");
        if (item.owner !== this.userId)
          throw new Meteor.Error(404, "No such item");
        if (item.public)
          throw new Meteor.Error(400,
            "That item is public. No need to invite people.");

      if (userId !== item.owner && ! _.contains(item.invited, userId)) {
        Items.update(itemId, { $addToSet: { invited: userId } });

        var from = contactEmail(Meteor.users.findOne(this.userId));
        var to = contactEmail(Meteor.users.findOne(userId));

        if (Meteor.isServer && to) {
          // This code only runs on the server. If you didn't want clients
          // to be able to see it, you could move it to a separate file.
          Email.send({
            from: "noreply@angularbase.com",
            to: to,
            replyTo: from || undefined,
            subject: "ITEM: " + item.title,
            text:
              "Hey, I just invited you to '" + item.title + "' on AngularBase." +
              "\n\nCome check it out: " + Meteor.absoluteUrl() + "\n"
          });
        }
      }
    },
    
    rsvp: function (itemId, rsvp) {
        check(itemId, String);
        check(rsvp, String);
        if (! this.userId)
            throw new Meteor.Error(403, "You must be logged in to RSVP");
        if (! _.contains(['yes', 'no', 'maybe'], rsvp))
            throw new Meteor.Error(400, "Invalid RSVP");
        var item = Items.findOne(itemId);
   if (! item)
     throw new Meteor.Error(404, "No such item");
   if (! item.public && item.owner !== this.userId && !_.contains(item.invited, this.userId))
     // private, but let's not tell this to the user
     throw new Meteor.Error(403, "No such item");

     var rsvpIndex = _.indexOf(_.pluck(item.rsvps, 'user'), this.userId);
     if (rsvpIndex !== -1) {
   // update existing rsvp entry

        if (Meteor.isServer) {
        // update the appropriate rsvp entry with $
            Items.update(
                {_id: itemId, "rsvps.user": this.userId},
                {$set: {"rsvps.$.rsvp": rsvp}});
        } else {
                // minimongo doesn't yet support $ in modifier. as a temporary
                // workaround, make a modifier that uses an index. this is
                // safe on the client since there's only one thread.
            var modifier = {$set: {}};
            modifier.$set["rsvps." + rsvpIndex + ".rsvp"] = rsvp;
            Items.update(itemId, modifier);
        }
                // Possible improvement: send email to the other people that are
                // coming to the party.
        } else {
            // add new rsvp entry
            Items.update(itemId, {$push: {rsvps: {user: this.userId, rsvp: rsvp}}});
        }
    }
    
    
    
    
    
    
    
  });

  var contactEmail = function (user) {
    if (user.emails && user.emails.length)
      return user.emails[0].address;
    if (user.services && user.services.facebook && user.services.facebook.email)
      return user.services.facebook.email;
    return null;
  };