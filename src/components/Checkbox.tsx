import { Icon } from './common/icons/Icon'

type CheckboxProps = {
  checked: boolean
  onChange: (checked: boolean) => void
}

export function Checkbox({ checked, onChange }: CheckboxProps) {
  return checked ? (
    <Icon name="Checkbox" size={20} onPress={() => onChange(checked)} />
  ) : (
    <Icon name="Uncheckbox" size={20} onPress={() => onChange(checked)} />
  )
}
