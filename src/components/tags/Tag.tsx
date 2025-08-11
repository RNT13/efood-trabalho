import { TagContainer, TagContent } from './TagsStyles'

type TagProps = {
  children: string
}

export default function tag({ children }: TagProps) {
  return (
    <TagContainer>
      <TagContent>{children}</TagContent>
    </TagContainer>
  )
}
