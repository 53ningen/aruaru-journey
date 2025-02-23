import { ReactNode } from 'react'
import Label from '../common/Label'
import TextField from '../common/TextField'

export type FormState = { message?: string; error?: string }

interface Props<T> {
  item: T
  readOnlyFields?: (keyof T)[]
  requiredFields?: (keyof T)[]
  customFields?: Partial<{ [K in keyof T]: () => ReactNode | undefined }>
}

export function GenericEditor<T>({ item, readOnlyFields, requiredFields, customFields }: Props<T>) {
  return (
    <div className="flex flex-col gap-2">
      {Object.entries(item as object).map(([key, value]) => {
        const readOnly = readOnlyFields?.includes(key as keyof T) || false
        const required = requiredFields?.includes(key as keyof T) || false
        const t = typeof value
        if (customFields) {
          const node = customFields[key as keyof T]?.()
          if (node) {
            return (
              <Label key={key}>
                {key}
                {required ? '*' : ''}
                {node}
              </Label>
            )
          }
        }
        switch (t) {
          case 'number':
            if (key === 'id' && value == '0') {
              return <TextField key={key} type="hidden" name={key} defaultValue={value} readOnly={readOnly} required={required} />
            } else {
              return (
                <Label key={key}>
                  {key}
                  {required ? '*' : ''}
                  <TextField type="number" name={key} defaultValue={value} readOnly={readOnly} required={required} />
                </Label>
              )
            }
          default:
          case 'string':
            return (
              <Label key={key}>
                {key}
                {required ? '*' : ''}
                <TextField name={key} defaultValue={value} required={required} readOnly={readOnly} />
              </Label>
            )
        }
      })}
    </div>
  )
}
