const { isObjectIdOrHexString } = require('mongoose');
const Chat = require('../../models/chat_model');
const User = require('../../models/user_model');
const uploadToCloudinary = require('../../helpers/uploadCloudinary');

// [GET] /chat
module.exports.index = async (req, res) => {
  const userId = res.locals.user.id;
  const fullName = res.locals.user.fullName;
  // SocketIO
  _io.once('connection', (socket) => {
    socket.on("CLIENT_SEND_MESSAGE", async (data) => {
      let images = [];
      for(const imageBuffer of data.images) {
        const link = await uploadToCloudinary(imageBuffer);
        images.push(link);
      }

      
      // Luu vao database
      // const chat = new Chat({
      //   user_id: userId,
      //   content: data.content,
      //   images: images
      // })
      // await chat.save();

      // Trả data về cho client
      _io.emit("SERVER_RETURN_MESSAGE", {
        userId: userId,
        fullName: fullName,
        content: data.content,
        images: images
      });
    });

    //Typing
    socket.on("CLIENT_SEND_TYPING", async (type) => {
      socket.broadcast.emit("SERVER_RETURN_TYPING", {
        userId: userId,
        fullName: fullName,
        type: type
      })
    });
    // End Typing
  })
 
  // Lấy data từ database
  const chats = await Chat.find({
    deleted: false
  });

  for (const chat of chats) {
    const infoUser = await User.findOne({
      _id: chat.user_id
    }).select('fullName');
    chat.infoUser = infoUser
  }
  // Hết lấy data từ database
  console.log(chats);

  res.render('client/pages/chat/index', {
    pageTitle: "Chat",
    chats: chats
  })
}