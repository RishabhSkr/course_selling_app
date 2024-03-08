import { selector } from 'recoil';
import { coursesState } from '../atoms/course';

export const getCourses = selector({
  key: 'getCourses',
  get: ({ get }) => {
    const courses = get(coursesState);
    return courses;
  },
});