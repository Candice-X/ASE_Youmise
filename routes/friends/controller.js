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

exports.sendFriendRequest = async (User, Friendship, FriendRequest, senderId, receiverEmail) =>{
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
      const message = 'You cannot send friend request to yourself!';
      return {message};
    }
    const friendship = await Friendship.findOne({ where: { userId: senderId, friendId: receiverId } })
    if(friendship) {
      throw new Error('You are already friends!');
    }
    const record = await FriendRequest.findOne({ where: { senderId, receiverId , status: 'SENT' } });
    if(record){
      return record.get({ plain: true });
    }
    const raw = await FriendRequest.create({
      senderId,
      senderUsername,
      receiverId,
      receiverUsername,
      status: 'SENT'
    });
    const result = raw.get({ plain: true });
    return result;
  } catch(err) {
    throw new ServerError(400, err.message);
  }
};

exports.addFriendship = async (User, Friendship, userId, friendId) => {
  try {
    const user = await User.findOne({ where: { uid: userId } });
    if(!user){
      throw new Error('User not found!');
    }
    const friend = await User.findOne({ where: { uid: friendId } });
    if(!friend){
      throw new Error('Friend not found!');
    }
    const friendship = await Friendship.create({
      userId,
      friendId
    });
    return friendship;
  } catch(err) {
    throw new ServerError(400, err.message);
  }
};

exports.updateFriendRequest = async (User, Friendship, FriendRequest, friendRequestId, status) =>{
  try{
    const record = await FriendRequest.findOne({ where: { friendRequestId } });
    if(!record){
      throw new Error('Record not found!');
    }
    if( status === 'REJECTED'){
      let result = await FriendRequest.destroy({ where: { friendRequestId }});
      const message = 'You rejected the user\'s friend request!';
      return { message };
    }
    const raw = await record.updateAttributes({ status });
    let result = raw.get({ plain: true });
    const senderId = await raw.get('senderId');
    const receiverId = await raw.get('receiverId');
    const friendship1 = await exports.addFriendship(User, Friendship, senderId, receiverId);
    const friendship2 = await exports.addFriendship(User, Friendship, receiverId, senderId);
    return result;
  } catch(err) {
    console.log(err);
    throw new ServerError(400, err.message);
  }
};

exports.listFriendRequest = async (User, FriendRequest, receiverId) =>{
  try{
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

exports.listFriends = async (User, Friendship, userId) =>{
  try{
    const user = await User.findOne({ where: { uid: userId } });
    if(!user){
      throw new Error('User not found!');
    }
    const friendships = await Friendship.findAll({ where: { userId } });
    // const records = await FriendRequest.findAll({ where: { receiverId } });
    let friends = [];
    for(let i in friendships){
      let friendId = friendships[i].friendId;
      let friend = await User.findOne({ where: { uid: friendId }});
      console.log(friend);
      friends.push(friend);
    }
    return friends;
  } catch(err) {
    console.log(err);
    throw new ServerError(400, err.message);
  }
};

exports.deleteFriends = async (User, Friendship, userId1, userId2) =>{
  try{
    const user = await User.findOne({ where: { uid: userId1 } });
    if(!user){
      throw new Error('User not found!');
    }
    const friend = await User.findOne({ where: { uid: userId2 } });
    if(!friend){
      throw new Error('The friend you want to delete is not found!');
    }
    const friendUsername = friend.get('username');
    const friendship = await Friendship.findOne({ where: { userId: userId1, friendId: userId2 } });
    // const records = await FriendRequest.findAll({ where: { receiverId } });
    if(!friendship){
      throw new console.error('You haven\'t been friends.');
    }

    let result =await Friendship.destroy({ where: { userId: userId1, friendId: userId2 }});
    let result2 =await Friendship.destroy({ where: { userId: userId2, friendId: userId1 }});
    const message = `You have deleted ${friendUsername} as your friend.`;
    return { message };
  } catch(err) {
    console.log(err);
    throw new ServerError(400, err.message);
  }
};
