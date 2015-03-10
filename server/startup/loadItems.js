 Meteor.startup(function () {
    if (Items.find().count() === 0) {

      var items = [
        {'name': 'Dubstep-Free Zone',
          'description': 'Can we please just for an evening not listen to dubstep.'},
        {'name': 'All dubstep all the time',
          'description': 'Get it on!'},
        {'name': 'Savage lounging',
          'description': 'Leisure suit required. And only fiercest manners.'}
      ];

      for (var i = 0; i < items.length; i++)
        Items.insert({name: items[i].name, description: items[i].description});

    }
   });