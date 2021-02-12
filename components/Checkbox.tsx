type Props = {
  checked: boolean
  label: string
  name: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox = ({ checked, label, name, onChange }: Props) => {
  return (
    <label className="inline-flex items-center" htmlFor={name}>
      <input
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
        type="checkbox"
        className="rounded text-indigo-800"
      />
      <span className="ml-2">{label}</span>
    </label>
  )
}
