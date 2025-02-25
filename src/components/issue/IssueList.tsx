import { listIssues } from '@/actions/issue'
import { getDictionary } from '@/i18n/dictionaries'
import Link from 'next/link'

type Props = {
  issues: Awaited<ReturnType<typeof listIssues>>
}

export const IssueList = async ({ issues }: Props) => {
  const { issue: t } = await getDictionary()
  return (
    <table className="text-sm">
      <thead>
        <tr>
          <th>{t.id}</th>
          <th>{t.category}</th>
          <th>{t.title}</th>
          <th>{t.status}</th>
          <th>{t.createdAt}</th>
        </tr>
      </thead>
      <tbody>
        {issues.map((issue) => (
          <tr key={issue.id}>
            <td className="px-2">{issue.id}</td>
            <td className="px-2">{issue.category.name}</td>
            <td className="px-2">
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
            </td>
            <td className="px-2">{issue.status}</td>
            <td className="px-2">{new Date(issue.createdAt).toISOString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
