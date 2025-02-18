interface Props {
  title?: string
  description?: string
}

const Title = ({ title, description }: Props) =>
  title || description ? (
    <div className="py-4">
      {title && <h2 className="text-xl font-bold text-secondary">{title}</h2>}
      {description && <div className="text-xs text-gray-500">{description}</div>}
    </div>
  ) : (
    <></>
  )

export default Title
