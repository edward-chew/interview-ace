import express, { Request, Response } from "express";
import Question from "../models/question.model";

const router = express.Router();

router.route("/").get((req: Request, res: Response) => {
  Question.find()
    .then((q) => res.json(q))
    .catch((err) => res.status(400).json(err));
});

router.route("/:id").get((req: Request, res: Response) => {
  Question.findById(req.params.id)
    .then((q) => res.json(q))
    .catch((err) => res.status(400).json(err));
});

router.route("/add").put((req: Request, res: Response) => {
  const number = req.body.number;
  const title = req.body.title;
  const difficulty = req.body.difficulty;
  const type = req.body.type;
  const field = req.body.field;
  const prompt = req.body.prompt;

  const newQuestion = new Question({
    number: number,
    title: title,
    difficulty: difficulty,
    type: type,
    field: field,
    prompt: prompt,
  });

  newQuestion
    .save()
    .then(() => res.json("Question added"))
    .catch((err) => res.status(400).json(err));
});

router.route("/update/:id").post((req: Request, res: Response) => {
  Question.findById(req.params.id)
    .then((q) => {
      if (!q) {
        console.error("Question not found");
        return;
      }

      q.number = req.body.number;
      q.title = req.body.title;
      q.difficulty = req.body.difficulty;
      q.type = req.body.type;
      q.field = req.body.field;
      q.prompt = req.body.prompt;

      q.save()
        .then(() => res.json("Question updated"))
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
