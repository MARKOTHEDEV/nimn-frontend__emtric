import { configureStore , ThunkAction, Action} from '@reduxjs/toolkit'
import signinReducer from './auth/signin/signinSlice';
import AdmindashboardReducer from "./admin/dashboard/dashboardSlice"
import membersReducer from './admin/members/membersSlice';
import dueReducer from './due/dueSlice';
import dueListAndOwningMembersReducer from './dueListAndOwningMembers/dueListAndOwningMembersSlice';
import eventReducer from './events/eventSlice';
import newsSlice from './news/newsSlice'
import publicationSlice from './publication/publicationSlice';
import gallerySlice from './gallery/gallerySlice';
import ManageAssigningExcoSlice from './ManageAssigningExco/ManageAssigningExcoSlice';
import MembersAndExcoSlice from './members/membersSlice'
import memeberEventsSlice from './memeberEvents/memeberEventsSlice';
import memberNewsSlice from './memberNews/memberNewsSlice';
import memberPublicationSlice from './memberPublication/memberPublicationSlice';
export const store = configureStore({
  reducer: {
    // signUp:signUpReducer,
    signIn:signinReducer,
    adminDashboard:AdmindashboardReducer,
    members:membersReducer,
    due:dueReducer,
    dueListAndOwningMembers:dueListAndOwningMembersReducer,
    events:eventReducer,
    news:newsSlice,
    publication:publicationSlice,
    gallery:gallerySlice,
    manage_assigning_exco:ManageAssigningExcoSlice,
    member_and_exco:MembersAndExcoSlice,


    // members related slice
    memeberEventsSlice:memeberEventsSlice,
    MemberNews:memberNewsSlice,
    memberPublication:memberPublicationSlice
  },
})



export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
