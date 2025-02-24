import { StyledMarkdown } from '../common/StyledMarkdown'

type Props = {
  note?: string
}

export const TagNote = ({ note }: Props) => {
  if (note) {
    return <StyledMarkdown body={note} />
  } else {
    return <></>
  }
}
