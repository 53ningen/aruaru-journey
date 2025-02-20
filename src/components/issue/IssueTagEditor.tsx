'use client'

import { putIssueTag } from '@/actions/issueTag'
import { Tag } from '@prisma/client'
import { ChangeEvent, Fragment, useState } from 'react'
import Banner from '../common/Banner'
import Button from '../common/Button'
import Select from '../common/Select'

type Props = {
  issueId: number
  tags: Tag[]
}

export const IssueTagEditor = ({ issueId, tags }: Props) => {
  const [selectedIds, setSelectedIds] = useState<(number | null)[]>([null])
  const [selectedDepth, setSelectedDepth] = useState<number>(1)
  const [pending, setPending] = useState<boolean>(false)
  const [result, setResult] = useState<Awaited<ReturnType<typeof putIssueTag>>>({})

  const onSelected = (i: number) => (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (!value) {
      if (i === 0) {
        return
      } else {
        setSelectedDepth(i + 1)
        setSelectedIds((prev) => prev.slice(0, i + 1))
        return
      }
    }
    const id = parseInt(value)
    setSelectedDepth(i + 1)
    setSelectedIds((prev) => prev.slice(0, i + 1).concat(id))
  }
  const onSubmit = async () => {
    setPending(true)
    try {
      const tagId = selectedIds[selectedDepth]!
      const res = await putIssueTag(issueId, tagId)
      setResult(res)
    } finally {
      setPending(false)
    }
  }
  return (
    <div className="flex flex-col gap-2 text-xs">
      {Array.from({ length: selectedDepth + 1 }).map((_, i) => {
        const tagsForDepth = tags.filter((t) => t.parentId === selectedIds[i])
        return tagsForDepth.length === 0 ? (
          <Fragment key={i}></Fragment>
        ) : (
          <Select size={i > selectedDepth - 3 ? tagsForDepth.length + 1 : 1} key={i} onChange={onSelected(i)} defaultValue={undefined}>
            {<option value={undefined}></option>}
            {tags
              .filter((t) => t.parentId === selectedIds[i])
              .map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
          </Select>
        )
      })}
      {result.error && <Banner type="error" message={result.error} />}
      {result.message && <Banner type="info" message={result.message} />}
      <div className="flex justify-end">
        <Button type="submit" disabled={pending} onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </div>
  )
}
