const db = require("../models");

const ToDo = db.todo;
const User = db.user;

exports.addToDo = async (req, res) => {
  const todo = new ToDo({
    taskName: req.body.taskName,
    description: req.body.description,
    isCompleted: req.body.isCompleted,
    dueDate: req.body.dueDate,
  });

  todo.save(async (err, todo) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      const user = await User.findOneAndUpdate(
        { _id: req.docId },
        { $push: { todos: [todo._id] } }
      );

      res
        .status(200)
        .send({ message: "ToDo Added Successfully", todoId: todo._id });
    }
  });
};

exports.editToDo = async (req, res) => {
  const todo = await ToDo.findOneAndUpdate(
    { _id: req.body.todoId },
    {
      $set: {
        taskName: req.body.taskName,
        description: req.body.description,
        isCompleted: req.body.isCompleted,
        dueDate: req.body.dueDate,
      },
    }
  );

  if (!todo) {
    res.status(500).send({ message: "Something went wrong" });
    return;
  }

  res.status(200).send({ message: "Todo Edited Successfully" });
};

exports.getToDos = async (req, res) => {
  const todos = await User.findOne({ _id: req.docId }, "todos -_id").populate(
    "todos",
    "-__v"
  );

  if (!todos) {
    res.status(500).send({ message: "Something went wrong" });
    return;
  }

  res.status(200).send(todos);
};

exports.setTodoStatus = async (req, res) => {
  const todo = await ToDo.findOneAndUpdate(
    { _id: req.body.todoId },
    {
      $set: {
        isCompleted: req.body.isCompleted,
      },
    }
  );

  if (!todo) {
    res.status(500).send({ message: "Something went wrong" });
    return;
  }

  res.status(200).send({ message: "Todo Edited Successfully" });
};

exports.deleteTodo = async (req, res) => {
  const user = await User.findOneAndUpdate(
    { _id: req.docId },
    { $pull: { todos: req.query.todoId } }
  );

  await ToDo.findByIdAndRemove(req.query.todoId);

  if (!user) {
    res.status(500).send({ message: "Something went wrong" });
    return;
  }

  res.status(200).send({ message: "ToDo Deleted" });
};
