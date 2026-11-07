/**
 * src/components/goals/GoalCreator.jsx
 * Layer: Frontend / Components / Goals
 * Responsibility: Modal form using React Hook Form to create new daily/weekly/monthly coding targets.
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input';
import { useCreateGoal } from '../../hooks/useGoals';

export default function GoalCreator({ isOpen, onClose }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const createMutation = useCreateGoal();

  const onSubmit = (data) => {
    createMutation.mutate(
      {
        type: data.type,
        target: parseInt(data.target, 10),
        startDate: data.startDate,
        endDate: data.endDate,
      },
      {
        onSuccess: () => onClose(),
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Coding Goal">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Goal Interval
          </label>
          <select
            {...register('type', { required: true })}
            className="w-full p-2.5 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
          >
            <option value="daily">Daily Target</option>
            <option value="weekly">Weekly Target</option>
            <option value="monthly">Monthly Target</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Target Problems Count
          </label>
          <Input
            type="number"
            min="1"
            placeholder="e.g. 5"
            {...register('target', { required: true, min: 1 })}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Start Date
            </label>
            <Input type="date" {...register('startDate', { required: true })} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              End Date
            </label>
            <Input type="date" {...register('endDate', { required: true })} />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={createMutation.isPending}>
            {createMutation.isPending ? 'Creating...' : 'Create Goal'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

