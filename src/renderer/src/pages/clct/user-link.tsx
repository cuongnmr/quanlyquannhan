import { Link } from '@tanstack/react-router'
import { FC, PropsWithChildren } from 'react'

interface Props {
  userId: string
}
const UserLink: FC<PropsWithChildren<Props>> = ({ userId, children }) => {
  return (
    <Link className="hover:underline no-underline font-normal" to={'/user/' + userId}>
      {children}
    </Link>
  )
}

export default UserLink
