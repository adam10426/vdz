/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MemoryChapter {
  id: number;
  title: string;
  description: string;
  image: string;
  dateText?: string;
}

export type ActiveTab = 'timer' | 'celebrate' | 'memory' | 'letter';

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
}
