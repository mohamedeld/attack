'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

type QuestionType = {
  questionText: string;
  options: string[];
  correctAnswer: string;
};

function Question({ questions }: { questions: QuestionType[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(questions?.length).fill(null));
  const [lockedIndexes, setLockedIndexes] = useState<Set<number>>(new Set());
  const [showResult, setShowResult] = useState(false);
    const router = useRouter();
  const currentQuestion = questions[currentIndex];
  const selectedAnswer = answers[currentIndex];

  function handleOptionSelect(option: string) {
    if (lockedIndexes.has(currentIndex)) return; // prevent changing locked answers
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = option;
    setAnswers(updatedAnswers);
  }

  function handleNext() {
    if (selectedAnswer == null) return;

    const newLocked = new Set(lockedIndexes);
    newLocked.add(currentIndex);
    setLockedIndexes(newLocked);

    if (currentIndex < questions?.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
    }
  }

  useEffect(() => {
    if (!showResult) return;
     const timeout = setTimeout(() => {
            router.push('/feedback');
          }, 3000);
    return () => clearTimeout(timeout);
  }, [showResult,router]);

  function calculateScore() {
    let score = 0;
    questions?.forEach((q, i) => {
      if (q.correctAnswer === answers[i]) score++;
    });
    return score;
  }

  return showResult ? (
    <Card className="max-w-xl mx-auto mt-10 p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Your Score</h2>
      <p className="text-lg">{calculateScore()} out of {questions?.length}</p>
    </Card>
  ) : (
    <Card className="max-w-xl mx-auto mt-10 p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">{currentQuestion?.questionText}</h2>
        <CardContent className="space-y-2">
          {currentQuestion?.options?.map((opt: string) => (
            <Button
              key={opt}
              onClick={() => handleOptionSelect(opt)}
              className={`w-full justify-start ${
                selectedAnswer === opt ? 'bg-blue-500 text-white' : ''
              }`}
              variant="outline"
              disabled={lockedIndexes?.has(currentIndex)}
            >
              {opt}
            </Button>
          ))}
        </CardContent>
      </div>
      <div className="flex justify-between">
        <Button disabled className="opacity-50">Previous</Button>
        <Button
          onClick={handleNext}
          disabled={selectedAnswer === null}
        >
          {currentIndex === questions?.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
    </Card>
  );
}

export default Question;
