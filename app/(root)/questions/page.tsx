import Question from "@/components/Question"


const data = {
  "title": "Python Fundamentals Quiz",
  "questions": [
    {
      "questionText": "Which keyword is used to define a function in Python?",
      "options": ["def", "function", "lambda", "define"],
      "correctAnswer": "def"
    },
    {
      "questionText": "What is the output of: `print(type([]))` in Python?",
      "options": ["<class 'list'>", "<class 'dict'>", "<class 'set'>", "<class 'tuple'>"],
      "correctAnswer": "<class 'list'>"
    },
    {
      "questionText": "Which of the following is used to handle exceptions in Python?",
      "options": ["try-except", "catch-throw", "error-catch", "if-else"],
      "correctAnswer": "try-except"
    },
    {
      "questionText": "Which data type is immutable in Python?",
      "options": ["list", "dict", "set", "tuple"],
      "correctAnswer": "tuple"
    },
    {
      "questionText": "What will be the result of `len('Python')`?",
      "options": ["5", "6", "7", "None"],
      "correctAnswer": "6"
    },
    {
      "questionText": "Which symbol is used to comment a single line in Python?",
      "options": ["//", "#", "/*", "--"],
      "correctAnswer": "#"
    },
    {
      "questionText": "Which built-in function is used to get user input in Python?",
      "options": ["get()", "scan()", "input()", "read()"],
      "correctAnswer": "input()"
    },
    {
      "questionText": "What is the output of `2 ** 3` in Python?",
      "options": ["6", "8", "9", "12"],
      "correctAnswer": "8"
    },
    {
      "questionText": "Which module in Python is used to work with regular expressions?",
      "options": ["regex", "re", "pyregex", "expression"],
      "correctAnswer": "re"
    },
    {
      "questionText": "Which keyword is used to create a class in Python?",
      "options": ["function", "def", "class", "object"],
      "correctAnswer": "class"
    }
  ]
}

const QuestionsPage = () => {
  const questionData = JSON.parse(JSON.stringify(data));
  return (
    <div>
      <Question questions={questionData?.questions}/>
    </div>
  )
}

export default QuestionsPage