'use client'

import { insertBlukIssues } from '@/actions/issue'
import { useActionState } from 'react'
import Banner from '../common/Banner'
import Button from '../common/Button'
import Label from '../common/Label'
import TextArea from '../common/TextArea'

const IssuesForm = () => {
  const [state, dispatch, pending] = useActionState(insertBlukIssues, {})
  return (
    <form action={dispatch} className="flex flex-col gap-2">
      <Label>
        CSV format issues (title\turl\tcategoryId\tcreatedAt)
        <TextArea name="csv" rows={12} disabled={pending} defaultValue="" />
      </Label>
      {state.error && <Banner type="error" message={state.error} />}
      {state.message && <Banner type="info" message={state.message} />}
      <Button type="submit" disabled={pending}>
        Submit
      </Button>
    </form>
  )
}

export default IssuesForm
