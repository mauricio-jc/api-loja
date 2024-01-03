import { SetMetadata } from '@nestjs/common';
import { Action } from './action.enum';

export const ACTIONS_KEY = 'actions';
export const Actions = (...actions: Action[]) =>
  SetMetadata(ACTIONS_KEY, actions);
