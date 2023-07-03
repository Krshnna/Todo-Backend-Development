const todo = require("../models/todo");
const Todo = require("../models/todo");
const User = require("../models/user");

exports.createTodo = async (req, res) => {
    try {
        const createTodo = {
            title: req.body.title,
            description: req.body.description,
            author: req.user._id
        }

        const todo = new Todo(createTodo);
        const user = await User.findById(req.user._id);
        user.todos.push(todo._id);
        await user.save();
        await todo.save();

        res.status(500).json({
            success: true,
            message: "Working added successfully. Good luck!!"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (todo.author.toString() !== req.user._id.toString()) {
            return res.status(401).send("Unauthorized access denied.");
        }
        const user = await User.findById(req.user._id);
        const idx = user.todos.indexOf(req.params.id);
        user.todos.splice(idx, 1);
        await todo.deleteOne();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Todo Deleted successfully"
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

exports.updateTodo = async (req, res) => {
    try {

        const { title, description } = req.body;
        const todo = await Todo.findById(req.params.id);

        if (todo.author.toString() !== req.user._id.toString()) {
            return res.status.json({
                success: false,
                message: "Login required to delete todo"
            })
        }
        todo.title = title
        todo.description = description;
        await todo.save();

        res.status(200).json({
            success: true,
            message: "Todo Updated Successfully"
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getTodo = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const todo = await Todo.find({
            author: {
                $in: user,
            }
        })
        res.status(200).json({
            success: true,
            todos: todo
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};