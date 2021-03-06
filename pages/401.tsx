// import Layout from 'components/admin-nav/layout'
import { HomeRoute } from 'lib/config'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { NextPageWithLayout } from 'types/page'

const ErrorPage: NextPageWithLayout = () => {
  const { data: session } = useSession()

  return (
    <div
      className="
    mt-[100px]
    flex
    items-center
    justify-center
  "
    >
      <div className="rounded-md bg-white px-40 py-20 shadow-2xl">
        <div className="flex flex-col items-center">
          <h1 className="text-9xl font-bold text-blue-600">401</h1>

          <h6 className="mb-2 text-center text-2xl font-bold text-gray-800 md:text-3xl">
            <span className="text-red-500">Oops!</span> Page not Pemission
          </h6>

          <p className="mb-8 text-center text-gray-500 md:text-lg">
            The page you’re looking for doesn’t allowed.
          </p>

          <p className="mb-8 text-center text-gray-500 md:text-lg">
            your wallet acount address is {session?.user?.name}
          </p>
          <p className="mb-8 text-center text-gray-500 md:text-lg">
            your roles is {session?.user?.roles.join('/') || 'vacancies'}
            ，please contact the administrator
          </p>

          <Link href={HomeRoute}>
            <a className="bg-blue-100 px-6 py-2 text-sm font-semibold text-blue-800">
              Go home
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
