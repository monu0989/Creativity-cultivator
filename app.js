import React, { useState, useEffect } from 'react';
import { Brain, Lightbulb, Target, Trophy, ChevronRight, Star, Clock, Users, Palette, Zap, RefreshCw, CheckCircle } from 'lucide-react';

const CreativityCultivator = () => {
  const [currentModule, setCurrentModule] = useState('dashboard');
  const [userProgress, setUserProgress] = useState({
    level: 1,
    totalPoints: 0,
    completedExercises: [],
    streak: 0,
    lastActivity: null
  });
  const [currentExercise, setCurrentExercise] = useState(null);
  const [exerciseResponse, setExerciseResponse] = useState('');
  const [showResults, setShowResults] = useState(false);

  const creativityExercises = {
    divergent: [
      {
        id: 'unusual-uses',
        title: 'Unusual Uses Challenge',
        description: 'List 10 creative uses for a common object',
        prompt: 'How many creative ways can you use a paperclip? Think beyond the obvious!',
        type: 'list',
        points: 10
      },
      {
        id: 'word-association',
        title: 'Word Association Web',
        description: 'Create connections between unrelated words',
        prompt: 'Connect these words: OCEAN, KEYBOARD, BUTTERFLY. Write a short story or explanation linking them.',
        type: 'text',
        points: 15
      },
      {
        id: 'impossible-inventions',
        title: 'Impossible Inventions',
        description: 'Design something that solves an impossible problem',
        prompt: 'Invent a device that can make time go backwards. Describe how it works and what it looks like.',
        type: 'text',
        points: 20
      }
    ],
    storytelling: [
      {
        id: 'random-story',
        title: 'Random Story Generator',
        description: 'Create a story using random elements',
        prompt: 'Write a story that includes: a purple umbrella, a talking cat, and a mysterious door. You have 5 minutes!',
        type: 'text',
        points: 25
      },
      {
        id: 'perspective-shift',
        title: 'Perspective Shift',
        description: 'Tell a familiar story from an unusual viewpoint',
        prompt: 'Retell the story of Goldilocks and the Three Bears from the perspective of the porridge.',
        type: 'text',
        points: 20
      }
    ],
    visual: [
      {
        id: 'doodle-meaning',
        title: 'Meaningful Doodles',
        description: 'Turn random shapes into meaningful art',
        prompt: 'Imagine you drew three circles, a triangle, and a wavy line. Describe what this could represent or what story it tells.',
        type: 'text',
        points: 15
      },
      {
        id: 'color-emotions',
        title: 'Color Emotions',
        description: 'Express feelings through color combinations',
        prompt: 'If happiness was a color combination, what would it be? Describe your choice and why these colors represent joy to you.',
        type: 'text',
        points: 10
      }
    ],
    problem: [
      {
        id: 'reverse-problem',
        title: 'Reverse Problem Solving',
        description: 'Start with a solution and work backwards',
        prompt: 'The solution is "a mirror in every classroom." What problems could this solve? List at least 5 different problems.',
        type: 'list',
        points: 15
      },
      {
        id: 'constraint-creativity',
        title: 'Creative Constraints',
        description: 'Solve problems with unusual limitations',
        prompt: 'Design a birthday party that can only use things that are blue. What would you include?',
        type: 'text',
        points: 20
      }
    ]
  };

  const creativityTips = [
    "Take breaks - your brain needs rest to make creative connections",
    "Carry a notebook - inspiration strikes at unexpected moments",
    "Try new experiences - novel situations spark creative thinking",
    "Ask 'What if?' questions about everyday situations",
    "Collaborate with others - different perspectives enhance creativity",
    "Embrace mistakes - they often lead to unexpected discoveries",
    "Practice daily - creativity is a muscle that grows with exercise"
  ];

  const getAllExercises = () => {
    return Object.values(creativityExercises).flat();
  };

  const startRandomExercise = () => {
    const allExercises = getAllExercises();
    const randomExercise = allExercises[Math.floor(Math.random() * allExercises.length)];
    setCurrentExercise(randomExercise);
    setExerciseResponse('');
    setShowResults(false);
    setCurrentModule('exercise');
  };

  const completeExercise = () => {
    if (!exerciseResponse.trim()) return;
    
    const newProgress = {
      ...userProgress,
      totalPoints: userProgress.totalPoints + currentExercise.points,
      completedExercises: [...userProgress.completedExercises, currentExercise.id],
      streak: userProgress.streak + 1,
      lastActivity: new Date().toLocaleDateString()
    };
    
    // Level up every 100 points
    newProgress.level = Math.floor(newProgress.totalPoints / 100) + 1;
    
    setUserProgress(newProgress);
    setShowResults(true);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Creativity Cultivator</h1>
        <p className="text-gray-600">Develop your creative thinking through guided exercises</p>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Level</p>
              <p className="text-2xl font-bold">{userProgress.level}</p>
            </div>
            <Trophy className="w-8 h-8" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Points</p>
              <p className="text-2xl font-bold">{userProgress.totalPoints}</p>
            </div>
            <Star className="w-8 h-8" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Completed</p>
              <p className="text-2xl font-bold">{userProgress.completedExercises.length}</p>
            </div>
            <CheckCircle className="w-8 h-8" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Streak</p>
              <p className="text-2xl font-bold">{userProgress.streak}</p>
            </div>
            <Zap className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Quick Start */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-yellow-500" />
          Quick Start
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={startRandomExercise}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-between"
          >
            <span className="font-semibold">Random Exercise</span>
            <RefreshCw className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentModule('exercises')}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 flex items-center justify-between"
          >
            <span className="font-semibold">Browse Exercises</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Daily Tip */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-2 text-indigo-800">💡 Daily Creativity Tip</h3>
        <p className="text-indigo-700">{creativityTips[Math.floor(Math.random() * creativityTips.length)]}</p>
      </div>
    </div>
  );

  const renderExercises = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Exercise Categories</h2>
        <button
          onClick={() => setCurrentModule('dashboard')}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(creativityExercises).map(([category, exercises]) => (
          <div key={category} className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 capitalize flex items-center">
              {category === 'divergent' && <Brain className="w-5 h-5 mr-2 text-purple-500" />}
              {category === 'storytelling' && <Users className="w-5 h-5 mr-2 text-blue-500" />}
              {category === 'visual' && <Palette className="w-5 h-5 mr-2 text-green-500" />}
              {category === 'problem' && <Target className="w-5 h-5 mr-2 text-red-500" />}
              {category} Thinking
            </h3>
            <div className="space-y-3">
              {exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => {
                    setCurrentExercise(exercise);
                    setExerciseResponse('');
                    setShowResults(false);
                    setCurrentModule('exercise');
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{exercise.title}</h4>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {exercise.points} pts
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{exercise.description}</p>
                  {userProgress.completedExercises.includes(exercise.id) && (
                    <div className="mt-2 flex items-center text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Completed
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderExercise = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">{currentExercise.title}</h2>
        <button
          onClick={() => setCurrentModule('exercises')}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Back to Exercises
        </button>
      </div>

      {!showResults ? (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                {currentExercise.points} points
              </span>
              <div className="flex items-center text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                <span className="text-sm">5-10 minutes</span>
              </div>
            </div>
            <p className="text-gray-600 mb-6">{currentExercise.description}</p>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Your Challenge:</h3>
              <p className="text-gray-700">{currentExercise.prompt}</p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-lg font-semibold text-gray-700">
              Your Response:
            </label>
            <textarea
              value={exerciseResponse}
              onChange={(e) => setExerciseResponse(e.target.value)}
              placeholder="Let your creativity flow... There are no wrong answers!"
              className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
            <button
              onClick={completeExercise}
              disabled={!exerciseResponse.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Complete Exercise
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Exercise Completed!</h3>
            <p className="text-gray-600">Great work! You've earned {currentExercise.points} creativity points.</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-gray-800 mb-3">Your Response:</h4>
            <p className="text-gray-700 text-left whitespace-pre-wrap">{exerciseResponse}</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={startRandomExercise}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-200"
            >
              Try Another Exercise
            </button>
            <button
              onClick={() => setCurrentModule('dashboard')}
              className="w-full bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        {currentModule === 'dashboard' && renderDashboard()}
        {currentModule === 'exercises' && renderExercises()}
        {currentModule === 'exercise' && renderExercise()}
      </div>
    </div>
  );
};

export default CreativityCultivator;
