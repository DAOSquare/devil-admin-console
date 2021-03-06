import { RoleApis } from 'lib/config'
import { useCustomLayoutEffect } from 'lib/utils/hooks'
import { usePermissionCheck } from 'lib/utils/permission'
import { useRouter } from 'next/router'
import { FC } from 'react'

const PermissionLayout: FC<{
  pathname: string
}> = ({ children, pathname }) => {
  const routePermission = RoleApis.find(
    (res) => res.apiRouter === pathname
  )?.role
  const allowed = usePermissionCheck(routePermission)

  const router = useRouter()
  useCustomLayoutEffect(() => {
    if (!allowed && pathname !== '/401') {
      router.replace('/401')
    }
  }, [allowed, router])

  if (allowed || pathname === '/401') {
    return <>{children}</>
  }
  return null
}

export default PermissionLayout
