import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { useAuth } from '@/context/AuthContext';
import { listQuestions, passThreshold, submitAssessment } from '@/services/academyService';
import { getManagedCourse } from '@/services/courseService';
import type { AssessmentQuestion } from '@/types/lms';

export const AssessmentQuizPage: React.FC = () => {
  const { id = 'crs-101' } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState('Academy Assessment');

  useEffect(() => {
    try {
      setQuestions(listQuestions(id, user));
      const course = getManagedCourse(id, user);
      if (course) setTitle(course.title);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load assessment.');
    }
  }, [id, user]);

  const current = questions[index];
  const selected = current ? answers[current.id] : undefined;

  const handleSubmit = () => {
    if (!user || !current) return;
    if (index < questions.length - 1) {
      setIndex((n) => n + 1);
      return;
    }
    setSubmitting(true);
    try {
      const result = submitAssessment(
        { userId: user.id, userName: user.name, courseId: id, answers },
        user
      );
      if (result.certificate) {
        navigate(`/academy/certificate/${result.certificate.id}`);
      } else {
        setError(`Score ${result.attempt.scorePercent}% — ${passThreshold()}% required. Review the modules and retry.`);
        setIndex(0);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submit failed.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!current) {
    return (
      <Card variant="glass" className="p-10 text-center space-y-3">
        <p className="text-sm text-slate-400">{error || 'No assessment is configured for this course.'}</p>
        <Link to="/academy/learn/crypto-security-101" className="text-primary text-xs font-mono">
          Return to Academy
        </Link>
      </Card>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      <div className="flex items-center justify-between">
        <Link to={`/academy/learn/${id}`} className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1">
          <Icon name="arrow_back" size={16} /> Exit Assessment
        </Link>
        <Badge variant="primary" size="md">
          FINAL ASSESSMENT • QUESTION {index + 1} OF {questions.length}
        </Badge>
      </div>

      {error && <div className="text-xs font-mono text-error bg-error/10 border border-error/40 rounded px-3 py-2">{error}</div>}

      <Card variant="fresnel" className="p-8 space-y-6">
        <div className="space-y-3">
          <p className="text-[11px] font-mono text-slate-500">{title}</p>
          <h2 className="font-display font-bold text-xl text-white">{current.prompt}</h2>
          {current.codeSnippet && (
            <div className="p-4 bg-[#060e20] border border-outline rounded font-mono text-xs text-slate-200 overflow-x-auto cyber-scrollbar">
              <pre>{current.codeSnippet}</pre>
            </div>
          )}
        </div>

        <div className="space-y-3 pt-2">
          {current.options.map((opt, optIndex) => (
            <div
              key={opt.id}
              onClick={() => setAnswers((prev) => ({ ...prev, [current.id]: opt.id }))}
              className={`p-4 rounded border transition-all cursor-pointer flex items-center gap-3 font-sans text-xs sm:text-sm ${
                selected === opt.id
                  ? 'bg-primary/15 border-primary text-white shadow-[0_0_15px_rgba(0,218,243,0.25)]'
                  : 'bg-[#060e20] border-outline/70 text-slate-300 hover:border-slate-500'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center font-mono text-[10px] shrink-0 ${
                  selected === opt.id ? 'border-primary bg-primary text-[#00363d] font-bold' : 'border-slate-500 text-slate-400'
                }`}
              >
                {String.fromCharCode(65 + optIndex)}
              </div>
              <span className="leading-relaxed">{opt.text}</span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-outline/50 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">Score Requirement: {passThreshold()}% to graduate</span>
          <div className="flex gap-2">
            {index > 0 && (
              <Button variant="outline" onClick={() => setIndex((n) => n - 1)}>
                Back
              </Button>
            )}
            <Button size="lg" onClick={handleSubmit} disabled={!selected} loading={submitting} iconRight="arrow_forward">
              {index === questions.length - 1 ? 'Submit Assessment' : 'Next Question'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
