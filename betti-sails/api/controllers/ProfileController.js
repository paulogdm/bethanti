/**
 * ProfileController
 */

module.exports = {
	getfullprofile: function (req, res) {
		
		var login = req.param('login');
		var requester = req.cookies.token;

		ProfileService.getProfile(login, requester, function(err, user){
			if(err || !user){
				res.json({sucess: false});
			} else {
				user.uname.trim();
				res.json(user);
			}
		});
	},

	getnameandphoto: function (req, res) {
		
		var login = req.param('login');

		ProfileService.getNameAndPhoto(login, function(err, user){
			if(err || !user){
				res.json({sucess: false});
			} else {
				user.uname.trim();
				res.json(user);
			}
		});
	},

	getfollowlist: function (req, res) {
		
		var login = req.param('login');
		var requester = req.cookies.token;

		FollowService.getFollowList(login, requester, function(err, list){
			if(err || !list){
				res.json({sucess: false});
			} else {
				res.json(list);
			}
		});
	},

	getposts: function(req, res){

		var login = req.param('login');
		var requester = req.cookies.token;

		PostService.getAllPosts(login, requester, function(err, list){
			if(err || !list){
				res.json({sucess: false});
			} else {
				res.json(list);
			}
		});
	} 
};