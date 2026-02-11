import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CustomFinancialInput } from '@/features/financial-health/types';
import { BarChart3 } from 'lucide-react';

interface CustomInputFormProps {
  onSubmit: (data: CustomFinancialInput) => void;
  isLoading: boolean;
}

const CustomInputForm: React.FC<CustomInputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<CustomFinancialInput>({
    // Basic Financial Information
    monthlyIncome: 0,
    monthlyBudget: 0,
    totalDebt: 0,
    emergencyFund: 0,
    netWorth: 0,
    
    // Life Circumstances
    age: 25,
    familySize: 1,
    careerStage: 'early-career',
    location: '',
    costOfLiving: 'medium',
    
    // Financial Goals
    primaryGoal: 'savings',
    timeHorizon: 'medium-term',
    riskTolerance: 'moderate',
    
    // Custom Metrics
    investmentPortfolio: 0,
    insuranceCoverage: 'basic',
    housingType: 'renting',
    dependents: 0,
    
    // Additional Context
    healthStatus: 'good',
    educationLevel: 'bachelor',
    maritalStatus: 'single',
    hasChildren: false,
  });

  const handleInputChange = (field: keyof CustomFinancialInput, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto border shadow-md">
      <CardHeader className="bg-muted/40 border-b">
        <CardTitle className="text-2xl font-bold text-center">
          Custom Financial Health Assessment
        </CardTitle>
        <p className="text-center text-muted-foreground">
          Provide additional information for a personalized financial health analysis
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Financial Information */}
          <div className="space-y-4 border rounded-md p-4">
            <div>
              <h3 className="text-lg font-semibold">Basic Financial Information</h3>
              <p className="text-sm text-muted-foreground">Your income, budget, debts and safety cushion.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="monthlyIncome">Monthly Income ($)</Label>
                <Input
                  id="monthlyIncome"
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  value={formData.monthlyIncome || ''}
                  onChange={(e) => handleInputChange('monthlyIncome', Number(e.target.value))}
                  placeholder="5000"
                  required
                />
              </div>
              <div>
                <Label htmlFor="monthlyBudget">Monthly Budget ($)</Label>
                <Input
                  id="monthlyBudget"
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  value={formData.monthlyBudget || ''}
                  onChange={(e) => handleInputChange('monthlyBudget', Number(e.target.value))}
                  placeholder="4000"
                  required
                />
              </div>
              <div>
                <Label htmlFor="totalDebt">Total Debt ($)</Label>
                <Input
                  id="totalDebt"
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  value={formData.totalDebt || ''}
                  onChange={(e) => handleInputChange('totalDebt', Number(e.target.value))}
                  placeholder="15000"
                  required
                />
              </div>
              <div>
                <Label htmlFor="emergencyFund">Emergency Fund ($)</Label>
                <Input
                  id="emergencyFund"
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  value={formData.emergencyFund || ''}
                  onChange={(e) => handleInputChange('emergencyFund', Number(e.target.value))}
                  placeholder="5000"
                  required
                />
              </div>
              <div>
                <Label htmlFor="netWorth">Net Worth ($)</Label>
                <Input
                  id="netWorth"
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  value={formData.netWorth || ''}
                  onChange={(e) => handleInputChange('netWorth', Number(e.target.value))}
                  placeholder="25000"
                  required
                />
              </div>
              <div>
                <Label htmlFor="investmentPortfolio">Investment Portfolio ($)</Label>
                <Input
                  id="investmentPortfolio"
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  value={formData.investmentPortfolio || ''}
                  onChange={(e) => handleInputChange('investmentPortfolio', Number(e.target.value))}
                  placeholder="10000"
                  required
                />
              </div>
            </div>
          </div>

          {/* Life Circumstances */}
          <div className="space-y-4 border rounded-md p-4">
            <div>
              <h3 className="text-lg font-semibold">Life Circumstances</h3>
              <p className="text-sm text-muted-foreground">Family, career, and location details.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  inputMode="numeric"
                  value={formData.age || ''}
                  onChange={(e) => handleInputChange('age', Number(e.target.value))}
                  min="18"
                  max="100"
                  required
                />
              </div>
              <div>
                <Label htmlFor="familySize">Family Size</Label>
                <Input
                  id="familySize"
                  type="number"
                  inputMode="numeric"
                  value={formData.familySize || ''}
                  onChange={(e) => handleInputChange('familySize', Number(e.target.value))}
                  min="1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="careerStage">Career Stage</Label>
                <Select value={formData.careerStage} onValueChange={(value) => handleInputChange('careerStage', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="early-career">Early Career</SelectItem>
                    <SelectItem value="mid-career">Mid Career</SelectItem>
                    <SelectItem value="late-career">Late Career</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="City, State"
                  required
                />
              </div>
              <div>
                <Label htmlFor="costOfLiving">Cost of Living</Label>
                <Select value={formData.costOfLiving} onValueChange={(value) => handleInputChange('costOfLiving', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cost of living" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dependents">Dependents</Label>
                <Input
                  id="dependents"
                  type="number"
                  inputMode="numeric"
                  value={formData.dependents || ''}
                  onChange={(e) => handleInputChange('dependents', Number(e.target.value))}
                  min="0"
                  required
                />
              </div>
            </div>
          </div>

          {/* Financial Goals */}
          <div className="space-y-4 border rounded-md p-4">
            <div>
              <h3 className="text-lg font-semibold">Financial Goals & Preferences</h3>
              <p className="text-sm text-muted-foreground">Select your primary goals and preferences.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="primaryGoal">Primary Financial Goal</Label>
                <Select value={formData.primaryGoal} onValueChange={(value) => handleInputChange('primaryGoal', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debt-reduction">Debt Reduction</SelectItem>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
                    <SelectItem value="retirement">Retirement</SelectItem>
                    <SelectItem value="emergency-fund">Emergency Fund</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>

              </div>
              <div></div>

              <div>
                <Label htmlFor="timeHorizon">Time Horizon</Label>
                <Select value={formData.timeHorizon} onValueChange={(value) => handleInputChange('timeHorizon', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select horizon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short-term">Short-term (1-3 years)</SelectItem>
                    <SelectItem value="medium-term">Medium-term (3-10 years)</SelectItem>
                    <SelectItem value="long-term">Long-term (10+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="riskTolerance">Risk Tolerance</Label>
                <Select value={formData.riskTolerance} onValueChange={(value) => handleInputChange('riskTolerance', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservative">Conservative</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="aggressive">Aggressive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Additional Context */}
          <div className="space-y-4 border rounded-md p-4">
            <div>
              <h3 className="text-lg font-semibold">Additional Context</h3>
              <p className="text-sm text-muted-foreground">Coverage, housing, health, and background.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="insuranceCoverage">Insurance Coverage</Label>
                <Select value={formData.insuranceCoverage} onValueChange={(value) => handleInputChange('insuranceCoverage', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select coverage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="adequate">Adequate</SelectItem>
                    <SelectItem value="comprehensive">Comprehensive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="housingType">Housing Type</Label>
                <Select value={formData.housingType} onValueChange={(value) => handleInputChange('housingType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="renting">Renting</SelectItem>
                    <SelectItem value="owning">Owning (No Mortgage)</SelectItem>
                    <SelectItem value="mortgage">Owning (With Mortgage)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="healthStatus">Health Status</Label>
                <Select value={formData.healthStatus} onValueChange={(value) => handleInputChange('healthStatus', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select health" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="educationLevel">Education Level</Label>
                <Select value={formData.educationLevel} onValueChange={(value) => handleInputChange('educationLevel', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select education" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high-school">High School</SelectItem>
                    <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                    <SelectItem value="master">Master's Degree</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="maritalStatus">Marital Status</Label>
                <Select value={formData.maritalStatus} onValueChange={(value) => handleInputChange('maritalStatus', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="hasChildren"
                  checked={formData.hasChildren}
                  onChange={(e) => handleInputChange('hasChildren', e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="hasChildren">Have Children</Label>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                'Generating Assessment...'
              ) : (
                <span className="inline-flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Generate Personalized Assessment
                </span>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CustomInputForm;

