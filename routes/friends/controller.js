const ServerError = require('../../utils/ServerError');
const config = require('../../config');

exports.getUsernameFromEmail = async (User, email) => {
  try {
    const user = await User.findOne({ where: { email: email } });
    if(!user){
      throw new Error('User not found!');
    }
    const username = user.get('username');
    return username;
  } catch(err) {
    throw new ServerError(400, err.message);
  }
};

exports.sendFriendRequest = async (User, FriendRequest, senderId, receiverEmail) =>{
  try{
    const sender = await User.findOne({ where: { uid: senderId } });
    if(!sender){
      throw new Error('Sender not found!');
    }
    const receiver = await User.findOne({ where: { email: receiverEmail } });
    if(!receiver){
      throw new Error('Receiver not found!');
    }
    const senderUsername = sender.get('username');
    const receiverUsername = receiver.get('username');
    const receiverId = receiver.get('uid');
    if(senderId === receiverId) {
      throw new Error('You cannot send friend request to yourself!');
    }
    const raw = await FriendRequest.create({
      senderId,
      senderUsername,
      receiverId,
      receiverUsername
    });
    const result = raw.get({ plain: true });
    return result;
  } catch(err) {
    throw new ServerError(400, err.message);
  }
};

exports.updateFriendRequest = async (FriendRequest, friendRequestId, status) =>{
  try{
    const record = await FriendRequest.findOne({ where: { friendRequestId } });
    if(!record){
      throw new Error('Record not found!');
    }
    const raw = await record.updateAttributes({ status });
    const result = raw.get({ plain: true });
    return result;
  } catch(err) {
    console.log(err);
    throw new ServerError(400, err.message);
  }
};

exports.listFriendRequest = async (User, FriendRequest, receiverId) =>{
  try{
    console.log(receiverId);
    const receiver = await User.findOne({ where: { uid: receiverId } });
    if(!receiver){
      throw new Error('User not found!');
    }
    const records = await FriendRequest.findAll({ where: { receiverId } });
    return records;
  } catch(err) {
    console.log(err);
    throw new ServerError(400, err.message);
  }
};
