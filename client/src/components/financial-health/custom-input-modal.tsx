import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import CustomInputForm from './custom-input-form';
import { CustomFinancialInput } from '@/features/financial-health/types';
import { PlusCircle } from 'lucide-react';

interface CustomInputModalProps {
  onSubmit: (data: CustomFinancialInput) => void;
  isLoading: boolean;
}

const CustomInputModal: React.FC<CustomInputModalProps> = ({ onSubmit, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (data: CustomFinancialInput) => {
    onSubmit(data);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="border-blue-200 text-blue-700 hover:bg-blue-50"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Custom Assessment
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Custom Financial Health Assessment</DialogTitle>
        </DialogHeader>
        <CustomInputForm onSubmit={handleSubmit} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
};

export default CustomInputModal;
