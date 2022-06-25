import { Entity } from '@specfocus/spec-focus/entities';
export { type Path } from 'react-router-dom';

export type LinkToFunctionType = (
  record: Entity,
  reference: string
) => string;

export type LinkToType = string | false | LinkToFunctionType;
