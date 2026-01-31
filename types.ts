
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  image: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  rating: number;
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  genre: string;
  day: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Section {
  HERO = 'hero',
  COURSES = 'courses',
  FEATURES = 'features',
  PRICING = 'pricing',
}
