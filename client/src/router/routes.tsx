import { lazy, ReactNode } from 'react'
import { Home, AssignmentTurnedIn } from '@mui/icons-material'

const FrontPage = lazy(() => import('views/front-page'))
const UnitConversion = lazy(() => import('views/unit-conversion'))
const UnitConversionExercise = lazy(
  () => import('views/unit-conversion-exercise')
)

export interface Route {
  view: ReactNode
  path: string
  drawer?: {
    itemIcon: ReactNode
    itemName: string
  }
}

export const routes: Route[] = [
  {
    view: <FrontPage />,
    path: 'paths.frontPage',
    drawer: {
      itemIcon: <Home />,
      itemName: 'drawerItems.frontPage',
    },
  },
  {
    view: <UnitConversion />,
    path: 'paths.unitConversion',
    drawer: {
      itemIcon: <AssignmentTurnedIn />,
      itemName: 'drawerItems.unitConversion',
    },
  },
  {
    view: <UnitConversionExercise />,
    path: 'paths.unitConversionExercise',
  },
]
