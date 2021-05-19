const router = require("express").Router();
const { authJwt } = require("../middlewares");
const controller = require("../controllers/toDoController");

router.put("/todos/add", [authJwt.verifyToken], controller.addToDo);

router.get("/todos/get", [authJwt.verifyToken], controller.getToDos);

router.post("/todos/edit", [authJwt.verifyToken], controller.editToDo);

router.delete("/todos/delete", [authJwt.verifyToken], controller.deleteTodo);

router.post(
  "/todos/todostatus",
  [authJwt.verifyToken],
  controller.setTodoStatus
);
module.exports = router;
