const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

first_name:{
  type: String,
  required: true,
  error:e=>{}
},
last_name:{
  type: String,
  required: true,
  error:e=>{}
},
avatar:{
  type: String,
  required: true,
  error:e=>{}
},
cover:{
  type: String,
  required: true,
  error:e=>{}
},
background_image:{
  type: String,
  required: true,
  error:e=>{}
},
background_image_status:{
  type: String,
  required: true,
  error:e=>{}
},
relationship_id:{
  type: String,
  required: true,
  error:e=>{}
},
address:{
  type: String,
  required: true,
  error:e=>{}
},
working:{
  type: String,
  required: true,
  error:e=>{}
},
working_link:{
  type: String,
  required: true,
  error:e=>{}
},
about:{
  type: String,
  required: true,
  error:e=>{}
},
school:{
  type: String,
  required: true,
  error:e=>{}
},
gender:{
  type: String,
  required: true,
  error:e=>{}
},
birthday:{
  type: String,
  required: true,
  error:e=>{}
},
country_id:{
  type: String,
  required: true,
  error:e=>{}
},
website:{
  type: String,
  required: true,
  error:e=>{}
},
facebook:{
  type: String,
  required: true,
  error:e=>{}
},
google:{
  type: String,
  required: true,
  error:e=>{}
},
twitter:{
  type: String,
  required: true,
  error:e=>{}
},
linkedin:{
  type: String,
  required: true,
  error:e=>{}
},
youtube:{
  type: String,
  required: true,
  error:e=>{}
},
vk:{
  type: String,
  required: true,
  error:e=>{}
},
instagram:{
  type: String,
  required: true,
  error:e=>{}
},
language:{
  type: String,
  required: true,
  error:e=>{}
},
email_code:{
  type: String,
  required: true,
  error:e=>{}
},
src:{
  type: String,
  required: true,
  error:e=>{}
},
ip_address:{
  type: String,
  required: true,
  error:e=>{}
},
follow_privacy:{
  type: String,
  required: true,
  error:e=>{}
},
friend_privacy:{
  type: String,
  required: true,
  error:e=>{}
},
post_privacy:{
  type: String,
  required: true,
  error:e=>{}
},
message_privacy:{
  type: String,
  required: true,
  error:e=>{}
},
confirm_followers:{
  type: String,
  required: true,
  error:e=>{}
},
show_activities_privacy:{
  type: String,
  required: true,
  error:e=>{}
},
birth_privacy:{
  type: String,
  required: true,
  error:e=>{}
},
visit_privacy:{
  type: String,
  required: true,
  error:e=>{}
},
verified:{
  type: String,
  required: true,
  error:e=>{}
},
lastseen:{
  type: String,
  required: true,
  error:e=>{}
},
showlastseen:{
  type: String,
  required: true,
  error:e=>{}
},
emailNotification:{
  type: String,
  required: true,
  error:e=>{}
},
e_liked:{
  type: String,
  required: true,
  error:e=>{}
},
e_wondered:{
  type: String,
  required: true,
  error:e=>{}
},
e_shared:{
  type: String,
  required: true,
  error:e=>{}
},
e_followed:{
  type: String,
  required: true,
  error:e=>{}
},
e_commented:{
  type: String,
  required: true,
  error:e=>{}
},
e_visited:{
  type: String,
  required: true,
  error:e=>{}
},
e_liked_page:{
  type: String,
  required: true,
  error:e=>{}
},
e_mentioned:{
  type: String,
  required: true,
  error:e=>{}
},
e_joined_group:{
  type: String,
  required: true,
  error:e=>{}
},
e_accepted:{
  type: String,
  required: true,
  error:e=>{}
},
e_profile_wall_post:{
  type: String,
  required: true,
  error:e=>{}
},
e_sentme_msg:{
  type: String,
  required: true,
  error:e=>{}
},
e_last_notif:{
  type: String,
  required: true,
  error:e=>{}
},
notification_settings:{
  type: String,
  required: true,
  error:e=>{}
},
status:{
  type: String,
  required: true,
  error:e=>{}
},
active:{
  type: String,
  required: true,
  error:e=>{}
},
admin:{
  type: String,
  required: true,
  error:e=>{}
},
type:{
  type: String,
  required: true,
  error:e=>{}
},
registered:{
  type: String,
  required: true,
  error:e=>{}
},
start_up:{
  type: String,
  required: true,
  error:e=>{}
},
start_up_info:{
  type: String,
  required: true,
  error:e=>{}
},
startup_follow:{
  type: String,
  required: true,
  error:e=>{}
},
startup_image:{
  type: String,
  required: true,
  error:e=>{}
},
last_email_sent:{
  type: String,
  required: true,
  error:e=>{}
},
phone_number:{
  type: String,
  required: true,
  error:e=>{}
},
sms_code:{
  type: String,
  required: true,
  error:e=>{}
},
is_pro:{
  type: String,
  required: true,
  error:e=>{}
},
pro_time:{
  type: String,
  required: true,
  error:e=>{}
},
pro_type:{
  type: String,
  required: true,
  error:e=>{}
},
joined:{
  type: String,
  required: true,
  error:e=>{}
},
css_file:{
  type: String,
  required: true,
  error:e=>{}
},
timezone:{
  type: String,
  required: true,
  error:e=>{}
},
referrer:{
  type: String,
  required: true,
  error:e=>{}
},
balance:{
  type: String,
  required: true,
  error:e=>{}
},
paypal_email:{
  type: String,
  required: true,
  error:e=>{}
},
notifications_sound:{
  type: String,
  required: true,
  error:e=>{}
},
order_posts_by:{
  type: String,
  required: true,
  error:e=>{}
},
social_login:{
  type: String,
  required: true,
  error:e=>{}
},
device_id:{
  type: String,
  required: true,
  error:e=>{}
},
web_device_id:{
  type: String,
  required: true,
  error:e=>{}
},
wallet:{
  type: String,
  required: true,
  error:e=>{}
},
lat:{
  type: String,
  required: true,
  error:e=>{}
},
lng:{
  type: String,
  required: true,
  error:e=>{}
},
last_location_update:{
  type: String,
  required: true,
  error:e=>{}
},
share_my_location:{
  type: String,
  required: true,
  error:e=>{}
},
last_data_update:{
  type: String,
  required: true,
  error:e=>{}
},
details:{
  type: String,
  required: true,
  error:e=>{}
},
sidebar_data:{
  type: String,
  required: true,
  error:e=>{}
},
last_avatar_mod:{
  type: String,
  required: true,
  error:e=>{}
},
last_cover_mod:{
  type: String,
  required: true,
  error:e=>{}
},
points:{
  type: String,
  required: true,
  error:e=>{}
},
last_follow_id:{
  type: String,
  required: true,
  error:e=>{}
},
share_my_data:{
  type: String,
  required: true,
  error:e=>{}
},
last_login_data:{
  type: String,
  required: true,
  error:e=>{}
},
two_factor:{
  type: String,
  required: true,
  error:e=>{}
},
vericons:{
  type: String,
  required: true,
  error:e=>{}
},
adi_num_invites:{
  type: String,
  required: true,
  error:e=>{}
},
sense:{
  type: String,
  required: true,
  error:e=>{}
},
camgirl:{
  type: String,
  required: true,
  error:e=>{}
},
subscribed:{
  type: String,
  required: true,
  error:e=>{}
}
})
const User = mongoose.model('User', UserSchema);

module.exports = User;
