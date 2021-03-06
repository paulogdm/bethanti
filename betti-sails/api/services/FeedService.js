var usermodel = require('../models/User.js');
var DEF_USER_PHOTO = '/images/views/profile_default.png';

module.exports = {

	fresh: function(requester, cb){

		AuthService.tokendecode(requester, function(data){
			
			if(!data.success){
				return cb(null, {success: false});
			} else {
				requester = data.user.login.trim();
				
				var pgquery = "select post.*, webuser.uphoto, post_reaction.*, "+
				"post.post_id as post_id "+
				"from post "+
				"inner join follow on "+
				"(post.powner = follow.usender or "+
				"post.powner = '"+requester+"') and "+
				"follow.ureceiver = '"+requester+"' "+
				"left outer join post_reaction on "+
				"post.post_id = post_reaction.post_id and "+
				"preader = '"+ requester +"' "+
				"left outer join webuser on "+
				"post.powner = webuser.login "+
				"order by pdate asc;";

				Follow.query(pgquery, function(err, result){
					if(err){
						sails.log.debug("[FeedService.js][fresh] Query error:" + requester);
						sails.log.debug(err);

						return cb(err, {success: false});
					}

					if(result) {
						result = result.rows;
						sails.log.debug(result);

						for(var i = result.length - 1; i >= 0; i--){
							if(!result[i].uphoto){
								result[i].uphoto = DEF_USER_PHOTO;
							}

							if(requester == result[i].powner.trim())
								result[i].editable = true;
							else result[i].editable = false;
						}
					}

					return cb(null, result);
				});
			}
		});
	},

	hot: function(requester, cb){
		
		AuthService.tokendecode(requester, function(data){
			
			if(!data.success){
				return cb(null, {success: false});
			} else {
				requester = data.user.login.trim();
				
				var pgquery = "select * from post left outer "+
				"join post_reaction on "+
				"post.post_id = post_reaction.post_id and "+
				"preader = '"+ requester +"' and "+
				"powner = '"+requester+"';";

				Follow.query(pgquery, function(err, result){
					if(err){
						sails.log.debug("[FeedService.js][hot] Query error:" + requester);
						sails.log.debug(JSON.stringify(result));

						return cb(err, {success: false});
					}

					if(result) {
						result = result.rows;

						for(var i = result.length - 1; i >= 0; i--){
							if(requester == result[i].powner.trim())
								result[i].editable = true;
							else result[i].editable = false;
						}
					}
					
					return cb(null, result);
				});
			}
		});
	}
}
