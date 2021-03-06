import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../core/state/reducers';
import { Block } from '../../models/block';
import { ExplorerState, getExplorerState } from '../reducers';
import * as fromBlocks from '../reducers/blocks.reducer';

export const getBlocksState = createSelector(
  getExplorerState,
  (state: ExplorerState) => state.blocks,
);

export const getBlocksEntities = createSelector(
  getBlocksState,
  fromBlocks.getBlocksEntities,
);

export const getBlocksLoaded = createSelector(
  getBlocksState,
  fromBlocks.getBlocksLoaded,
);

export const getBlocksLoading = createSelector(
  getBlocksState,
  fromBlocks.getBlocksLoading,
);

export const getLast10Blocks = createSelector(
  getBlocksEntities,
  (entities): Block[] =>
    Object
    .values(entities)
    .sort((a, b) => {
      if (a.number < b.number) { return 1; }
      if (a.number > b.number) { return -1; }
      return 0;
    })
    .slice(0, 10),
);

export const getSelectedBlockByBlockNumberOrHash = createSelector(
  getBlocksEntities,
  fromRoot.getRouterState,
  (entities, router): Block =>
    entities[router.state.params.blockId]
    || Object.values(entities).find(block => block.hash === router.state.params.blockId),
);
