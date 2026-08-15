import { getModelToken } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import { ConflictException, ForbiddenException } from "@nestjs/common";
import { Types } from "mongoose";
import { QuestionService } from "./question.service";
import { Question } from "./question.schema";
import { Answer } from "../answer/answer.schema";
import { Tag } from "../tag/tag.schema";
import { TagService } from "../tag/tag.service";

describe("QuestionService", () => {
  let service: QuestionService;
  let questionModel: { findById: jest.Mock };

  beforeEach(async () => {
    questionModel = { findById: jest.fn() };

    const moduleRef = await Test.createTestingModule({
      providers: [
        QuestionService,
        { provide: getModelToken(Question.name), useValue: questionModel },
        { provide: getModelToken(Answer.name), useValue: {} },
        { provide: getModelToken(Tag.name), useValue: {} },
        { provide: TagService, useValue: { ensureAllExist: jest.fn().mockResolvedValue(undefined) } },
      ],
    }).compile();

    service = moduleRef.get(QuestionService);
  });

  describe("vote", () => {
    it("rechaza un segundo voto del mismo usuario", async () => {
      const userId = new Types.ObjectId().toString();
      questionModel.findById.mockResolvedValue({
        votes: [{ userId: { toString: () => userId }, vote: 1 }],
      });

      await expect(service.vote("q1", userId, 1)).rejects.toThrow(ConflictException);
    });
  });

  describe("update (ownership)", () => {
    it("rechaza editar la pregunta de otro usuario", async () => {
      const ownerId = new Types.ObjectId().toString();
      const otherId = new Types.ObjectId().toString();
      questionModel.findById.mockResolvedValue({
        user: { toString: () => ownerId },
      });

      await expect(service.update("q1", { title: "nuevo" }, otherId)).rejects.toThrow(ForbiddenException);
    });
  });
});
