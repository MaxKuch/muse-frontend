import React from 'react'
import { Select } from 'antd'
import debounce from 'lodash/debounce'
import { IDebounceSelect } from '../../models/components'
import { IOption } from '../../models/types'
import Logo from '../Logo'

const DebounceSelect:React.FC<IDebounceSelect> = ({ fetchOptions, debounceTimeout, ...props }) => {
  const [fetching, setFetching] = React.useState<boolean>(false)
  const [options, setOptions] = React.useState<IOption[]>([]);
  const fetchRef = React.useRef(0);
  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) return

        setOptions(newOptions)
        setFetching(false)
      })
    }

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);
  return (
    <Select
      allowClear
      showSearch
      className='select'
      showArrow={false}
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      onFocus={() => debounceFetcher('')}
      notFoundContent={fetching ? <div className='d-flex justify-center'><Logo size={25} animated={true}/></div> : <h3 className='t-center'>Ничего не найдено</h3>}
      {...props}
      dropdownStyle={{
        backgroundColor: '#252525'
      }}
    >
      {options.map(option => <Select.Option className='select-option' key={option.value}>{option.label}</Select.Option>)}
    </Select>
  );
} 

export default DebounceSelect