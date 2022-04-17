import Link from 'next/link'
import Image from 'next/image'
import { Box, Container, Button } from '@chakra-ui/react'
import logo from '../../../public/assets/images/logo.svg'
import './index.module.css'
import line from '../../../public/assets/images/line.svg'

import close from '../../../public/assets/images/close.svg'
import { useState } from 'react'
import './index.module.css'

const menuData = [
  {
    name: 'Daos',
    path: '/daos',
  },
  {
    name: 'People',
    path: '/people',
  },
  {
    name: 'Add',
    path: '/Add',
  },
]

function Header() {
  const [isShowMenu, setIsShowMenu] = useState(false)
  const [curMenu, setCurMenu] = useState(-1)
  return (
    <>
      <Box
        h={{ base: '80px', md: '120px' }}
        w="100%"
        pos="fixed"
        top={0}
        left={0}
        background="rgba(230, 235, 255, 0.6)"
        backdropFilter="blur(13px)"
        zIndex={999}
      >
        <Container
          maxW="container.xl"
          h="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link href="/" passHref>
            <Image src={logo} className={'w-[120px] md:w-[200px]'} alt="logo" />
          </Link>

          <div className="flex items-center  gap-5">
            <div className=" hidden items-center gap-5  md:flex">
              {menuData.map((i) => (
                <Link href={i.path} key={i.name} passHref>
                  <button className="btn btn-ghost btn-sm capitalize">
                    {i.name}
                  </button>
                </Link>
              ))}
            </div>
            <Link href="/" passHref>
              <Button className="">Connect</Button>
            </Link>

            <div className=" block md:hidden">
              <Image
                className={'w-5 cursor-pointer md:w-7'}
                src={line}
                alt="line"
                onClick={() => {
                  setIsShowMenu(!isShowMenu)
                }}
              />
            </div>
          </div>
        </Container>
      </Box>
      <Box
        className="bg-blur fixed inset-0 z-[999] flex h-screen flex-col justify-center"
        display={isShowMenu ? 'auto' : 'none'}
      >
        <Box
          pos="absolute"
          top={5}
          right={5}
          cursor="pointer"
          onClick={() => setIsShowMenu(false)}
        >
          <Image src={close} alt="close" />
        </Box>
        {menuData.map((d, i) => (
          <Box
            key={i}
            className={curMenu === i ? 'menu-item active' : 'menu-item'}
            onMouseEnter={() => setCurMenu(i)}
            onMouseLeave={() => setCurMenu(-1)}
            onClick={() => {
              setIsShowMenu(false)
            }}
          >
            <Link href={d.path} passHref>
              <div className="text-shadow-sm text-center	text-5xl font-black leading-[96px] ">
                {d.name}
              </div>
            </Link>
          </Box>
        ))}
      </Box>
    </>
  )
}

export default Header
