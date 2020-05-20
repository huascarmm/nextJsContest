import { GET_HIERARCHIES_SCHEMA, GET_HIERARCHIES } from './constants';

export const actionsGetHierarchiesSchema = () => ({
  type: GET_HIERARCHIES_SCHEMA,
});

export const actionsGetHierarchy = () => ({
  type: GET_HIERARCHIES
});
