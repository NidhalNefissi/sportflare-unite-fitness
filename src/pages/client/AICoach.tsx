
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { Star, TrendingUp, Target, Zap, Apple, Dumbbell } from 'lucide-react';

interface UserGoals {
  primaryGoal: 'weight_loss' | 'muscle_gain' | 'strength' | 'endurance' | 'flexibility' | '';
  currentWeight: number;
  targetWeight: number;
  height: number;
  age: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very_active' | 'extremely_active' | '';
  fitnessExperience: 'beginner' | 'intermediate' | 'advanced' | '';
}

interface AIRecommendation {
  type: 'workout' | 'nutrition' | 'program';
  title: string;
  description: string;
  details: string[];
  icon: React.ReactNode;
  link?: string;
}

const ClientAICoach = () => {
  const [userGoals, setUserGoals] = useState<UserGoals>({
    primaryGoal: '',
    currentWeight: 0,
    targetWeight: 0,
    height: 0,
    age: 0,
    activityLevel: '',
    fitnessExperience: ''
  });

  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasRecommendations, setHasRecommendations] = useState(false);

  const calculateBMI = () => {
    if (userGoals.height && userGoals.currentWeight) {
      const heightInMeters = userGoals.height / 100;
      return (userGoals.currentWeight / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return '0';
  };

  const generateRecommendations = async () => {
    if (!userGoals.primaryGoal || !userGoals.currentWeight || !userGoals.height || !userGoals.age) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields to get personalized recommendations.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newRecommendations: AIRecommendation[] = [];

    // Workout recommendations based on goal
    if (userGoals.primaryGoal === 'weight_loss') {
      newRecommendations.push({
        type: 'workout',
        title: 'High-Intensity Cardio Plan',
        description: 'Burn maximum calories with targeted HIIT workouts',
        details: [
          '4-5 cardio sessions per week',
          '20-30 minutes HIIT training',
          'Include burpees, mountain climbers, jump squats',
          'Rest 1-2 days between intense sessions'
        ],
        icon: <Zap className="w-5 h-5 text-orange-600" />
      });
    } else if (userGoals.primaryGoal === 'muscle_gain') {
      newRecommendations.push({
        type: 'workout',
        title: 'Strength & Hypertrophy Program',
        description: 'Build lean muscle mass with progressive overload',
        details: [
          '4-5 strength training sessions per week',
          'Focus on compound movements',
          '8-12 reps for hypertrophy',
          'Progressive overload each week'
        ],
        icon: <Dumbbell className="w-5 h-5 text-blue-600" />
      });
    }

    // Nutrition recommendations
    const nutritionRecs = {
      weight_loss: {
        title: 'Caloric Deficit Nutrition Plan',
        description: 'Sustainable eating plan for healthy weight loss',
        details: [
          'Eat in a 500-calorie deficit',
          'Prioritize protein (1g per lb body weight)',
          'Include plenty of vegetables and fiber',
          'Stay hydrated with 8-10 glasses of water daily'
        ]
      },
      muscle_gain: {
        title: 'Muscle Building Nutrition Strategy',
        description: 'Fuel your gains with proper nutrition timing',
        details: [
          'Eat in a slight caloric surplus (200-500 calories)',
          'Consume 1.2-1.6g protein per lb body weight',
          'Time carbs around workouts',
          'Include healthy fats for hormone production'
        ]
      }
    };

    const nutritionPlan = nutritionRecs[userGoals.primaryGoal] || nutritionRecs.weight_loss;
    newRecommendations.push({
      type: 'nutrition',
      title: nutritionPlan.title,
      description: nutritionPlan.description,
      details: nutritionPlan.details,
      icon: <Apple className="w-5 h-5 text-green-600" />
    });

    // Program recommendations
    newRecommendations.push({
      type: 'program',
      title: 'Recommended Training Programs',
      description: 'Professional programs tailored to your goals',
      details: [
        'Ultimate Fat Loss - 12 weeks - $89.99',
        'Strength Builder Pro - 16 weeks - $129.99',
        'Beginner Transformation - 8 weeks - $59.99'
      ],
      icon: <Star className="w-5 h-5 text-purple-600" />,
      link: '/client/marketplace'
    });

    setRecommendations(newRecommendations);
    setHasRecommendations(true);
    setIsAnalyzing(false);

    toast({
      title: "AI Analysis Complete!",
      description: "Your personalized fitness plan is ready."
    });
  };

  const progressToGoal = userGoals.currentWeight && userGoals.targetWeight 
    ? Math.abs(((userGoals.currentWeight - userGoals.targetWeight) / userGoals.currentWeight) * 100)
    : 0;

  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Star className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold">AI Personal Coach</h1>
          </div>
          <p className="text-purple-100">Get personalized fitness recommendations powered by AI</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Goal Setting Form */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Your Fitness Goals
                </CardTitle>
                <CardDescription>Tell us about yourself to get personalized recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="primaryGoal">Primary Goal</Label>
                  <Select value={userGoals.primaryGoal} onValueChange={(value) => setUserGoals(prev => ({ ...prev, primaryGoal: value as any }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your main goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weight_loss">Weight Loss</SelectItem>
                      <SelectItem value="muscle_gain">Muscle Gain</SelectItem>
                      <SelectItem value="strength">Strength Building</SelectItem>
                      <SelectItem value="endurance">Endurance</SelectItem>
                      <SelectItem value="flexibility">Flexibility</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currentWeight">Current Weight (kg)</Label>
                    <Input
                      id="currentWeight"
                      type="number"
                      value={userGoals.currentWeight || ''}
                      onChange={(e) => setUserGoals(prev => ({ ...prev, currentWeight: parseFloat(e.target.value) || 0 }))}
                      placeholder="70"
                    />
                  </div>
                  <div>
                    <Label htmlFor="targetWeight">Target Weight (kg)</Label>
                    <Input
                      id="targetWeight"
                      type="number"
                      value={userGoals.targetWeight || ''}
                      onChange={(e) => setUserGoals(prev => ({ ...prev, targetWeight: parseFloat(e.target.value) || 0 }))}
                      placeholder="65"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={userGoals.height || ''}
                      onChange={(e) => setUserGoals(prev => ({ ...prev, height: parseFloat(e.target.value) || 0 }))}
                      placeholder="175"
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={userGoals.age || ''}
                      onChange={(e) => setUserGoals(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                      placeholder="28"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="activityLevel">Activity Level</Label>
                  <Select value={userGoals.activityLevel} onValueChange={(value) => setUserGoals(prev => ({ ...prev, activityLevel: value as any }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary (desk job)</SelectItem>
                      <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                      <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                      <SelectItem value="very_active">Very Active (6-7 days/week)</SelectItem>
                      <SelectItem value="extremely_active">Extremely Active (2x/day)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="fitnessExperience">Fitness Experience</Label>
                  <Select value={userGoals.fitnessExperience} onValueChange={(value) => setUserGoals(prev => ({ ...prev, fitnessExperience: value as any }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                      <SelectItem value="advanced">Advanced (3+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* BMI Display */}
                {userGoals.height && userGoals.currentWeight && (
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Current BMI</span>
                      <span className="text-lg font-bold text-blue-600">{calculateBMI()}</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      {parseFloat(calculateBMI()) < 18.5 && 'Underweight'}
                      {parseFloat(calculateBMI()) >= 18.5 && parseFloat(calculateBMI()) < 25 && 'Normal weight'}
                      {parseFloat(calculateBMI()) >= 25 && parseFloat(calculateBMI()) < 30 && 'Overweight'}
                      {parseFloat(calculateBMI()) >= 30 && 'Obese'}
                    </div>
                  </div>
                )}

                <Button 
                  onClick={generateRecommendations} 
                  disabled={isAnalyzing}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Get AI Recommendations'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <div className="lg:col-span-2">
            {!hasRecommendations ? (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">Ready for Your AI Coach?</h3>
                  <p className="text-gray-600 mb-4">
                    Fill in your goals and let our AI create a personalized fitness plan just for you.
                  </p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <p>✓ Personalized workout recommendations</p>
                    <p>✓ Custom nutrition guidance</p>
                    <p>✓ Progress tracking insights</p>
                    <p>✓ Program suggestions from top coaches</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Progress Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Your Progress Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{userGoals.currentWeight}kg</div>
                        <div className="text-sm text-gray-600">Current Weight</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{userGoals.targetWeight}kg</div>
                        <div className="text-sm text-gray-600">Target Weight</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{Math.abs(userGoals.currentWeight - userGoals.targetWeight)}kg</div>
                        <div className="text-sm text-gray-600">To Go</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Recommendations */}
                {recommendations.map((rec, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {rec.icon}
                        {rec.title}
                      </CardTitle>
                      <CardDescription>{rec.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {rec.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-start gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                      {rec.link && (
                        <Button className="mt-4 bg-purple-600 hover:bg-purple-700" size="sm">
                          View Programs
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientAICoach;
