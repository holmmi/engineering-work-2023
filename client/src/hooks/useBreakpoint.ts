import { useTheme, useMediaQuery, Breakpoint } from '@mui/material'

export const useBreakpoint = (breakpoint: Breakpoint): boolean => {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.down(breakpoint))
}
