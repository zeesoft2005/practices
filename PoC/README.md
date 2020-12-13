# Exam Software

## Object Model
This is an attempt to develop front-end layer of an **Exam** taking software; which, after an authenticated user login, would resume an **ExamSession** comprising predefined set of **ExamQuestions**.
The **ExamSession** is conducted through multiple records of **ExamSessionDetail** per an **ExamQuestion** attempt by the candidate, where an **ExamQuestion** could be of any predefined **QuestionType** (e.g. `MCQ`,
`ATA`, `Text`, etc). Each **ExamQuestion** consists of **QuestionOption**(s) of **OptionType** (e.g. text, drawing/image, etc)  
