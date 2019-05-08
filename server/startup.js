Meteor.startup(function(){
	if (Meteor.users.find().count() == 0){
		Accounts.createUser({
	        username: 'admin',
	        //email: 'email',
	        password: '123456',
	        profile: {
	            first_name: 'Zhou',
	            last_name: 'Ou',
	            gender : "f",
				country : "us",
	        }
	    });
};

	console.log("startup.js says: "+Meteor.users.findOne().username + " had been created");
})
