// the messages publicaction now takes a parameter
// so we can limit the set of messages
// that get sent to the client in one go.
// Meteor.publish('messages.filtered',function (chatroomId) {
//     if (this.userId){
//     	return Messages.find({});
        // HERE is another place for you to edit
        // put in a line that finds
        // and returns all messages that have chatroomId
        // equal to the chatroomId sent into this function
//     }
// });


Meteor.publish("tables", function(){
    if (this.userId){
        return Tables.find();
    }
});

Meteor.publish("wishlists", function(){
    if (this.userId){
        return Wishlists.find();
    }
});

Meteor.publish("products", function(){
    if (this.userId){
        return Products.find();
    }
});
