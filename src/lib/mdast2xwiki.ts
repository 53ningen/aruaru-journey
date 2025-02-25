import { Blockquote, Code, Emphasis, Heading, Image, InlineCode, Link, List, Node, Paragraph, Root, Strong, Text } from 'mdast'
import { Processor } from 'unified'
import { VFile } from 'vfile'

function mdast2xwiki(this: Processor) {
  this.compiler = compile

  function compile(node: Node, file: VFile): string {
    switch (node.type) {
      case 'root':
        const root = node as Root
        let result = ''
        root.children.forEach((child) => {
          result += compile(child, file)
          result += '\n'
        })
        return result
      case 'heading':
        const heading = node as Heading
        return (
          '='.repeat(heading.depth) + ' ' + heading.children.map((child) => compile(child, file)).join('') + ' ' + '='.repeat(heading.depth) + '\n'
        )
      case 'paragraph':
        const paragraph = node as Paragraph
        return paragraph.children.map((child) => compile(child, file)).join('') + '\n'
      case 'strong':
        const strong = node as Strong
        return '**' + strong.children.map((child) => compile(child, file)).join('') + '**'
      case 'emphasis':
        const emphasis = node as Emphasis
        return '//' + emphasis.children.map((child) => compile(child, file)).join('') + '//'
      case 'link':
        const link = node as Link
        return `[[${link.children.map((child) => compile(child, file)).join('')}>>${link.url}]]`
      case 'text':
        const text = node as Text
        return text.value
      case 'blockquote':
        const blockquote = node as Blockquote
        return '> ' + blockquote.children.map((child) => compile(child, file)).join('')
      case 'code':
        const code = node as Code
        return '{{code}}\n' + code.value + '\n{{/code}}\n'
      case 'inlineCode':
        const inlineCode = node as InlineCode
        return '{{code}}' + inlineCode.value + '{{/code}}'
      case 'image':
        const image = node as Image
        return `[[image:${image.alt}>>${image.url}]]`
      case 'list':
        return processList(node as List, file)
      case 'listItem':
        return ''
      case 'thematicBreak':
        return '----\n'
      default:
        return '<nowiki>' + node.type + '</nowiki>'
    }
  }

  const processList = (list: List, file: VFile, depth: number = 1): string => {
    const ordered = list.ordered || false
    const prefix = ordered ? '#' : '*'
    const compiled = list.children
      .map((c) =>
        c.children
          .map((child) => {
            if (child.type === 'list') {
              return processList(child as List, file, depth + 1)
            } else {
              return prefix.repeat(depth) + ' ' + compile(child, file)
            }
          })
          .join('')
      )
      .join('')
    return compiled
  }
}

export default mdast2xwiki
