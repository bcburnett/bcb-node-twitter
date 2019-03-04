

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

id:{
  type:String,
  required: false
},
post_id:{
  type:String,
  required: false
},
user_id:{
  type:String,
  required: false
},
recipient_id:{
  type:String,
  required: false
},
postText:{
  type:String,
  required: false
},
page_id:{
  type:String,
  required: false
},
group_id:{
  type:String,
  required: false
},
event_id:{
  type:String,
  required: false
},
page_event_id:{
  type:String,
  required: false
},
postLink:{
  type:String,
  required: false
},
postLinkTitle:{
  type:String,
  required: false
},
postLinkImage:{
  type:String,
  required: false
},
postLinkContent:{
  type:String,
  required: false
},
postVimeo:{
  type:String,
  required: false
},
postDailymotion:{
  type:String,
  required: false
},
postFacebook:{
  type:String,
  required: false
},
postFile:{
  type:String,
  required: false
},
postFileName:{
  type:String,
  required: false
},
postFileThumb:{
  type:String,
  required: false
},
postYoutube:{
  type:String,
  required: false
},
postVine:{
  type:String,
  required: false
},
postSoundCloud:{
  type:String,
  required: false
},
postPlaytube:{
  type:String,
  required: false
},
postMap:{
  type:String,
  required: false
},
postShare:{
  type:String,
  required: false
},
postPrivacy:{
  type:String,
  required: false
},
postType:{
  type:String,
  required: false
},
postFeeling:{
  type:String,
  required: false
},
postListening:{
  type:String,
  required: false
},
postTraveling:{
  type:String,
  required: false
},
postWatching:{
  type:String,
  required: false
},
postPlaying:{
  type:String,
  required: false
},
postPhoto:{
  type:String,
  required: false
},
time:{
  type:String,
  required: false
},
code_livestream:{
  type:String,
  required: false
},
registered:{
  type:String,
  required: false
},
album_name:{
  type:String,
  required: false
},
multi_image:{
  type:String,
  required: false
},
boosted:{
  type:String,
  required: false
},
product_id:{
  type:String,
  required: false
},
poll_id:{
  type:String,
  required: false
},
blog_id:{
  type:String,
  required: false
},
videoViews:{
  type:String,
  required: false
},
postRecord:{
  type:String,
  required: false
},
postSticker:{
  type:String,
  required: false
},
shared_from:{
  type:String,
  required: false
},
post_url:{
  type:String,
  required: false
},
parent_id:{
  type:String,
  required: false
},
cache:{
  type:String,
  required: false
},
comments_status:{
  type:String,
  required: false
},
shares:{
  type:String,
  required: false
},
origin_id:{
  type:String,
  required: false
},
views:{
  type:String,
  required: false
},
newviews:{
  type:String,
  required: false
},
sense:{
  type:String,
  required: false
}
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
