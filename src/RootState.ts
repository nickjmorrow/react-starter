import { StateType } from 'typesafe-actions';
import { rootReducer } from '~/rootReducer';

export type RootState = StateType<typeof rootReducer>;
