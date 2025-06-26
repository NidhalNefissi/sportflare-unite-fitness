
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserRole } from '@/types/user';
import { toast } from '@/hooks/use-toast';
import { UserPlus, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [step, setStep] = useState<'role' | 'details'>('role');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    role: '' as UserRole | '',
    // Coach specific
    coaching_field: '',
    // Gym specific
    gym_name: '',
    location: '',
    // Brand specific
    company_name: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const coachingFields = [
    'Musculation',
    'Cardio',
    'Yoga',
    'Pilates',
    'Arts martiaux',
    'Fitness',
    'CrossFit',
    'Natation',
    'Danse',
    'Nutrition',
    'Préparation physique',
    'Rééducation',
  ];

  const handleRoleSelect = (role: UserRole) => {
    setFormData(prev => ({ ...prev, role }));
    setStep('details');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.name || !formData.phone) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Mots de passe différents",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return false;
    }

    if (formData.password.length < 8) {
      toast({
        title: "Mot de passe trop court",
        description: "Le mot de passe doit contenir au moins 8 caractères.",
        variant: "destructive",
      });
      return false;
    }

    if (formData.role === 'coach' && !formData.coaching_field) {
      toast({
        title: "Domaine requis",
        description: "Veuillez sélectionner votre domaine de coaching.",
        variant: "destructive",
      });
      return false;
    }

    if (formData.role === 'gym_owner' && (!formData.gym_name || !formData.location)) {
      toast({
        title: "Informations salle requises",
        description: "Veuillez remplir le nom et l'emplacement de votre salle.",
        variant: "destructive",
      });
      return false;
    }

    if (formData.role === 'brand' && !formData.company_name) {
      toast({
        title: "Nom de société requis",
        description: "Veuillez remplir le nom de votre société.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const success = await register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone: formData.phone,
        role: formData.role as UserRole,
        coaching_field: formData.coaching_field,
        gym_name: formData.gym_name,
        location: formData.location,
        company_name: formData.company_name,
      });

      if (success) {
        toast({
          title: "Compte créé !",
          description: "Bienvenue sur SportFlare !",
        });
      } else {
        toast({
          title: "Erreur de création",
          description: "Un compte existe déjà avec cet email.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'role') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="flex items-center justify-center space-x-2">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">SF</span>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SportFlare
              </span>
            </Link>
          </div>

          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Rejoignez SportFlare</CardTitle>
              <CardDescription>Choisissez votre type de compte</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={() => handleRoleSelect('client')}
                variant="outline"
                className="w-full h-16 flex flex-col items-center justify-center space-y-1 hover:bg-blue-50 hover:border-blue-300"
              >
                <span className="font-semibold">Client</span>
                <span className="text-xs text-gray-600">Accédez aux salles et cours</span>
              </Button>

              <Button
                onClick={() => handleRoleSelect('gym_owner')}
                variant="outline"
                className="w-full h-16 flex flex-col items-center justify-center space-y-1 hover:bg-green-50 hover:border-green-300"
              >
                <span className="font-semibold">Propriétaire de Salle</span>
                <span className="text-xs text-gray-600">Gérez votre salle de sport</span>
              </Button>

              <Button
                onClick={() => handleRoleSelect('coach')}
                variant="outline"
                className="w-full h-16 flex flex-col items-center justify-center space-y-1 hover:bg-purple-50 hover:border-purple-300"
              >
                <span className="font-semibold">Coach</span>
                <span className="text-xs text-gray-600">Donnez des cours et programmes</span>
              </Button>

              <Button
                onClick={() => handleRoleSelect('brand')}
                variant="outline"
                className="w-full h-16 flex flex-col items-center justify-center space-y-1 hover:bg-orange-50 hover:border-orange-300"
              >
                <span className="font-semibold">Marque</span>
                <span className="text-xs text-gray-600">Vendez vos produits fitness</span>
              </Button>
            </CardContent>
          </Card>

          <div className="text-center mt-6">
            <span className="text-gray-600">Déjà inscrit ? </span>
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Button
            variant="ghost"
            onClick={() => setStep('role')}
            className="mb-4"
          >
            ← Retour
          </Button>
          <h2 className="text-2xl font-bold">
            Inscription {formData.role === 'client' ? 'Client' :
                      formData.role === 'gym_owner' ? 'Salle de Sport' :
                      formData.role === 'coach' ? 'Coach' : 'Marque'}
          </h2>
        </div>

        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Common fields */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  {formData.role === 'brand' ? 'Nom de la société' :
                   formData.role === 'gym_owner' ? 'Votre nom' : 'Nom complet'}
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={formData.role === 'brand' ? 'FitGear SARL' : 'Ahmed Ben Ali'}
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Numéro de téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+216 XX XXX XXX"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              {/* Role-specific fields */}
              {formData.role === 'coach' && (
                <div className="space-y-2">
                  <Label htmlFor="coaching_field">Domaine de coaching</Label>
                  <Select value={formData.coaching_field} onValueChange={(value) => handleInputChange('coaching_field', value)}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Sélectionnez votre domaine" />
                    </SelectTrigger>
                    <SelectContent>
                      {coachingFields.map((field) => (
                        <SelectItem key={field} value={field}>{field}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {formData.role === 'gym_owner' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="gym_name">Nom de la salle</Label>
                    <Input
                      id="gym_name"
                      type="text"
                      placeholder="FitZone Tunis"
                      value={formData.gym_name}
                      onChange={(e) => handleInputChange('gym_name', e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Emplacement</Label>
                    <Input
                      id="location"
                      type="text"
                      placeholder="Centre-ville, Tunis"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                </>
              )}

              {formData.role === 'brand' && (
                <div className="space-y-2">
                  <Label htmlFor="company_name">Nom de l'entreprise</Label>
                  <Input
                    id="company_name"
                    type="text"
                    placeholder="FitGear SARL"
                    value={formData.company_name}
                    onChange={(e) => handleInputChange('company_name', e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                    className="h-11 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-11 px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                    className="h-11 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-11 px-3 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg font-medium"
                disabled={isLoading}
              >
                {isLoading ? 'Création du compte...' : 'Créer mon compte'}
              </Button>

              <div className="text-center text-sm space-y-2">
                <p className="text-gray-600">
                  En créant un compte, vous acceptez nos{' '}
                  <Link to="/terms" className="text-blue-600 hover:underline">
                    conditions d'utilisation
                  </Link>
                  {' '}et notre{' '}
                  <Link to="/privacy" className="text-blue-600 hover:underline">
                    politique de confidentialité
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
