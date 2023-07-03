const express = require("express");
const { createTodo, deleteTodo, updateTodo, getTodo } = require("../controllers/todo");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.route("/todo").post(isAuthenticated, createTodo);
router.route("/delete/todo/:id").delete(isAuthenticated, deleteTodo);
router.route("/update/todo/:id").put(isAuthenticated, updateTodo);
router.route("/getTodos").get(isAuthenticated, getTodo);
module.exports = router;