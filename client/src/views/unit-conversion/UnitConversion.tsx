import { Typography, Box, Button, Card, CardContent } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ChevronRight } from '@mui/icons-material'
import { Link } from 'react-router-dom'

export default function UnitConversion() {
  const { t } = useTranslation()

  return (
    <>
      <Typography variant="h1" width={'100%'}>
        {t('views.unitConversion.title')}
      </Typography>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'column', lg: 'row' },
          alignItems: 'stretch',
          justifyContent: 'center',
          marginTop: 10,
          gap: 4,
        }}
      >
        <Card
          variant="outlined"
          sx={{
            flexBasis: '33.3%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CardContent
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <Typography variant="h4">
              {t('views.unitConversion.length')}
            </Typography>
            <Typography variant="body1">
              {t('views.unitConversion.lengthInformation')}
            </Typography>
            <Link to={t('translatedPaths.unitConversionExercise.length')}>
              <Button endIcon={<ChevronRight />}>
                {t('views.unitConversion.choose')}
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card
          variant="outlined"
          sx={{
            flexBasis: '33.3%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CardContent
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <Typography variant="h4">
              {t('views.unitConversion.area')}
            </Typography>
            <Typography variant="body1">
              {t('views.unitConversion.areaInformation')}
            </Typography>
            <Link to={t('translatedPaths.unitConversionExercise.area')}>
              <Button endIcon={<ChevronRight />}>
                {t('views.unitConversion.choose')}
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card
          variant="outlined"
          sx={{
            flexBasis: '33.3%',
          }}
        >
          <CardContent
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <Typography variant="h4">
              {t('views.unitConversion.volume')}
            </Typography>
            <Typography variant="body1">
              {t('views.unitConversion.volumeInformation')}
            </Typography>
            <Link to={t('translatedPaths.unitConversionExercise.volume')}>
              <Button endIcon={<ChevronRight />}>
                {t('views.unitConversion.choose')}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}
