import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import { StyledMarkdown } from '@/components/common/StyledMarkdown'
import TextArea from '@/components/common/TextArea'
import mdast2xwiki from '@/lib/mdast2xwiki'
import { readFileSync } from 'fs'
import remarkParse from 'remark-parse'
import { unified } from 'unified'

export default async function Playground() {
  const file = readFileSync('./src/app/playground/example.md', 'utf-8')
  const sample = file.toString()
  const tree = unified().use(remarkParse).parse(sample)

  const xwiki = unified().use(mdast2xwiki).stringify(tree)
  return (
    <Container className="max-w-screen-lg px-2 md:px-2 py-4">
      <div className="flex flex-col gap-8 py-8">
        <div>
          <SectionHeading title="Source" />
          <TextArea defaultValue={sample} rows={12} className="w-full text-xs" />
        </div>
        <div>
          <SectionHeading title="mdast" />
          <TextArea defaultValue={JSON.stringify(tree, null, '  ')} rows={12} className="w-full text-xs" />
        </div>
        <div>
          <SectionHeading title="xwiki" />
          <TextArea defaultValue={xwiki.toString()} rows={12} className="w-full text-xs" />
        </div>
        <div>
          <SectionHeading title="Styled Markdown" />
          <StyledMarkdown body={sample} />
        </div>
      </div>
    </Container>
  )
}
