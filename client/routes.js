Meteor.subscribe("tables");
Meteor.subscribe("products");
Meteor.subscribe("wishlists")

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

// the main route. showing the list of sites.
Router.route('/', function () {
    this.render('home');
});

Router.route('/showTables', function () {
    this.render('showTables');
});


Router.route('/showWishlists', function () {
    this.render('showWishlists');
});


// this route is for the discussion page for a site
// Router.route('/chatrooms/:_id', function () {
//     var chatroomId = this.params._id;
//     // at this point, we know the chatroom id
//     // so we can subscribe to the messages for that chatroom
//     Meteor.subscribe("messages.filtered", chatroomId);
//     // now we retrieve the chatroom itself
//     // and pass it to the template for rendering
//     chatroom = Chatrooms.findOne({_id:chatroomId});
//     this.render('messageList', {data:chatroom});
// });

Router.route('/tables/:_id', function () {
    // at this point, we know the chatroom id
    // so we can subscribe to the messages for that chatroom
    Meteor.subscribe("tables");
    // now we retrieve the chatroom itself
    // and pass it to the template for rendering
    var table = Tables.findOne({_id:this.params._id});
    //console.log(table);
    this.render('productsOntable', {data:table});
});

Router.route('/wishlists/:_id', function () {
    Meteor.subscribe("wishlists");
    var wishlist = Wishlists.findOne({_id:this.params._id});
    this.render('productsOnwishlist', {data:wishlist});
});

Router.route('/category/:value', function () {
    Meteor.subscribe("products");
    var productlist = Products.find({category:this.params.value}).fetch();
    console.log(productlist);
    this.render('showCategoryproducts', {data:productlist});
});
