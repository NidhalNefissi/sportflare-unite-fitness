
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSubscriptionAccess } from '@/hooks/useSubscriptionAccess';
import { Brain, Target, Zap, Apple, Dumbbell, TrendingUp, Lock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface UserMetrics {
  age: number;
  weight: number;
  height: number;
  gender: 'male' | 'female' | 'other';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  goal: 'weight_loss' | 'muscle_gain' | 'maintenance' | 'endurance';
}

interface AIRecommendation {
  bmi: number;
  bmr: number;
  dailyCalories: number;
  workoutPlan: string[];
  nutritionPlan: string[];
  classRecommendations: string[];
  gymRecommendations: string[];
}

const AICoach = () => {
  const { canAccessAICoach } = useSubscriptionAccess();
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<UserMetrics>({
    age: 25,
    weight: 70,
    height: 170,
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'maintenance'
  });
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!canAccessAICoach()) {
    return (
      <DashboardLayout role="client">
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="max-w-md mx-auto text-center">
            <CardHeader>
              <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <CardTitle>AI Coach Access Required</CardTitle>
              <CardDescription>
                Upgrade to Plus or Premium to access personalized AI coaching features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => navigate('/client/subscriptions')}
              >
                View Subscription Plans
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  const generateRecommendations = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Calculate BMI and BMR (mock AI calculations)
    const bmi = metrics.weight / ((metrics.height / 100) ** 2);
    const bmr = metrics.gender === 'male' 
      ? 88.362 + (13.397 * metrics.weight) + (4.799 * metrics.height) - (5.677 * metrics.age)
      : 447.593 + (9.247 * metrics.weight) + (3.098 * metrics.height) - (4.330 * metrics.age);
    
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };
    
    const dailyCalories = bmr * activityMultipliers[metrics.activityLevel];
    
    // Generate personalized recommendations
    const workoutPlans = {
      weight_loss: [
        "30 minutes cardio (HIIT) 4x/week",
        "Full body strength training 3x/week",
        "Active recovery walks on rest days",
        "Core strengthening 15 mins daily"
      ],
      muscle_gain: [
        "Progressive overload strength training 5x/week",
        "20 minutes cardio 2x/week",
        "Focus on compound movements",
        "Rest 48 hours between muscle groups"
      ],
      maintenance: [
        "Balanced cardio and strength 4x/week",
        "Flexibility and mobility work daily",
        "Recreational sports 1-2x/week",
        "Consistent daily movement"
      ],
      endurance: [
        "Long cardio sessions 3x/week",
        "Interval training 2x/week",
        "Light strength training 2x/week",
        "Cross-training activities"
      ]
    };
    
    const nutritionPlans = {
      weight_loss: [
        `Target: ${Math.round(dailyCalories - 500)} calories/day`,
        "High protein (1.6g per kg body weight)",
        "Complex carbs pre-workout",
        "Healthy fats: 25-30% of calories",
        "Hydration: 35ml per kg body weight"
      ],
      muscle_gain: [
        `Target: ${Math.round(dailyCalories + 300)} calories/day`,
        "High protein (2g per kg body weight)",
        "Carbs around workouts",
        "Healthy fats for hormone production",
        "Post-workout protein within 30 mins"
      ],
      maintenance: [
        `Target: ${Math.round(dailyCalories)} calories/day`,
        "Balanced macronutrients",
        "Whole foods focus",
        "Regular meal timing",
        "Adequate hydration"
      ],
      endurance: [
        `Target: ${Math.round(dailyCalories + 200)} calories/day`,
        "Higher carbohydrate intake",
        "Electrolyte balance",
        "Pre/during/post workout nutrition",
        "Anti-inflammatory foods"
      ]
    };
    
    const classRecs = {
      weight_loss: ["HIIT Classes", "Zumba", "Spin Classes", "Boot Camp"],
      muscle_gain: ["Strength Training", "CrossFit", "Bodybuilding", "Powerlifting"],
      maintenance: ["Yoga", "Pilates", "Group Fitness", "Swimming"],
      endurance: ["Running Club", "Cycling", "Triathlon Training", "Cardio Classes"]
    };
    
    const gymRecs = {
      weight_loss: ["24/7 Fitness Centers", "Budget-friendly gyms with cardio equipment"],
      muscle_gain: ["Powerlifting gyms", "Bodybuilding-focused facilities"],
      maintenance: ["Community centers", "Full-service fitness clubs"],
      endurance: ["Gyms with pools", "Outdoor fitness facilities"]
    };
    
    setRecommendation({
      bmi: Math.round(bmi * 10) / 10,
      bmr: Math.round(bmr),
      dailyCalories: Math.round(dailyCalories),
      workoutPlan: workoutPlans[metrics.goal],
      nutritionPlan: nutritionPlans[metrics.goal],
      classRecommendations: classRecs[metrics.goal],
      gymRecommendations: gymRecs[metrics.goal]
    });
    
    setIsGenerating(false);
    
    toast({
      title: "AI Analysis Complete!",
      description: "Your personalized fitness plan is ready.",
    });
  };

  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <Brain className="w-8 h-8" />
            AI Fitness Coach
          </h1>
          <p className="text-purple-100">Get personalized workout and nutrition recommendations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Your Current Metrics
              </CardTitle>
              <CardDescription>
                Enter your details to get personalized recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={metrics.age}
                    onChange={(e) => setMetrics(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                    min="16"
                    max="100"
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={metrics.gender} onValueChange={(value) => setMetrics(prev => ({ ...prev, gender: value as any }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={metrics.weight}
                    onChange={(e) => setMetrics(prev => ({ ...prev, weight: parseFloat(e.target.value) }))}
                    min="30"
                    max="300"
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={metrics.height}
                    onChange={(e) => setMetrics(prev => ({ ...prev, height: parseInt(e.target.value) }))}
                    min="120"
                    max="250"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="activity">Activity Level</Label>
                <Select value={metrics.activityLevel} onValueChange={(value) => setMetrics(prev => ({ ...prev, activityLevel: value as any }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (desk job, no exercise)</SelectItem>
                    <SelectItem value="light">Light (light exercise 1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (exercise 3-5 days/week)</SelectItem>
                    <SelectItem value="active">Active (exercise 6-7 days/week)</SelectItem>
                    <SelectItem value="very_active">Very Active (2x/day or intense exercise)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="goal">Primary Goal</Label>
                <Select value={metrics.goal} onValueChange={(value) => setMetrics(prev => ({ ...prev, goal: value as any }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight_loss">Weight Loss</SelectItem>
                    <SelectItem value="muscle_gain">Muscle Gain</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="endurance">Endurance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={generateRecommendations}
                disabled={isGenerating}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {isGenerating ? (
                  <>
                    <Brain className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Generate AI Recommendations
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          {recommendation && (
            <div className="space-y-6">
              {/* Body Composition */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Body Composition Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{recommendation.bmi}</div>
                      <div className="text-sm text-gray-600">BMI</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{recommendation.bmr}</div>
                      <div className="text-sm text-gray-600">BMR (cal/day)</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">{recommendation.dailyCalories}</div>
                      <div className="text-sm text-gray-600">Daily Calories</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Workout Plan */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Dumbbell className="w-5 h-5" />
                    Workout Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {recommendation.workoutPlan.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Nutrition Plan */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Apple className="w-5 h-5" />
                    Nutrition Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {recommendation.nutritionPlan.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Classes & Gyms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Best Classes for You:</h4>
                    <div className="flex flex-wrap gap-2">
                      {recommendation.classRecommendations.map((cls, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {cls}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Recommended Gym Types:</h4>
                    <div className="flex flex-wrap gap-2">
                      {recommendation.gymRecommendations.map((gym, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {gym}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AICoach;
