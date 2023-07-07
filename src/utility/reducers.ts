import { Trend } from "../interfaces/trend";

export const total = (trends: Trend[], type: 'likes' | 'dislikes' | 'views') => 
  trends.reduce<number>((total: number, current: Trend) => total + current[type], 0);

export const totalVotes = (trends: Trend[]) => total(trends, 'likes') + total(trends, 'dislikes');