import { CssBaseline, ThemeProvider } from '@mui/material'
import { StyledEngineProvider } from '@mui/material/styles'
import type { ReactNode } from 'react'
import { theme } from './theme.ts'

type AppThemeProviderProps = {
  children: ReactNode
}

export function AppThemeProvider({ children }: AppThemeProviderProps) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme} defaultMode="light">
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
