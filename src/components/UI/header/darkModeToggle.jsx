import { Button } from '@chakra-ui/react'
import LightIcon from './LightIcon'
import DarkIcon from './DarkIcon'

const DarkModeToggle = ({ onClick, colorMode }) => (
  <>
    <Button
      aria-label={
        colorMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
      }
      ml={{ lg: '6' }}
      variant="ghost"
      _hover={{ color: 'black', bgColor: 'white' }}
      onClick={onClick}
    >
      {colorMode === 'light' ? (
        <DarkIcon name="moon-icon" />
      ) : (
        <LightIcon name="sun-icon" />
      )}
    </Button>
  </>
)

export default DarkModeToggle
