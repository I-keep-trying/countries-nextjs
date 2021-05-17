import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'

const SearchInput = ({ ...rest }) => {
  return (
    <InputGroup width='300px'>
      <InputLeftElement
        pointerEvents="none"
        children={<Search2Icon color="gray.300" />}
      />
      <Input
        variant="filled"
        placeholder="Start typing country name..."
        {...rest}
      />
    </InputGroup>
  )
}

export default SearchInput
