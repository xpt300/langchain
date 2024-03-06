import { config } from "dotenv";
config();

import { OpenAI } from "@langchain/openai";
import {
  StructuredOutputParser,
  RegexParser,
  CombiningOutputParser,
} from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";

const answerParser = StructuredOutputParser.fromNamesAndDescriptions({
  answer: "Is there a phone number or address or company name on this question?",
  source: "source used to answer the user's question, should be a phone number, address or company name context.",
});


const chain = RunnableSequence.from([
  PromptTemplate.fromTemplate(
    "Answer the users question as a boolean format.\n{format_instructions}\n{question}"
  ),
  new OpenAI({ temperature: 0 }),
]);

const response = await chain.invoke({
  question: "Hello i'm a bulder and i'm happy to speak with you, Menuiserie Paris",
  format_instructions: answerParser.getFormatInstructions(),
});
