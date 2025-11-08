const router = require("express").Router();
const authUser = require("@middleware/authUser");
const inboxController = require("@controller/inbox");


router.post("/add-message", authUser, inboxController.addMessage);
router.get("/get-conversations", authUser, inboxController.getConversations);
router.get("/get-messages", authUser, inboxController.getMessages);


module.exports = router;
