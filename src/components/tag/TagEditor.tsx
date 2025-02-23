'use client'

import { upsertTag } from '@/actions/tag'
import { ReactNode, useActionState } from 'react'
import Banner from '../common/Banner'
import Button from '../common/Button'

type Props = {
  children: ReactNode
}

export const TagEditor = ({ children }: Props) => {
  const [state, dispatch, pending] = useActionState(upsertTag, {})
  return (
    <form action={dispatch} className="flex flex-col gap-2">
      {children}
      {state.message && <Banner type="info" message={state.message} />}
      {state.error && <Banner type="error" message={state.error} />}
      <Button type="submit" disabled={pending}>
        SUBMIT
      </Button>
    </form>
  )
}
