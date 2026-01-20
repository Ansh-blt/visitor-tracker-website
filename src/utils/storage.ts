import { Visitor } from '../types';

const VISITORS_KEY = 'visitor-tracker-visitors';
const CURRENT_VISITOR_KEY = 'visitor-tracker-current';

export const getVisitors = (): Visitor[] => {
  const stored = localStorage.getItem(VISITORS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveVisitors = (visitors: Visitor[]): void => {
  localStorage.setItem(VISITORS_KEY, JSON.stringify(visitors));
};

export const getCurrentVisitor = (): Visitor | null => {
  const stored = localStorage.getItem(CURRENT_VISITOR_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const saveCurrentVisitor = (visitor: Visitor): void => {
  localStorage.setItem(CURRENT_VISITOR_KEY, JSON.stringify(visitor));
};

export const generateVisitorId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};