import { listIssues } from '@/actions/issue'
import { getDictionary } from '@/i18n/dictionaries'
import Link from 'next/link'
import { IoEarth } from 'react-icons/io5'

type Props = {
  issues: Awaited<ReturnType<typeof listIssues>>
}

export const IssueList = async ({ issues }: Props) => {
  const { issue: t } = await getDictionary()
  return (
    <table className="max-w-full divide-y divide-gray-200 table-auto text-xs">
      <thead className="bg-gray-100">
        <tr className="[&>th]:p-2 [&>th]:text-center font-medium text-gray-500 tracking-wider">
          <th>{t.title}</th>
          <th>{t.url}</th>
          <th>{t.category}</th>
          <th>{t.status}</th>
          <th>{t.createdAt}</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {issues.map((issue) => (
          <tr key={issue.id} className="[&>td]:p-2 hover:bg-gray-100 transition-colors">
            <td className="max-w-[30vw] overflow-hidden text-ellipsis whitespace-nowrap text-sm text-blue-600">
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
            </td>
            <td className="text-center text-blue-600">
              <Link href={issue.url} target="_blank">
                <IoEarth />
              </Link>
            </td>
            <td className=" text-gray-900">{issue.category.name}</td>
            <td className="text-gray-900">{issue.status}</td>
            <td className="text-gray-500">{new Date(issue.createdAt).toISOString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
