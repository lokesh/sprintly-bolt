define([
  'underscore',
  'text!templates/dashboard.html',
  'text!templates/filters.html',
  'text!templates/item.html',
  'text!templates/item_modal.html',  
  'text!templates/items_lists.html',
  'text!templates/items_statusbar.html',
  'text!templates/login.html',
  'text!templates/people_filters.html',
  'text!templates/person_filter.html',
  'text!templates/search_filter.html',
  'text!templates/tag_filter.html',
  'text!templates/tags_filters.html'
], function (_, dashboard, filters, item, itemModal, itemsLists, itemsStatusbar, login,
  peopleFilters, personFilter, searchFilter, tagFilter, tagsFilters) {

  return {
    'dashboard':      _.template(dashboard),
    'filters':        _.template(filters),
    'item':           _.template(item),
    'itemModal':      _.template(itemModal),
    'itemsLists':     _.template(itemsLists),
    'itemsStatusbar': _.template(itemsStatusbar),
    'login':          _.template(login),
    'peopleFilters':  _.template(peopleFilters),
    'personFilter':   _.template(personFilter),
    'searchFilter':   _.template(searchFilter),
    'tagFilter':      _.template(tagFilter),
    'tagsFilters':    _.template(tagsFilters)
  };

});
