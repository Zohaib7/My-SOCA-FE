import {
  EarnedSvg,
  MisRewardSvg,
  RedeemedSvg,
  SavedSvg,
  boy,
  girl,
} from '@Asset/logo';
import CoachAttendance from '@Container/AppContainer/CoachHome/CoachAttendance';
import CoachSummary from '@Container/AppContainer/CoachHome/CoachSummary';
import Fiftees from '@Container/AppContainer/Fiftees';
import FiveWkts from '@Container/AppContainer/FiveWkts';
import Hundreds from '@Container/AppContainer/Hundreds';
import FieldingSession from '@Container/AppContainer/Manager/FieldingSession';
import TeamAllocation from '@Container/AppContainer/Manager/TeamAllocation';
import Batting from '@Container/AppContainer/Performance/Batting';
import Bowling from '@Container/AppContainer/Performance/Bowling';
import Fielding from '@Container/AppContainer/Performance/Fielding';
import TotalGames from '@Container/AppContainer/Performance/TotalGames';
import Academy from '@Container/AppContainer/Services/Tabs/Academy';
import Private from '@Container/AppContainer/Services/Tabs/Private';
import Rentals from '@Container/AppContainer/Services/Tabs/Rentals';
import ThreeWkts from '@Container/AppContainer/ThreeWkts';

export const TransactionList = [
  {
    id: 0,
    label: '1:1 Sessions',
    date: 'Jun 4 2022',
    pts: '1400',
  },
  {
    id: 1,
    label: 'Batting Glove',
    date: 'Sep 4 2022',
    pts: '2800',
  },
  {
    id: 2,
    label: 'MLC hat',
    date: 'Feb 4 2022',
    pts: '300',
  },
  {
    id: 3,
    label: 'Monthly Session',
    date: 'Jun 10 2022',
    pts: '600',
  },
];

export const FaqsList = [
  {
    id: 0,
    Question:
      'Solor sit amet, consectetur adipiscing elit eiusmod tempor incididunt',
    Answer:
      'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor  consequat aute irure dolor',
  },
  {
    id: 1,
    Question:
      'Solor sit amet, consectetur adipiscing elit eiusmod tempor incididunt',
    Answer: `Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor  consequat aute irure dolor`,
  },
  {
    id: 2,
    Question:
      'Solor sit amet, consectetur adipiscing elit eiusmod tempor incididunt',
    Answer:
      'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor  consequat aute irure dolor',
  },
  {
    id: 3,
    Question:
      'Solor sit amet, consectetur adipiscing elit eiusmod tempor incididunt',
    Answer:
      'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor  consequat aute irure dolor',
  },
  {
    id: 4,
    Question:
      'Solor sit amet, consectetur adipiscing elit eiusmod tempor incididunt',
    Answer:
      'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor  consequat aute irure dolor',
  },
];

export const performanceTabs = [
  {
    name: 'Total Games',
    title: 'Total Games',
    component: TotalGames,
  },
  {
    name: 'Batting',
    title: 'Batting',
    component: Batting,
  },
  {
    name: 'Bowling',
    title: 'Bowling',
    component: Bowling,
  },
  {
    name: 'Fielding',
    title: 'Fielding',
    component: Fielding,
  },
];

export const playerFamilyData = [
  {
    id: 0,
    png: boy,
    name: 'Stacy Gwen',
    Championships: '02',
    Leagues: '22',
    Tourneys: '15',
  },
  {
    id: 1,
    png: girl,
    name: 'Stacy Gwen',
    Championships: '05',
    Leagues: '25',
    Tourneys: '10',
  },
];

export const yearData = [
  {
    id: 0,
    svg: <SavedSvg />,
    cash: '$300.00',
    label: 'Saved',
  },
  {
    id: 1,
    svg: <EarnedSvg />,
    cash: '$300.00',
    label: 'Earned',
  },
  {
    id: 2,
    svg: <RedeemedSvg />,
    cash: '$300.00',
    label: 'To Redeem',
  },
  {
    id: 3,
    svg: <MisRewardSvg />,
    cash: '$300.00',
    label: 'Mis Rwds',
  },
];

export const CATEGORIES_MAIN = [
  {
    id: 1,
    score: '12',
    cate: 'Catch Drops',
  },
  {
    id: 2,
    score: '12',
    cate: 'Misfields',
  },
  {
    id: 3,
    score: '12',
    cate: 'Missed R/O',
  },
  {
    id: 4,
    score: '12',
    cate: 'Full Toss',
  },
  {
    id: 5,
    score: '12',
    cate: 'Short Balls',
  },
  {
    id: 6,
    score: '12',
    cate: 'Miss Stumpings',
  },
];

export const PLAYER_ATTENDANCE_SHEET = [
  {
    id: 1,
    playerName: 'Player Name Here',
    isPresent: 0, // Means Present
  },
  {
    id: 2,
    playerName: 'Player Name Here',
    isPresent: 0, // Means Present
  },
  {
    id: 3,
    playerName: 'Player Name Here',
    isPresent: 1, // Means Absent
  },
  {
    id: 4,
    playerName: 'Player Name Here',
    isPresent: 2, // Means Not Decided
  },
  {
    id: 5,
    playerName: 'Player Name Here',
    isPresent: 2, // Means Not Decided
  },
  {
    id: 6,
    playerName: 'Player Name Here',
    isPresent: 2, // Means Not Decided
  },
  {
    id: 7,
    playerName: 'Player Name Here',
    isPresent: 2, // Means Not Decided
  },
  {
    id: 8,
    playerName: 'Player Name Here',
    isPresent: 2, // Means Not Decided
  },
  {
    id: 9,
    playerName: 'Player Name Here',
    isPresent: 2, // Means Not Decided
  },
  {
    id: 10,
    playerName: 'Player Name Here',
    isPresent: 2, // Means Not Decided
  },
  {
    id: 11,
    playerName: 'Player Name Here',
    isPresent: 2, // Means Not Decided
  },
  {
    id: 12,
    playerName: 'Player Name Here',
    isPresent: 2, // Means Not Decided
  },
  {
    id: 13,
    playerName: 'Player Name Here',
    isPresent: 2, // Means Not Decided
  },
];

export const coachTabs = [
  {
    name: 'Summary',
    title: 'Summary',
    component: CoachSummary,
  },
  {
    name: 'Attendance',
    title: 'Attendance',
    component: CoachAttendance,
  },
];

export const managerTabs = [
  {
    name: 'Team Allocation',
    title: 'Team Allocation',
    component: TeamAllocation,
  },
  {
    name: 'Fielding Session',
    title: 'Fielding Session',
    component: FieldingSession,
  },
];

export const hallOfFameTabs = [
  {
    name: `100's`,
    title: `100's`,
    component: Hundreds,
  },
  {
    name: `50's`,
    title: `50's`,
    component: Fiftees,
  },
  {
    name: '4 Wkts',
    title: '4 Wkts',
    component: ThreeWkts,
  },
  {
    name: '5+ Wkts',
    title: '5+ Wkts',
    component: FiveWkts,
  },
];

export const servicesTabs = [
  {
    name: `Academy`,
    title: `Academy`,
    component: Academy,
  },
  {
    name: `Private`,
    title: `Private`,
    component: Private,
  },
  {
    name: 'Rentals',
    title: 'Rentals',
    component: Rentals,
  },
];

export const onlyRentalTab = [
  {
    name: 'Rentals',
    title: 'Rentals',
    component: Rentals,
  },
];

export const SessionData = [
  {
    id: '1',
    Date: '00/00',
    Session: '000',
    Duration: '000',
    Notes: 'Did yoga and meditation',
  },
  {
    id: '2',
    Date: '00/00',
    Session: '000',
    Duration: '000',
    Notes: 'Took a walk in the park',
  },
  {
    id: '3',
    Date: '00/00',
    Session: '000',
    Duration: '000',
    Notes: 'Worked on coding projects',
  },
  // Add more dummy data as needed
];
