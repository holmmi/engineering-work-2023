import { ReactNode } from 'react'
import { Container } from '@mui/material'
import { DRAWER_WIDTH } from 'components/Drawer'

interface MainProps {
  children?: ReactNode
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <Container
      component={'main'}
      disableGutters={true}
      sx={{
        ml: { lg: DRAWER_WIDTH },
        maxWidth: { lg: `calc(100% - ${DRAWER_WIDTH})` },
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 8,
        overflowX: 'hidden',
      }}
    >
      {children}
    </Container>
  )
}

export default Main
