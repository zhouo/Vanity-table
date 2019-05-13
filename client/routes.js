Meteor.subscribe("tables");
Meteor.subscribe("products");
Meteor.subscribe("wishlists");
Meteor.subscribe("reviews");

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

// the main route. showing the list of sites.
Router.route('/', function () {
    this.render('homeheader',{to:'header'});
    this.render('home');
});

Router.route('/showTables', function () {
    this.render('tableheader',{to:'header'});
    this.render('showTables');
});


Router.route('/showWishlists', function () {
    this.render('wishlistheader',{to:'header'});
    this.render('showWishlists');
});

Router.route('/brands', function () {
    this.render('brandheader', {to:'header'});
    this.render('showBrands');
});

Router.route('/admin/showUsers', function () {
    this.render('adminheader', {to:'header'});
    this.render('adminUsers');
});
Router.route('/admin/showProducts', function () {
    this.render('adminheader', {to:'header'});
    this.render('adminProducts');
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
    Meteor.subscribe("tables");
    var table = Tables.findOne({_id:this.params._id});
    Session.set("tableId", this.params._id);
    this.render('productsontableheader',{to:'header', data:table});
    this.render('productsOntable', {data:table});
});

Router.route('/wishlists/:_id', function () {
    Meteor.subscribe("wishlists");
    var wishlist = Wishlists.findOne({_id:this.params._id});
    Session.set("listId", this.params._id);
    this.render('productsonwishlistheader',{to:'header', data:wishlist});
    this.render('productsOnwishlist', {data:wishlist});
});

Router.route('/category/:value', function () {
    Meteor.subscribe("products");
    var productlist = Products.find({category:this.params.value}).fetch();
    //console.log(productlist);
    Session.set("category", this.params.value);
    this.render('categoryproductsheader',{to:'header', data:productlist});
    this.render('showCategoryproducts', {data:productlist});
});

Router.route('/brand/:value', function () {
    Meteor.subscribe("products");
    var productlist = Products.find({brand:this.params.value}).fetch();
    //console.log(productlist);
    Session.set("brand", this.params.value);
    this.render('brandproductsheader',{to:'header', data:productlist});
    this.render('showBrandproducts', {data:productlist});
});

Router.route('/products/:_id', function () {
    Meteor.subscribe("products");
    var product = Products.findOne({_id:this.params._id});
    Session.set("productId",this.params._id);
    this.render('homeheader',{to:'header', data:product});
    this.render('productInfo', {data:product});
});
