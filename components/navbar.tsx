import { FC, useContext, useState } from 'react'
import Image from 'next/image'
import { useAxiosMutation } from 'lib/request/use-fetch'
import { useRouter } from 'next/router'
import MeContext from 'lib/me-provider'
import { Modal } from './modal'
import ProfileForm from './form/profile'
import SettingsForm from './form/settings'

export type NavBarProps = { title?: string }

const AvatarDropdown: FC = () => {
  const router = useRouter()
  const { state: data } = useContext(MeContext)
  const { mutate } = useAxiosMutation(
    '/auth/sign-out',
    {
      onSuccess: () => {
        router.replace('/sign-in')
      },
    },
    'GET'
  )
  const [isopen, setIsopen] = useState(false)
  const [isSettingsopen, setIsSettingsopen] = useState(false)
  return (
    <div className="dropdown-end dropdown ">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="rounded-full ">
          {data?.avatar ? (
            <Image
              className="  rounded-full object-cover"
              width={30}
              height={30}
              src={data?.avatar}
              alt="avatar"
            />
          ) : (
            <div className="  h-[30px] w-[30px] rounded-full bg-slate-300 object-cover" />
          )}
        </div>
      </label>

      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
      >
        <li>
          <button
            className="justify-between"
            onClick={() => {
              setIsopen(true)
            }}
          >
            Profile
            <span className="badge">New</span>
          </button>
        </li>
        <li>
          <button
            className="justify-between"
            onClick={() => {
              setIsSettingsopen(true)
            }}
          >
            Settings
          </button>
        </li>
        <li>
          <a
            onClick={() => {
              mutate({})
            }}
          >
            Logout
          </a>
        </li>
      </ul>
      <Modal
        isOpen={isopen}
        title="Update User Profile"
        // onClose={() => setIsopen(false)}
        // onSumbimit={() => setIsopen(false)}
      >
        <ProfileForm onClose={() => setIsopen(false)} />
      </Modal>

      <Modal size="large" isOpen={isSettingsopen} title="Update Password">
        <SettingsForm onClose={() => setIsSettingsopen(false)} />
      </Modal>
    </div>
  )
}

const NavBar: FC<NavBarProps> = ({}) => {
  return (
    <div
      className="sticky top-0 z-30 flex h-16 w-full justify-center bg-base-100 bg-opacity-90 text-base-content shadow-sm 
  backdrop-blur transition-all duration-100"
    >
      <nav className="navbar w-full">
        <div className="flex flex-1 gap-1 lg:gap-2">
          <label
            htmlFor="drawer"
            className="btn btn-ghost drawer-button btn-square lg:hidden"
          >
            <svg
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="/"
              aria-current="page"
              aria-label="Homepage"
              className="flex-0 btn btn-ghost px-2 "
            >
              <div className="inline-flex  transition-all duration-200">
                <span className=" text-xl font-light lowercase	 ">Devil</span>
                <span className="text-xl  uppercase italic text-yellow-400 ">
                  admin
                </span>
              </div>
            </a>
          </div>
        </div>
        <div className="mr-1 flex-none items-center gap-2">
          <AvatarDropdown />
        </div>
      </nav>
    </div>
  )
}

export default NavBar