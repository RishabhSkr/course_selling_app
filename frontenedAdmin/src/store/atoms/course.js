import  {atom} from 'recoil';

export const coursesState = atom({
    key: 'coursesState',
    default: [],
  });

export const courseState = atom({
    key : 'courseState',
    default :{
        isLoading:true,
        course:null
    },
});