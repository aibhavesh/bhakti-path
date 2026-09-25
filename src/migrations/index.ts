import * as migration_20260925_105017_initial from './20260925_105017_initial';

export const migrations = [
  {
    up: migration_20260925_105017_initial.up,
    down: migration_20260925_105017_initial.down,
    name: '20260925_105017_initial'
  },
];
